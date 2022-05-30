import Mustache from "mustache";
import dateformat from "dateformat";
import Parser from "rss-parser";
const parser = new Parser();

const FEEDS = [ "https://astralcodexten.substack.com/feed",
                "https://mtlynch.io/posts/index.xml" ];
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
    </script>`;

const getFeedItems = async () => {
  let feeds = await Promise.all(FEEDS.map(url => parser.parseURL(url)));
  return feeds.reduce((previous, current) => previous.concat(current.items), []);
};

const formatItem = (item) => {
  let date = new Date(item.pubDate);
  return {
    title: item.title,
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