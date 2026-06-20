package main

import (
	"crypto/sha256"
	"encoding/base64"
	"fmt"
	"io/fs"
	"maps"
	"os"
	"path/filepath"
	"regexp"
	"slices"
	"strings"
	"text/template"
)

func cspHash(s string) string {
	bytes := sha256.Sum256([]byte(s))
	return "sha256-" + base64.StdEncoding.EncodeToString(bytes[:])
}

type cspHashes struct {
	ScriptSrc    map[string]struct{}
	StyleSrcAttr     map[string]struct{}
	StyleSrcElem map[string]struct{}
}

func newCSPHashes() cspHashes {
	return cspHashes{
		ScriptSrc:    make(map[string]struct{}),
		StyleSrcAttr:     make(map[string]struct{}),
		StyleSrcElem: make(map[string]struct{}),
	}
}

func (dst *cspHashes) add(src cspHashes) *cspHashes {
	maps.Copy(dst.ScriptSrc, src.ScriptSrc)
	maps.Copy(dst.StyleSrcAttr, src.StyleSrcAttr)
	maps.Copy(dst.StyleSrcElem, src.StyleSrcElem)
	return dst
}

func cspHashesString(m map[string]struct{}) string {
	keys := slices.Collect(maps.Keys(m))
	if len(keys) == 0 {
		return ""
	}
	slices.Sort(keys)
	return "'" + strings.Join(keys, "' '") + "'"
}

func (dst cspHashes) ScriptSrcHashes() string {
    return cspHashesString(dst.ScriptSrc)
}

func (dst cspHashes) StyleSrcAttrHashes() string {
    return cspHashesString(dst.StyleSrcAttr)
}

func (dst cspHashes) StyleSrcElemHashes() string {
    return cspHashesString(dst.StyleSrcElem)
}

var reScriptSrc = regexp.MustCompile(`(?i)<script[^>]*>([\s\S]*?)<\/script>`)
var reStyleSrcAttr = regexp.MustCompile(`style="([^"]*)"`)
var reStyleSrcElem = regexp.MustCompile(`(?i)<style[^>]*>([\s\S]*?)<\/style>`)
var reStyleLink

func cspHashMatches(dst map[string]struct{}, re *regexp.Regexp, content string) {
	matches := re.FindAllStringSubmatch(content, -1)
	for _, match := range matches {
		if len(match) != 0 {
			dst[cspHash(match[1])] = struct{}{}
		}
	}
}

func cspHashFile(path string) cspHashes {
	csp := newCSPHashes()

	bytes, err := os.ReadFile(path)
	if err != nil {
		fmt.Errorf(`Failed to read %s: %s`, path, err)
		return csp
	}
	content := string(bytes)

	cspHashMatches(csp.ScriptSrc, reScriptSrc, content)
	cspHashMatches(csp.StyleSrcAttr, reStyleSrcAttr, content)
	cspHashMatches(csp.StyleSrcElem, reStyleSrcElem, content)
	return csp
}

func run() int {
	if len(os.Args) != 4 {
		fmt.Println("Expected 3 arguments: <directory to scan> <template file> <output file>")
		return 1
	}
	dir := os.Args[1]
	tmpl, err := template.ParseFiles(os.Args[2])
	if err != nil {
	    fmt.Printf(`Error loading template file '%s': %s`, os.Args[2], err)
	    return 1
	}
    out, err := os.Create(os.Args[3])
    if err != nil {
        fmt.Printf("Failed to create file'%s': %v", os.Args[3], err)
        return 1
    }
    defer out.Close()

    // Collect hashes
	csp := newCSPHashes()
	err = filepath.WalkDir(dir, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			fmt.Errorf("Skipping error at path %q: %v\n", path, err)
			return nil
		}

		// Scan HTML files
		if d.IsDir() || filepath.Ext(d.Name()) != ".html" {
			return nil
		}

		csp.add(cspHashFile(path))
		return nil
	})
    if err != nil {
        fmt.Println(err)
        return 1
    }

    // Write to file
    err = tmpl.Execute(out, csp)
	if err != nil {
	    fmt.Println(err)
	    return 1
	}

    return 0
}

func main() {
    os.Exit(run())
}
