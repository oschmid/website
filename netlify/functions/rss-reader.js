import Parser from "rss-parser";
const parser = new Parser();

const FEEDS = [ "https://astralcodexten.substack.com/feed" ];

exports.handler = async (event, context) => {
  let feed = await parser.parseURL(FEEDS[0]);
  return { statusCode: 200, body: JSON.stringify(feed.items) };
};
