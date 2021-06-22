const fs = require("fs");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const { APP_DIR } = require("./path");

const getPageDirs = () => {
  const childs = fs.readdirSync(APP_DIR);
  const pageDirs = childs
    .map((dir) => path.resolve(APP_DIR, dir))
    .filter((dir) => fs.statSync(dir).isDirectory());

  return pageDirs;
};

const getEntrys = (dirs) => {
  const entrys = [];
  const getEntryJsPath = (dir) => {
    return path.resolve(dir, "index.js");
  };
  const getEntryHtmlPath = (dir) => {
    return path.resolve(dir, "index.html");
  };
  dirs.forEach((dir) => {
    const jsPath = getEntryJsPath(dir);
    const htmlPath = getEntryHtmlPath(dir);
    const isHtmlExist = fs.existsSync(htmlPath);
    if (!isHtmlExist) {
      return;
    }
    const isEntryJsExist = fs.existsSync(jsPath);
    if (!isEntryJsExist) {
      return;
    }
    const entry = {
      root: dir,
      js: jsPath,
      html: htmlPath,
      pageDir: path.relative(APP_DIR, dir),
    };
    entrys.push(entry);
  });
  return entrys;
};

const getEntryConfig = (entry) => {};
const getHtmlPlugin = (entry) => {
  //
};
const getOutputConfig = (entry) => {
  //
};

const getConfigs = (entries) => {
  const configs = [];
  entries.forEach(({ pageDir, js, html }) => {
    const pageName = pageDir;
    const entry = {
      [pageName]: js,
    };
    const plugin = new HtmlWebpackPlugin({
      template: html,
      filename: pageName + ".html",
    });
    const cfg = { plugin, entry };
    configs.push(cfg);
  });
  return configs;
};
const getPagesConfig = () => {
  const dirs = getPageDirs();
  const entries = getEntrys(dirs);
  return getConfigs(entries);
};
const pages = getPagesConfig();

module.exports = pages;
