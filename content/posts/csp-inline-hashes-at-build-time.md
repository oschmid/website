---
date: '2026-06-20T17:34:16-07:00'
title: 'CSP Inline Hashes at Build Time'
summary: ''
tags: [golang, Hugo, security, 'software development', 'web development']
ShowReadingTime: true
---
This website has a [Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP) header that 
tells browsers to block inlined scripts and styles except for those matching trusted sha256 hashes. But 
manually updating this header every time any of these scripts or styles changes is annoying and error-prone.

My first attempt at automating this process was writing [csp-inline-hashes.go](https://github.com/oschmid/website/blob/dc0eea9cd3e449ee392c5be9fb155692d74637c6/bin/csp_inline_hashes.go). 
Running `hugo --minify; bin/csp-inline-hashes public layouts/_headers public/_headers` will generate the static site, 
scan `public/` for HTML pages, generate sha256 hashes for each inlined script and style, and use the template at 
[layouts/\_headers](https://github.com/oschmid/website/blob/master/layouts/_headers) to write out a [Netlify \_headers](https://docs.netlify.com/manage/routing/headers/) file to `public/_headers`. 

While this is pretty slow and the scan takes more time than building the site itself, it at least brought the site 
security score to [120% on Mozilla's HTTP Observatory](https://developer.mozilla.org/en-US/observatory/analyze?host=oliverschmid.ca). 
Caching the result by writing it out to `static/_headers` made it better. That way the cost isn't paid on every build. 
But then it's back to remembering to run it when I update an inline script or style.

I brought up this [issue](https://github.com/gohugoio/hugo/issues/15060) to the Hugo community and [@bep](https://github.com/gohugoio/hugo/issues/15060#issuecomment-4790405347) 
talked through the pros/cons of the standard approach: generating the hashes at build time using `resources.FromString` 
and `fingerprint` and storing it in a map for later retrieval when writing headers. I tried it out and found with Hugo's 
partial decorator syntax it's a pretty nice way of writing inline scripts/styles:

```go-text-template {linenos=table,noClasses=false}
{{ with partial "script.html" }}
    function printHelloWorld() {
        console.log("hello world");
    }
{{ end }}
{{ with partial "style.html"
    body {
        background-color: red;
    }
 {{ end }}
```

For anyone else interested in using Hugo with inline scripts and styles and a Content-Security-Policy header, I've 
released these partials (and the ones needed to retrieve the SRI hashes) as a [Hugo module](https://github.com/oschmid/csp-inline-hashes).
