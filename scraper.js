// Go to PG site
// Recurrsively go to each link
// Scape div that contains the essay
// Check that div hasnt been saved already
// Save div

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const axios = require("axios");
const cheerio = require("cheerio");
const baseUrl = "http://www.paulgraham.com";
const mongoose = require("mongoose");

const Essays = require("./models/essay");

mongoose.set("debug", false);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

(async () => {
  let savedLinks = await Essays.find({})
    .select("url")
    .catch(err => console.error(err));

  savedLinks = savedLinks.map(e => e.url);

  let res = await axios.get(`${baseUrl}/articles.html`);
  let links = [];
  let $listHtml = cheerio.load(res.data);

  console.log(savedLinks);

  $listHtml("table tr:nth-child(even) a").each((i, el) => {
    let href = baseUrl + "/" + $listHtml(el).attr("href");
    if (savedLinks.indexOf(href) === -1 && href.indexOf(".html") > -1) {
      links.push(href);
    }
  });

  for (const url of links) {
    let res = await axios.get(url);
    let $essayHtml = cheerio.load(res.data);
    let title = $essayHtml("title").text();
    let text = $essayHtml("table table font").text();
    let html = $essayHtml("body > table > tbody > tr > td:nth-child(3)").html();
    console.log(title);
    await Essays({ title, text, html, url })
      .save()
      .catch(err => console.error(err));
  }

  process.exit(0);
})();
