---
title: WeQuant 量化交易平台
icon: chart-line
article: false
index: true
category:
  - Quant Trading
  - Projects
tag:
  - Java
  - Spring Boot
  - Trading
  - Microservices
  - Vue.js
  - Python
---

# WeQuant 量化交易平台 - 文档中心

欢迎来到 WeQuant 量化交易平台的文档中心！这里包含了完整的项目文档，涵盖架构设计、API 规范、部署指南和开发指南。

## 📚 文档导航

### 🏗️ [架构文档](./ARCHITECTURE.md)
完整的系统架构文档，包含：
- 微服务架构设计
- 技术栈选择和说明
- 数据库设计
- 数据流设计
- 部署架构
- 性能与监控指标

### 🔌 [API 规范](./api/API_SPECIFICATIONS.md)
详细的 API 接口文档，包含：
- 通用 API 规范
- 用户服务 API
- 股票服务 API
- 交易服务 API
- 市场数据服务 API
- 模拟交易服务 API
- 认证与授权机制
- 错误处理规范

### 🚀 [部署指南](./deployment/DEPLOYMENT_GUIDE.md)
完整的部署指南，包含：
- 系统要求和环境准备
- 快速启动指南
- Docker 容器化部署
- 环境配置（开发/测试/生产）
- 安全配置
- 监控配置
- 故障排除
- 运维脚本

### 💻 [开发指南](./development/DEVELOPMENT_GUIDE.md)
详细的开发指南，包含：
- 开发环境搭建
- 项目结构说明
- 代码规范
- 开发流程
- 测试策略
- 开发工具配置
- 最佳实践

## 🎯 快速开始

### 1. 环境准备
确保你的系统已安装以下软件：
- Java JDK 17+
- Python 3.9+
- Node.js 18+
- Docker 20.10+
- Maven 3.8+

### 2. 快速启动

```bash
# 克隆项目
git clone https://github.com/youweichen0208/WeQuant.git
cd WeQuant

# 启动基础设施
docker-compose up -d mysql redis kafka zookeeper

# 启动后端服务
cd market-data-service && python3 app.py &
cd ../mock-trading-service && python3 app.py &
cd ../stock-service && mvn spring-boot:run &

# 启动前端
cd web-frontend && npm install && npm run dev
```

### 3. 验证部署

访问以下链接验证服务状态：
- 前端服务: http://localhost:3003
- 市场数据服务: http://localhost:5001/api/health
- 模拟交易服务: http://localhost:5002/api/health
- 股票服务: http://localhost:8082/stock-service/api/health

## 📊 系统架构概览

WeQuant 采用微服务架构，主要包含以下组件：

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Vue.js 前端   │────│   Nginx 网关    │────│  Java 微服务集群 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │                      │
                       ┌─────────────────┐    ┌─────────────────┐
                       │ Python 服务集群  │    │   数据存储层     │
                       └─────────────────┘    └─────────────────┘
```

### 核心服务

| 服务 | 端口 | 技术栈 | 功能 |
|------|------|--------|------|
| web-frontend | 3003 | Vue 3 + Vite | 用户界面 |
| user-service | 8081 | Spring Boot | 用户认证 |
| stock-service | 8082 | Spring Boot | 股票数据 |
| trading-service | 8083 | Spring Boot | 交易服务 |
| market-data-service | 5001 | FastAPI | 市场数据 |
| mock-trading-service | 5002 | Flask | 模拟交易 |

### 基础设施

| 组件 | 端口 | 用途 |
|------|------|------|
| MySQL | 3306 | 主数据库 |
| Redis | 6379 | 缓存层 |
| Kafka | 9092 | 消息队列 |
| Zookeeper | 2181 | 服务发现 |

## 🔧 主要功能

### ✅ 已完成功能

1. **智能响应式图表系统**
   - 基于视窗比例的动态K线图适配
   - 支持多种屏幕比例（16:9、21:9、4:3、9:16）
   - 平滑过渡效果和设备自适应

2. **完整的虚拟交易系统**
   - 100万虚拟资金模拟交易
   - 真实市场数据集成（akshare API）
   - 持仓管理和盈亏计算
   - 交易历史记录

3. **微服务架构**
   - Java Spring Boot 企业级服务
   - Python 快速原型服务
   - 前端统一API抽象层
   - 完整的数据库设计

### 🔄 开发中功能

1. **技术指标系统**
   - MA、MACD、RSI、BOLL等指标
   - 可选指标叠加显示
   - 指标参数自定义

2. **用户认证系统**
   - JWT认证机制
   - 用户注册登录
   - 权限管理

3. **策略管理系统**
   - 策略创建和编辑
   - 策略回测引擎
   - 策略运行监控

## 📈 技术亮点

### 前端技术亮点

- **智能响应式系统**: 使用JavaScript动态计算最优图表尺寸
- **高性能图表**: ECharts集成，支持大数据量K线渲染
- **模块化架构**: Vue 3 Composition API + TypeScript
- **状态管理**: Pinia统一状态管理

### 后端技术亮点

- **微服务架构**: Spring Boot + Spring Cloud生态
- **高性能缓存**: Redis缓存热点数据，提升响应速度
- **消息驱动**: Kafka异步处理市场数据更新
- **数据一致性**: 分布式事务管理

### 数据处理亮点

- **实时数据流**: akshare API + Kafka实时数据处理
- **智能缓存**: 多层缓存策略，95%+缓存命中率
- **数据同步**: 双后端架构，Python原型+Java生产

## 🎯 开发规划

### 短期计划（1-2周）

1. **完善技术指标系统**
   - 添加MA、MACD、RSI指标
   - 实现指标参数配置
   - 优化图表性能

2. **修复用户认证系统**
   - 重新启用JWT认证
   - 完善用户管理功能
   - 添加权限控制

3. **增强交易功能**
   - 完善风险控制
   - 添加止盈止损
   - 优化交易体验

### 中期计划（1-2月）

1. **策略管理系统**
   - 策略编辑器
   - 回测引擎
   - 策略市场

2. **高级功能**
   - 实时推送
   - 移动端适配
   - 数据分析

3. **运维体系**
   - 监控告警
   - 日志分析
   - 自动化运维

### 长期计划（3-6月）

1. **生产化改造**
   - 高可用架构
   - 性能优化
   - 安全加固

2. **商业化功能**
   - 付费策略
   - API开放
   - 企业服务

## 🤝 贡献指南

### 贡献流程

1. Fork 项目到你的 GitHub
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

### 代码规范

- **Java**: 遵循 Google Java Style Guide
- **Python**: 遵循 PEP 8 规范
- **JavaScript**: 使用 ESLint + Prettier
- **Git**: 遵循 Conventional Commits 规范

### 测试要求

- 单元测试覆盖率 > 80%
- 所有 API 需要集成测试
- 关键功能需要端到端测试

## 📞 联系我们

- **项目仓库**: https://github.com/youweichen0208/WeQuant
- **问题反馈**: https://github.com/youweichen0208/WeQuant/issues
- **开发文档**: 当前文档目录

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](../LICENSE) 文件了解详细信息。

---

## 📚 扩展阅读

- [量化交易入门指南](https://www.example.com/quant-trading-guide)
- [Spring Boot 微服务最佳实践](https://spring.io/guides)
- [Vue.js 官方文档](https://vuejs.org/)
- [ECharts 图表库](https://echarts.apache.org/)
- [akshare 金融数据库](https://akshare.readthedocs.io/)

---

*最后更新: 2025-10-17*
*文档版本: v1.0*
*维护团队: WeQuant Development Team*