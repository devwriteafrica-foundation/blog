<<<<<<< HEAD
const { CONFIG } = require("./site.config")

module.exports = {
  siteUrl: CONFIG.link,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  generateIndexSitemap: false,
=======
const BLOG = require('./blog.config')

module.exports = {
  siteUrl: BLOG.link,
  generateRobotsTxt: true,
  sitemapSize: 7000
  // ...other options
  // https://github.com/iamvishnusankar/next-sitemap#configuration-options
>>>>>>> 4704589 (chore files)
}
