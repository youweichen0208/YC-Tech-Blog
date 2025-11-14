import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "Frontend",
    icon: "code",
    prefix: "/frontend/",
    children: [
      { text: "React", icon: "react", link: "react" },
      { text: "Vue.js", icon: "vuejs", link: "vue" },
      { text: "Next.js", icon: "layer-group", link: "nextjs" },
      { text: "TypeScript", icon: "file-code", link: "typescript" },
      { text: "JavaScript", icon: "js", link: "javascript" },
      { text: "HTML", icon: "html5", link: "html" },
      { text: "Angular", icon: "angular", link: "angular" },
    ],
  },
  {
    text: "Backend",
    icon: "server",
    prefix: "/backend/",
    children: [
      { text: "Spring", icon: "leaf", link: "spring" },
      { text: "Azure", icon: "cloud", link: "azure" },
      { text: "DDD", icon: "sitemap", link: "ddd" },
      { text: ".NET Core", icon: "microsoft", link: "dotnetcore" },
      { text: "OOP", icon: "object-group", link: "oop" },
      { text: "C#", icon: "code", link: "c#" },
      { text: "Docker", icon: "docker", link: "docker" },
    ],
  },
  {
    text: "Data Structure",
    icon: "diagram-project",
    prefix: "/data-structure/",
    children: [
      { text: "Dynamic Programming", icon: "brain", link: "dp" },
      { text: "Sliding Window", icon: "window-maximize", link: "sliding-window" },
      { text: "Backtracking", icon: "arrows-turn-to-dots", link: "backtracking" },
      { text: "Two Pointers", icon: "hand-point-up", link: "two-pointers" },
      { text: "Prefix Sum", icon: "plus", link: "prefix-sum" },
      { text: "Quick Sort", icon: "arrow-down-short-wide", link: "quick-sort" },
      { text: "DFS", icon: "tree", link: "dfs" },
      { text: "Linked List", icon: "link", link: "linked-list" },
    ],
  },
  {
    text: "Projects",
    icon: "folder-open",
    prefix: "/projects/",
    children: [
      { text: "HokieX", icon: "rocket", link: "hokiex" },
    ],
  },
  {
    text: "🤖 AI Tools",
    icon: "robot",
    prefix: "/ai-tools/",
    children: [
      { text: "本地大模型架构", icon: "microchip", link: "LOCAL_LLM_ARCHITECTURE" },
      { text: "Docker快速部署", icon: "docker", link: "QUICKSTART" },
      { text: "MCP Server企业部署", icon: "server", link: "MCP_SERVER_ENTERPRISE_GUIDE" },
      { text: "Claude Code设计哲学", icon: "lightbulb", link: "CLAUDE_CODE_DESIGN_PHILOSOPHY" },
      { text: "代码总览", icon: "code", link: "CODE_OVERVIEW" },
      { text: "部署指南", icon: "rocket", link: "DOCKER_DEPLOYMENT" },
    ],
  },
  {
    text: "Quant Platform",
    icon: "chart-line",
    link: "/quant-platform/",
  },
  {
    text: "Interview Prep",
    icon: "graduation-cap",
    prefix: "/interview-prep/",
    children: [
      { text: "Java", icon: "java", link: "java" },
      { text: "Cheatsheet", icon: "file-lines", link: "cheatsheet" },
      { text: "SQL", icon: "database", link: "sql" },
    ],
  },
]);
