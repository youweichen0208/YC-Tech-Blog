import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  // {
  //   text: "Posts",
  //   icon: "pen-to-square",
  //   prefix: "/posts/",
  //   children: [
  //     {
  //       text: "Apple",
  //       icon: "pen-to-square",
  //       prefix: "apple/",
  //       children: [
  //         { text: "Apple1", icon: "pen-to-square", link: "1" },
  //         { text: "Apple2", icon: "pen-to-square", link: "2" },
  //       ],
  //     },
  //     {
  //       text: "Banana",
  //       icon: "pen-to-square",
  //       prefix: "banana/",
  //       children: [
  //         {
  //           text: "Banana 1",
  //           icon: "pen-to-square",
  //           link: "1",
  //         },
  //         {
  //           text: "Banana 2",
  //           icon: "pen-to-square",
  //           link: "2",
  //         },
  //         "3",
  //         "4",
  //       ],
  //     },
  //     { text: "Cherry", icon: "pen-to-square", link: "cherry" },
  //     { text: "Dragon Fruit", icon: "pen-to-square", link: "dragonfruit" },
  //     "tomato",
  //     "strawberry",
  //   ],
  // },
  {
    text: "Data structure",
    icon: "pen-to-square",
    prefix: "/data-structure/",
    children: [
      { text: "Dynamic Programming", icon: "pen-to-square", link: "dp" },
      { text: "Sliding Window", icon: "pen-to-square", link: "sliding-window" },
      { text: "Backtracking", icon: "pen-to-square", link: "backtracking" },
      { text: "Two Pointers", icon: "pen-to-square", link: "two-pointers" },
      { text: "Prefix Sum", icon: "pen-to-square", link: "prefix-sum" },
      { text: "Quick Sort", icon: "pen-to-square", link: "quick-sort" },
      { text: "DFS", icon: "pen-to-square", link: "dfs" },
      { text: "Linked List", icon: "pen-to-square", link: "linked-list" },
    ],
  },
  {
    text: "Projects",
    icon: "pen-to-square",
    prefix: "/projects/",
    children: [{ text: "HokieX", icon: "pen-to-square", link: "hokiex" }],
  },
  {
    text: "Interview Prep",
    icon: "pen-to-square",
    prefix: "/interview-prep/",
    children: [
      { text: "Java", icon: "pen-to-square", link: "java" },
      { text: "Cheatsheet", icon: "pen-to-square", link: "cheatsheet" },
      { text: "SQL", icon: "pen-to-square", link: "sql" },
    ],
  },
]);
