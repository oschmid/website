+++
title = "Hugo Pagination"
date = "2018-12-27T10:45:41-08:00"
image = ""
tags = ["Hugo","programming"]
+++
Inspired by [Glenn McComb's Hugo pagination tutorial](https://glennmccomb.com/articles/how-to-build-custom-hugo-pagination/) I decided to write my own custom pager. The specific features I'm interested in for pagination are:

1. Dedicated **Previous** and **Next** links, so the reader can quickly find these 2 common actions at similar locations on each page.
1. A clearly marked current page number.
1. Always visible first and last page number. Combined with the current page number, this gives the reader a sense of how many pages they've read and how many there are to go.
1. A configurable number of adjacent pages.
1. Ellipses when there are more pages than can be displayed.
1. [Bulma CSS styles](https://bulma.io/documentation/components/pagination/).

Like so:
<div>
    <nav class="pagination is-centered">
      <a class="pagination-previous">Previous</a>
      <a class="pagination-next">Next page</a>
      <ul class="pagination-list paging-example">
        <li><a class="pagination-link">1</a></li>
        <li><span class="pagination-ellipsis">&hellip;</span></li>
        <li><a class="pagination-link">45</a></li>
        <li><a class="pagination-link is-current">46</a></li>
        <li><a class="pagination-link">47</a></li>
        <li><span class="pagination-ellipsis">&hellip;</span></li>
        <li><a class="pagination-link">86</a></li>
      </ul>
    </nav>
</div>

Here's what I came up with:

{{< highlight "go html template" "linenos=table" >}}
{{ $paginator := .Paginator }}

<!-- Number of links either side of the current page -->
{{ $adjacent_links := 1 }}

<!-- $max_links = ($adjacent_links * 2) + 1 -->
{{ $max_links := (add (mul $adjacent_links 2) 1) }}

<!-- Pages to print -->
{{ $lower_limit := 1 }}
{{ $upper_limit := $paginator.TotalPages }}
{{ $include_lower_ellipsis := false }}
{{ $include_upper_ellipsis := false }}

{{ if gt $paginator.TotalPages (add $max_links 2) }}

    <!-- If we have more pages before the current page than we can print -->
    {{ if ge $paginator.PageNumber $adjacent_links }}

        {{ $lower_limit = sub $paginator.PageNumber $adjacent_links }}

        <!-- Show more pages at the end of the range -->
        {{ if lt (sub $paginator.TotalPages $lower_limit) $max_links }}
            {{ $lower_limit = add 1 (sub $paginator.TotalPages $max_links) }}
        {{ end }}

        <!-- Show ellipsis -->
        {{ if gt (sub $lower_limit 1) 1 }}
            {{ $include_lower_ellipsis = true }}
        {{ end }}

    {{ end }}

    <!-- If we have more pages after the current page than we can print -->
    {{ if gt (sub $paginator.TotalPages $paginator.PageNumber) $adjacent_links }}

        {{ $upper_limit = add $paginator.PageNumber $adjacent_links }}

        <!-- Show more pages at the beginning of the range -->
        {{ if le $upper_limit $max_links }}
            {{ $upper_limit = $max_links }}
        {{ end }}

        <!-- Show ellipsis -->
        {{ if gt (sub $paginator.TotalPages $upper_limit) 1 }}
            {{ $include_upper_ellipsis = true }}
        {{ end }}

    {{ end }}

{{ end }}

<!-- If there's more than one page -->
{{ if gt $paginator.TotalPages 1 }}
<section class="section">
    <nav class="pagination is-centered">

        {{ if $paginator.HasPrev }}
            <a class="pagination-previous" href="{{ $paginator.Prev.RelPermalink }}">Previous</a>
        {{ end }}

        {{ if $paginator.HasNext }}
            <a class="pagination-next" href="{{ $paginator.Next.RelPermalink }}">Next page</a>
        {{ end }}

        <ul class="pagination-list">

        {{ range $paginator.Pagers }}

            <!-- Include first, last, and middle pages -->
            {{ if or (or (eq .PageNumber 1) (eq .PageNumber $paginator.TotalPages)) (and (ge .PageNumber $lower_limit) (le .PageNumber $upper_limit)) }}

                <li><a href="{{ .RelPermalink }}" class="pagination-link{{ if eq $paginator.PageNumber .PageNumber }} is-current{{ end }}">{{ .PageNumber }}</a></li>

                <!-- If we're on the first page and inserting an ellipsis, or just before the last page and inserting an ellipsis -->
                {{ if or (and (eq .PageNumber 1) (eq $include_lower_ellipsis true)) (and (eq .PageNumber $upper_limit) (eq $include_upper_ellipsis true)) }}
                    <li><span class="pagination-ellipsis">&hellip;</span></li>
                {{ end }}

            {{ end }}

        {{ end }}

        </ul>
    </nav>
</section>
{{ end }}
{{</ highlight >}}

Note [this code is available on github](https://github.com/oschmid/website/blob/master/layouts/partials/pagination.html) (along with the code for the rest of this site).

The biggest stylistic difference from Glenn McComb's version is that the adjacent pages are pre-computed outside the loop. I doubt there's any performance difference as both versions are still O(n) but it did shorten the code somewhat.

I noticed a couple things about the go template language while developing. For one, [go template expressions can't stretch across multiple lines](https://stackoverflow.com/questions/49816911/how-to-split-a-long-golang-template-function-across-multiple-lines). This forced the complicated boolean logic to stretch quite wide.

The go template language is also missing slice expressions (i.e. `a[2:5]`). Had these existed I would have attempted to range only over the adjacent links and reduce the algorithm to O(m) (where m is the number of adjacent links). It's possible to get around this in regular usage of go templates by adding a [custom mkSlice function](https://stackoverflow.com/questions/25012467/golang-templates-how-to-define-array-in-a-variable) but [Hugo does not allow custom go template functions](https://discourse.gohugo.io/t/adding-custom-functions/14164/5).

Oh well, the performance implications are minimal. It was still a fun little coding exercise :)