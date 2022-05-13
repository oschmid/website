import Mustache from "mustache";
import Parser from "rss-parser";
const parser = new Parser();

const FEEDS = [ "https://astralcodexten.substack.com/feed" ];
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

exports.handler = async (event, context) => {
  let feed = await parser.parseURL(FEEDS[0]);
  let page = Mustache.render(PAGE_TEMPLATE, feed);
  return { statusCode: 200, body: page };
};
