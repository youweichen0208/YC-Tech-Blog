import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
// import { docsearchPlugin } from "@vuepress/plugin-docsearch";
// import { searchProPlugin } from "vuepress-plugin-search-pro";
export default defineUserConfig({
  // 使用自定义域名时改为 "/"，使用 GitHub Pages 默认域名时改为 "/YC-Tech-Blog/"
  base: "/YC-Tech-Blog/",

  lang: "en-US",
  title: "YC Tech Blog",
  description: "A blog demo for vuepress-theme-hope",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  theme,
  // plugins: [
  //   searchProPlugin({
  //     // index all contents
  //     indexContent: true,
  //     // add supports for category and tags
  //     customFields: [
  //       {
  //         getter: (page) => page.frontmatter.category,
  //         formatter: "Category: $content",
  //       },
  //       {
  //         getter: (page) => page.frontmatter.tag,
  //         formatter: "Tag: $content",
  //       },
  //     ],
  //   }),
  // ],
  // Enable it with pwa
  // shouldPrefetch: false,
});
