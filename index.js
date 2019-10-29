const express = require("express");
const fs = require("fs");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  res.send("Server is Up...");
});

app.post("/api/html/", async (req, res) => {
  //https://pusher.com/tutorials/web-scraper-node\
  let html = await puppeteer
    .launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    })
    .then(browser => browser.newPage())
    .then(async page => {
      await page.goto(req.body.url);
      return page.content();
    });
  res.json({ result: cheerio.load(html).html() });
});

// app.use('/api', router);

//ENV VARIABLE PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening at port " + port + " ..."));
