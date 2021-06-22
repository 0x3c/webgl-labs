const { watch } = require("fs/promises");
const { APP_DIR } = require("./path");
const webpack = require("webpack");

const getConfig = async () => await require("./webpack.config");
const getPages = async () => await require("./pages");

(async () => {
  const watcher = watch(APP_DIR, { recursive: true });
  for await (const evt of watcher) {
    const pages = await getPages();
    console.log(pages);
    // webpack(getConfig(), (err, stat) => {
    //   if (err) {
    //     // throw new Error("compile error");
    //   }
    // });
  }
})();
