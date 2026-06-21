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

var reScriptSrcElem = regexp.MustCompile(`(?i)<script[^>]*>([\s\S]*?)<\/script>`)
var reStyleSrcAttr = regexp.MustCompile(`style="([^"]*)"`)
var reStyleSrcElem = regexp.MustCompile(`(?i)<style[^>]*>([\s\S]*?)<\/style>`)

func main() {
	os.Exit(run())
}

func run() int {
	if len(os.Args) != 4 {
		fmt.Println("Expected 3 arguments: <directory to scan> <template file> <output file>")
		return 1
	}
	dir := os.Args[1]
	tmpl, err := template.ParseFiles(os.Args[2])
	if err != nil {
		fmt.Printf(`Error loading template file '%s': %v\n`, os.Args[2], err)
		return 1
	}
	out, err := os.Create(os.Args[3])
	if err != nil {
		fmt.Printf("Failed to create file'%s': %v\n", os.Args[3], err)
		return 1
	}
	defer out.Close()

	// Collect hashes
	csp := newCSP()
	err = filepath.WalkDir(dir, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			fmt.Printf("Skipping error at path %q: %v\n", path, err)
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

    fmt.Println("csp-inline-hashes finished successfully")
	return 0
}

func cspHashFile(path string) CSP {
	csp := newCSP()

	bytes, err := os.ReadFile(path)
	if err != nil {
		fmt.Printf(`Failed to read %s: %v\n`, path, err)
		return csp
	}
	content := string(bytes)

	cspHashMatches(csp.ScriptSrcElem, reScriptSrcElem, content)
	cspHashMatches(csp.StyleSrcAttr, reStyleSrcAttr, content)
	cspHashMatches(csp.StyleSrcElem, reStyleSrcElem, content)
	return csp
}

func cspHashMatches(dst map[string]struct{}, re *regexp.Regexp, content string) {
	matches := re.FindAllStringSubmatch(content, -1)
	for _, match := range matches {
		if len(match) > 1 {
			dst[cspHash(match[1])] = struct{}{}
		}
	}
}

func cspHash(s string) string {
	bytes := sha256.Sum256([]byte(s))
	return "sha256-" + base64.StdEncoding.EncodeToString(bytes[:])
}

type CSP struct {
	ScriptSrcElem map[string]struct{}
	StyleSrcAttr  map[string]struct{}
	StyleSrcElem  map[string]struct{}
}

func newCSP() CSP {
	return CSP{
		ScriptSrcElem: make(map[string]struct{}),
		StyleSrcAttr:  make(map[string]struct{}),
		StyleSrcElem:  make(map[string]struct{}),
	}
}

func (csp *CSP) add(src CSP) {
	maps.Copy(csp.ScriptSrcElem, src.ScriptSrcElem)
	maps.Copy(csp.StyleSrcAttr, src.StyleSrcAttr)
	maps.Copy(csp.StyleSrcElem, src.StyleSrcElem)
}

func (csp CSP) ScriptSrcElemHashes() string {
	return cspHashesString(csp.ScriptSrcElem)
}

func (csp CSP) StyleSrcAttrHashes() string {
	return cspHashesString(csp.StyleSrcAttr)
}

func (csp CSP) StyleSrcElemHashes() string {
	return cspHashesString(csp.StyleSrcElem)
}

func cspHashesString(m map[string]struct{}) string {
	keys := slices.Collect(maps.Keys(m))
	if len(keys) == 0 {
		return ""
	}
	slices.Sort(keys)
	return "'" + strings.Join(keys, "' '") + "'"
}
