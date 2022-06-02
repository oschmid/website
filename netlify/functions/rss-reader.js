import Mustache from "mustache";
import dateformat from "dateformat";
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
const PAGE_TEMPLATE = `
    <!DOCTYPE html>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.min.css" integrity="sha384-n+0XPuNbU1PaXosJ2ARqt1UgnvuTZqsh+D9uoJRHCanp/VOTJXtZaWOzCzwMZF0n" crossorigin="anonymous" />
    <link rel="stylesheet" href="/styles.min.css">
    <style>
      article {
        display: none;
      }
      article.current {
        display: block;
      }
    </style>
    <div class="section">
      <div class="container">
        <header class="title">
          <h1><a class="is-plain" href="/">Oliver Schmid</a></h1>
        </header>
      </div>
      <main class="container is-readable-column">
      {{#items}}
        <article id="{{postUrl}}" class="section">
          <header>
            <h2><a class="title is-plain" href="{{postUrl}}">{{title}}</a></h2>
          </header>
          <p class="subtitle has-text-grey"><a class="has-text-grey" href="{{siteUrl}}">{{author}}</a>&nbsp;\/\/ {{displayDate}} at {{displayTime}}&nbsp;</span></p>
          <p class="is-plain">{{{body}}}</p>
        </article>
      {{/items}}
      <nav class="pagination is-centered">
        <button id="previous" class="button pagination-previous">Previous</button>
        <button id="next" class="button pagination-next">Next</button>
      </nav>
    </div>
    <footer class="footer">
      <div class="content has-text-centered">
        <a class="is-plain" href="/">Home</a>
        <a class="is-plain is-spaced-footer-link rss-button" title="Subscribe to RSS" href="/index.xml">
          <svg xmlns="http://www.w3.org/2000/svg" class="rss-icon" viewBox="0 0 8 8" width="22" height="22">
            <title>Subscribe to RSS</title>
            <circle cx="2" cy="6" r="1"></circle>
            <path d="m 1,4 a 3,3 0 0 1 3,3 h 1 a 4,4 0 0 0 -4,-4 z"></path>
            <path d="m 1,2 a 5,5 0 0 1 5,5 h 1 a 6,6 0 0 0 -6,-6 z"></path>
          </svg>Subscribe</a>
          <a class="is-plain is-spaced-footer-link" href="/about/">About</a>
          <a class="is-plain is-spaced-footer-link" href="/contact/">Contact</a>
        <p>
        <div>©2022 Oliver Schmid</div>
        <p>
      </div>
    </footer>
    </main>
    <script>
      // initialize state
      let current = -1;
      const articles = document.getElementsByTagName("article");
      const previous = document.getElementById("previous");
      const next = document.getElementById("next");
      let currentArticle = location.hash ? decodeURIComponent(location.hash.substring(1)) : null;
      if (currentArticle) {
        for (let i = 0; i < articles.length; i++) {
          if (articles[i].id === currentArticle) {
            current = i;
            articles[i].classList.add("current");
            break;
          }
        }
      } else if (articles.length > 0) {
        current = 0;
        articles[current].classList.add("current");
      }
      const updateButtons = () => {
        previous.disabled = current < 1;
        next.disabled = current >= articles.length - 1;
      };
      updateButtons();

      // add listeners
      previous.addEventListener("click", (event) => {
        articles[current].classList.remove("current");
        current -= 1;
        location.assign("#" + encodeURIComponent(articles[current].id));
        articles[current].classList.add("current");
        updateButtons();
      });
      next.addEventListener("click", (event) => {
        articles[current].classList.remove("current");
        current += 1;
        location.assign("#" + encodeURIComponent(articles[current].id));
        articles[current].classList.add("current");
        updateButtons();
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "p") {
          previous.click();
        } else if (event.key === "n") {
          next.click();
        }
      });
    </script>`;

const getFeedItems = async () => {
  let feeds = await Promise.all(FEEDS.map(async (url) => {
    try {
      return await parser.parseURL(url);
    } catch (e) {
      console.log(url + " cannot be reached");
      return {items:[]};
    }
  }));
  return feeds.reduce((previous, current) => previous.concat(current.items), []);
};

const formatItem = (item) => {
  let date = new Date(item.pubDate);
  return {
    title: "title" in item ? item.title : dateformat(date, "mmm d, yyyy"),
    postUrl: item.link,
    author: "dc:creator" in item ? item["dc:creator"] : new URL(item.link).hostname.replace("www", ""),
    siteUrl: new URL(item.link).origin,
    date: date,
    displayDate: dateformat(date, "mmm d, yyyy"),
    displayTime: dateformat(date, "h:MMTT"),
    body: "content:encoded" in item ? item["content:encoded"] : item.content
  };
};

const byDate = (a, b) => {
  if (a.date < b.date) return -1;
  if (a.date > b.date) return 1;
  return 0;
};

const handler = async (event, context) => {
  let items = (await getFeedItems()).map(formatItem).sort(byDate);
  let page = Mustache.render(PAGE_TEMPLATE, { items });
  return { statusCode: 200, headers: {"Content-Type": "text/html"}, body: page };
};

export { getFeedItems, handler };