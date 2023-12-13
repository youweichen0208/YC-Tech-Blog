import { defineClientConfig } from "@vuepress/client";
import Aboutme from "./Aboutme.vue";
export default defineClientConfig({
  enhance: ({ app, router, siteData }) => {
    app.component("Aboutme", Aboutme);
  },
});
