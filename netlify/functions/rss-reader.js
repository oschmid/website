import Mustache from "mustache";
import Parser from "rss-parser";
const parser = new Parser();

const FEEDS = [ "https://astralcodexten.substack.com/feed", "https://mtlynch.io/posts/index.xml" ];
const PAGE_TEMPLATE = `
<!DOCTYPE html>
<style>
  main {
    margin: 0 auto;
    max-width: 700px;
  }
</style>
<main>
{{#items}}
  <article>
    <h2><a href="{{link}}">{{title}}</a></h2>
    <h3>by {{dc:creator}} {{pubDate}}</h3>
    {{{content:encoded}}}
  </article>
{{/items}}
</main>`;

const byPubDate = (a, b) => {
  let aPubDate = new Date(a.pubDate);
  let bPubDate = new Date(b.pubDate);
  if (aPubDate < bPubDate) return -1;
  if (aPubDate > bPubDate) return 1;
  return 0;
};

exports.handler = async (event, context) => {
  let feeds = await Promise.all(FEEDS.map(url => parser.parseURL(url)));
  let items = feeds.reduce((previous, current) => previous.concat(current.items), []).sort(byPubDate);
  let page = Mustache.render(PAGE_TEMPLATE, { items });
  return { statusCode: 200, body: page };
};
