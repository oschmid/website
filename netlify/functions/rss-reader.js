import Mustache from "mustache";
import dateformat from "dateformat";
import Parser from "rss-parser";
const parser = new Parser();

const FEEDS = [ "https://astralcodexten.substack.com/feed",
                "https://mtlynch.io/posts/index.xml" ];
const PAGE_TEMPLATE = `
    <!DOCTYPE html>
    <style>
      main {
        margin: 0 auto;
        max-width: 700px;
      }
      article {
        display: none;
      }
      article.current {
        display: block;
      }
    </style>
    <main>
    {{#items}}
      <article id="{{postUrl}}">
        <h2><a href="{{postUrl}}">{{title}}</a></h2>
        <h3><a href="{{siteUrl}}">{{author}}</a><span>{{displayDate}} at {{displayTime}}</span></h3>
        <div>{{{body}}}</div>
      </article>
    {{/items}}
    <div>
      <button id="previous">Previous</button>
      <button id="next">Next</button>
    </div>
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
  return { statusCode: 200, body: page };
};

export { getFeedItems, handler };