import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    // {
    //   text: "Articles",
    //   icon: "book",
    //   prefix: "posts/",
    //   children: "structure",
    // },
    {
      text: "Data Structure",
      icon: "laptop-code",
      prefix: "data-structure/",
      children: "structure",
    },
    {
      text: "Projects",
      icon: "p",
      prefix: "projects/",
      children: "structure",
    },
    "intro",
  ],
});
