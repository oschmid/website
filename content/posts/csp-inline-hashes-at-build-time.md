---
date: '2026-06-20T17:34:16-07:00'
title: 'CSP Inline Hashes at Build Time'
summary: ''
tags: [golang, Hugo, security, 'software development', 'web development']
ShowReadingTime: true
---
This website has a [Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP) header that 
tells browsers to block inlined scripts and styles except for those matching trusted sha256 hashes. Rather than 
manually updating this header every time any of these scripts or styles changes, I created 
[csp-inline-hashes](https://github.com/oschmid/website/blob/master/bin/csp_inline_hashes.go). 

Running `bin/csp-inline-hashes public layouts/_headers public/_headers` after the 
[Hugo build](https://github.com/oschmid/website/blob/master/netlify.toml) will scan `public/` for HTML pages, 
generate sha256 hashes for each inlined script and style, and use the template at 
[layouts/\_headers](https://github.com/oschmid/website/blob/master/layouts/_headers) to write out a 
[Netlify \_headers](https://docs.netlify.com/manage/routing/headers/) file to `public/_headers`.

All the performance benefits of inline scripts and styles, plus the security of a strict whitelist of allowed 
resources, with none of the annoyance of manually updating the Content-Security-Policy.

(See the [120% security score on the Mozilla HTTP Observatory!](https://developer.mozilla.org/en-US/observatory/analyze?host=oliverschmid.ca))

