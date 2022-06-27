import { builder } from '@netlify/functions';
import Parser from "rss-parser";
const parser = new Parser();

const FEEDS = [ "http://reasonablypolymorphic.com/feed.rss",
                "http://www.schneier.com/blog/index.rdf",
                "http://blog.jessitron.com/feeds/posts/default",
                "http://www.codinghorror.com/blog/index.xml",
                "http://www.junauza.com/feeds/posts/default",
                "http://feeds.feedburner.com/adaptivepath",
                "http://www.susanjfowler.com/blog?format=RSS",
                "http://me.veekun.com/atom.xml",
                "https://squarknotes.substack.com/feed/",
                "http://rachelbythebay.com/w/atom.xml",
                "http://dragan.rocks/feed.xml",
                "http://erratasec.blogspot.com/feeds/posts/default",
                "http://www.sandimetz.com/atom.xml",
                "http://www.joelonsoftware.com/rss.xml",
                "http://www.javaspecialists.eu/archive/tjsn.rss",
                "http://www.cliffc.org/blog/feed/",
                "http://danluu.com/atom.xml",
                "http://hacks.mozilla.org/feed/",
                "http://tonsky.me/blog/atom.xml",
                "http://stuartsierra.com/feed",
                "http://gigasquidsoftware.com/atom.xml",
                "http://akaptur.com/atom.xml",
                "http://mrale.ph/atom.xml",
                "http://tomasp.net/rss.xml",
                "http://henrikwarne.com/feed/",
                "http://feeds.feedburner.com/eod_full",
                "https://chrispenner.ca/atom.xml",
                "http://pathsensitive.blogspot.com/feeds/posts/default",
                "http://blog.cleancoder.com/atom.xml",
                "http://www.stephendiehl.com/feed.rss",
                "http://kparal.wordpress.com/feed/",
                "https://veryseriousblog.com/posts?format=rss",
                "https://juxt.pro/blog/rss.xml",
                "http://githubengineering.com/atom.xml",
                "http://www.codesimplicity.com/feed/atom/",
                "https://mzucker.github.io/feed.xml",
                "http://psy-lob-saw.blogspot.com/feeds/posts/default",
                "https://www.micahlerner.com/feed.xml",
                "http://blog.golang.org/feeds/posts/default",
                "https://mtlynch.io/index.xml",
                "http://www.amihaiemil.com/feed.xml",
                "http://neweconomicperspectives.org/feed",
                "http://stephaniekelton.com/feed/",
                "https://professionalscrublord.tumblr.com/rss",
                "https://openparliament.ca/politicians/10906/rss/activity/",
                "http://feeds.feedburner.com/MeltingAsphalt",
                "https://thezvi.wordpress.com/feed/",
                "http://acesounderglass.com/feed/",
                "http://www.edge.org/feed",
                "https://sideways-view.com/feed/",
                "http://waitbutwhy.com/feed",
                "https://commoncog.com/blog/rss/",
                "http://what-if.xkcd.com/feed.atom",
                "http://slatestarcodex.com/feed/",
                "https://dirdle.wordpress.com/feed/",
                "https://astralcodexten.substack.com/feed/" ];

const handler = builder(async (event, context) => {
  // parse index
  try {
    var index = event.path.substring(event.path.lastIndexOf('/') + 1);
    if (index < 0 || index > FEEDS.length) return { statusCode: 402, body: 'Index is out of bounds' };
  } catch (e) {
    return { statusCode: 402, body: "Index must be a number" };
  }
  // download feed as JSON
  let url = FEEDS[index];
  try {
    var feed = await parser.parseURL(url);
  } catch (e) {
    console.log(url + " cannot be reached");
    var feed = {items:[]};
  }
  return { statusCode: 200, headers: {"Content-Type": "application/json"}, ttl: 86400 /* 24 hours */, body: JSON.stringify(feed) };
});

export { FEEDS, handler };