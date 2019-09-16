const axios = require("axios");
const fs = require("fs");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

const url = "https://www.reddit.com/r/news/";

//https://pusher.com/tutorials/web-scraper-node

puppeteer
  .launch()
  .then(browser => browser.newPage())
  .then(async page => {
    await page.goto(url);
    return page.content();
  })
  .then(html => {
    const $ = cheerio.load(html);
    // const newsHeadlines = [];
    // $('a[href*="/r/news/comments"] > h2').each(function() {
    //   newsHeadlines.push({
    //     title: $(this).text()
    //   });
    // });

    // console.log(newsHeadlines);

    fs.writeFile("reddit.text", $.text(), err => {
      console.log(err);
    });
  });
