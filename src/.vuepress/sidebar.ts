import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "Interview Prep",
      icon: "i",
      prefix: "interview-prep/",
      children: "structure",
    },
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
    {
      text: "Backend",
      icon: "p",
      prefix: "backend/",
      children: "structure",
    },
    "intro",
  ],
});
