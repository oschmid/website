import Mustache from "mustache";
import Parser from "rss-parser";
const parser = new Parser();

const FEEDS = [ "https://astralcodexten.substack.com/feed" ];
const PAGE_TEMPLATE = `
<!DOCTYPE html>
<ul>
{{#items}}
  <li>{{title}}
{{/items}}
</ul>`;

exports.handler = async (event, context) => {
  let feed = await parser.parseURL(FEEDS[0]);
  let page = Mustache.render(PAGE_TEMPLATE, feed);
  return { statusCode: 200, body: page };
};
