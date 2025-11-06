import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "Frontend",
      icon: "code",
      prefix: "frontend/",
      children: "structure",
    },
    {
      text: "Backend",
      icon: "server",
      prefix: "backend/",
      children: "structure",
    },
    {
      text: "Data Structure",
      icon: "diagram-project",
      prefix: "data-structure/",
      children: "structure",
    },
    {
      text: "🤖 AI 工具",
      icon: "robot",
      prefix: "ai-tools/",
      children: "structure",
    },
    {
      text: "Projects",
      icon: "folder-open",
      prefix: "projects/",
      children: "structure",
    },
    {
      text: "Interview Prep",
      icon: "graduation-cap",
      prefix: "interview-prep/",
      children: "structure",
    },
    "intro",
  ],
  "/quant-platform/": [
    "",
    {
      text: "📅 开发日志",
      icon: "calendar-days",
      children: [
        "DEVLOG_20251028",
      ],
    },
    {
      text: "架构设计",
      icon: "sitemap",
      children: [
        "ARCHITECTURE",
        "api/API_SPECIFICATIONS",
      ],
    },
    {
      text: "🆕 核心服务",
      icon: "gears",
      children: [
        "SCHEDULER_SERVICE",
        "SCHEDULER_QUICKSTART",
      ],
    },
    {
      text: "开发指南",
      icon: "laptop-code",
      children: [
        "development/DEVELOPMENT_GUIDE",
        "COVERAGE",
      ],
    },
    {
      text: "数据库",
      icon: "database",
      children: [
        "DATABASE_TUTORIAL",
        "MySQL教程",
        "JPA_TUTORIAL",
        "DATAGRIP_TUTORIAL",
        "DATABASE_ACCESS",
      ],
    },
    {
      text: "中间件",
      icon: "layer-group",
      children: [
        "Kafka教程",
        "Redis教程",
        "Zookeeper教程",
      ],
    },
    {
      text: "安全认证",
      icon: "shield-halved",
      children: [
        "SPRING_SECURITY_TUTORIAL",
      ],
    },
    {
      text: "交易策略",
      icon: "chart-line",
      children: [
        "MA_CROSS_STRATEGY_GUIDE",
        "STRATEGY_TEST_GUIDE",
        "STOCK_DATA_API_TUTORIAL",
      ],
    },
    {
      text: "部署运维",
      icon: "rocket",
      children: [
        "deployment/DEPLOYMENT_GUIDE",
        "DEPLOYMENT",
        "MONITORING",
      ],
    },
  ],
  "/ai-tools/": [
    "",
    {
      text: "🏗️ 本地大模型系统",
      icon: "microchip",
      children: [
        "LOCAL_LLM_ARCHITECTURE",
        "QUICKSTART",
      ],
    },
    {
      text: "💻 实现代码",
      icon: "code",
      children: [
        "code/local_llm_proxy",
        "code/claude_tools_integration",
        "code/setup-local-llm",
      ],
    },
    {
      text: "🚀 部署配置",
      icon: "rocket",
      children: [
        "code/docker-compose",
        "code/requirements",
        "code/Dockerfile",
      ],
    },
  ],
});
