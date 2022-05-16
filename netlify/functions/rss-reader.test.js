import { hello } from "./rss-reader.js";
import { test } from "uvu";
import * as assert from "uvu/assert";

test("hello world", async () => {
  assert.is("hello world", hello());
});

test.run();