import { getFeedItems } from "../functions/rss-reader.js";
import { test } from "uvu";
import * as assert from "uvu/assert";

test("feed items use known fields", async () => {
  for (let item of (await getFeedItems())) {
    let s = JSON.stringify(item);
    assert.ok(item.link, "Missing 'link' field from " + s);
    assert.ok(item.pubDate, "Missing 'pubDate' field from " + s);
    assert.ok(item.content || item["content:encoded"], "Missing 'content'/'content:encoded' fields from " + s);
  }
});

test.run();
