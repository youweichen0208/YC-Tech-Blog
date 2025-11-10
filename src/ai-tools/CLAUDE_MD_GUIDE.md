---
title: Claude.md 项目配置完全指南
icon: file-code
order: 5
---

# Claude.md 项目配置完全指南

## 📖 什么是 claude.md？

`.claude/claude.md` 是 **Claude Code CLI 的项目级上下文配置文件**，用于：

- ✅ 定义项目规范和编码标准
- ✅ 配置构建工具命令（Maven/Gradle/npm等）
- ✅ 提供项目架构和目录说明
- ✅ 设置开发工作流和最佳实践
- ✅ **每次对话自动加载，无需重复说明**

## 🎯 核心优势

| 对比项 | 不使用 claude.md | 使用 claude.md |
|-------|----------------|---------------|
| 项目规范 | ❌ 每次都要重复说明 | ✅ 自动遵循规范 |
| 构建命令 | ❌ 可能用错命令 | ✅ 使用正确的构建流程 |
| 代码风格 | ❌ 不一致 | ✅ 统一规范 |
| 团队协作 | ❌ 个人经验 | ✅ 团队共识 |

## 📂 文件位置

```
your-project/
├── .claude/
│   ├── claude.md          # 项目上下文（主要配置）
│   └── settings.json      # CLI 设置（钩子、环境变量等）
├── src/
└── pom.xml
```

## 🚀 快速开始

### 创建基础 claude.md

```bash
# 创建 .claude 目录
mkdir -p .claude

# 创建 claude.md
cat > .claude/claude.md << 'EOF'
# 项目名称

简短的项目描述（1-2句话）

## 技术栈

- Java 17
- Spring Boot 3.2
- Maven 3.9
- MySQL 8.0

## 构建命令

**编译项目：**
```bash
mvn clean compile
```

**运行测试：**
```bash
mvn test
```

**打包：**
```bash
mvn clean package -DskipTests
```

## 代码规范

- 使用 4 空格缩进
- 类名使用大驼峰命名
- 方法名使用小驼峰命名
EOF
```

### 验证配置

```bash
# 启动 Claude CLI，它会自动读取 claude.md
claude "帮我编译项目"

# Claude 会根据 claude.md 中的构建命令自动执行：
# mvn clean compile
```

## 📋 完整的 claude.md 模板

### Maven 项目示例

```markdown
# WeQuant 量化交易平台

基于 Spring Boot 的分布式量化交易系统，包含股票数据采集、策略回测、实时交易等功能。

## 项目信息

- **仓库：** https://github.com/youweichen/quant-trading-platform
- **技术栈：** Java 17, Spring Boot 3.2, MySQL 8.0, Redis, Kafka
- **包管理：** Maven 3.9.x
- **JDK 版本：** Java 17 (Temurin)

## 🏗️ 项目结构

```
quant-trading-platform/
├── stock-service/           # 股票数据服务
├── trading-service/         # 交易策略服务
├── scheduler-service/       # 定时调度服务
├── common/                  # 公共模块
└── frontend/               # 前端项目（Vue 3）
```

## 🛠️ 构建命令

### Maven 命令规范

**⚠️ 重要：本项目使用 Maven Wrapper，必须使用 `./mvnw` 而不是 `mvn`**

**编译整个项目：**
```bash
./mvnw clean compile
```

**编译单个模块：**
```bash
./mvnw clean compile -pl stock-service -am
```

**运行测试：**
```bash
# 运行所有测试
./mvnw test

# 跳过测试
./mvnw clean install -DskipTests
```

**打包部署：**
```bash
# 打包所有模块
./mvnw clean package -DskipTests

# 打包单个服务
./mvnw clean package -pl trading-service -am -DskipTests
```

**依赖管理：**
```bash
# 查看依赖树
./mvnw dependency:tree

# 更新依赖
./mvnw versions:use-latest-releases
```

**本地安装：**
```bash
./mvnw clean install -DskipTests
```

## 🚀 运行服务

### 后端服务

**Stock Service（端口 8082）：**
```bash
cd stock-service
./mvnw spring-boot:run
```

**Trading Service（端口 8083）：**
```bash
cd trading-service
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

**Scheduler Service（端口 8085）：**
```bash
cd scheduler-service
./mvnw spring-boot:run
```

### 前端项目

```bash
cd frontend
npm install
npm run dev  # 开发模式（http://localhost:5173）
npm run build  # 生产构建
```

## 📝 代码规范

### Java 代码风格

1. **命名规范：**
   - 类名：大驼峰（`StockService`, `TradingController`）
   - 方法名：小驼峰（`getStockData`, `executeStrategy`）
   - 常量：全大写下划线（`MAX_RETRY_COUNT`）
   - 包名：全小写（`com.quant.stock.service`）

2. **注释要求：**
   - 所有 public 方法必须有 Javadoc
   - 复杂逻辑必须添加行内注释
   - 使用中文注释（团队中文为主）

3. **代码组织：**
   - Controller 只负责请求处理
   - Service 包含业务逻辑
   - Repository 负责数据访问
   - DTO 用于数据传输

4. **异常处理：**
   - 使用自定义业务异常（`BusinessException`）
   - Controller 统一异常处理（`GlobalExceptionHandler`）
   - 记录详细的错误日志

### 数据库规范

1. **表命名：**
   - 小写下划线分隔（`stock_daily_data`, `trading_strategy`）
   - 使用单数形式

2. **字段命名：**
   - 小写下划线分隔
   - 主键统一使用 `id`
   - 创建时间：`created_at`
   - 更新时间：`updated_at`

3. **索引规范：**
   - 主键索引：`pk_表名`
   - 唯一索引：`uk_表名_字段名`
   - 普通索引：`idx_表名_字段名`

## 🗂️ 模块说明

### Stock Service

**职责：** 股票数据采集、存储、查询

**核心类：**
- `StockDataController` - REST API 接口
- `StockDataService` - 数据处理逻辑
- `StockDataRepository` - 数据库访问

**依赖服务：**
- Python 数据服务（端口 5001）- 调用 AKShare 获取实时数据

### Trading Service

**职责：** 交易策略管理、回测、信号生成

**核心类：**
- `StrategyController` - 策略 API
- `BacktestEngine` - 回测引擎
- `SignalGenerator` - 信号生成器

**支持策略：**
- MA Cross（均线交叉）
- MACD
- RSI
- 布林带

### Scheduler Service

**职责：** 定时任务调度、AI 热度检测

**核心功能：**
- 智能分层轮询（3s/5s/10s/30s）
- AI 驱动的热度评分
- WebSocket 实时推送

## 🔧 开发工作流

### 1. 创建新功能

```bash
# 1. 创建功能分支
git checkout -b feature/your-feature-name

# 2. 开发并提交
git add .
git commit -m "feat: 添加XXX功能"

# 3. 编译测试
./mvnw clean test

# 4. 合并到主分支
git checkout main
git merge feature/your-feature-name
```

### 2. 修复 Bug

```bash
# 1. 创建 bugfix 分支
git checkout -b bugfix/issue-123

# 2. 修复并提交
git commit -m "fix: 修复XXX问题 #123"

# 3. 运行测试确保修复
./mvnw test
```

### 3. 代码审查要点

- ✅ 是否符合代码规范
- ✅ 是否有足够的单元测试
- ✅ 是否有清晰的注释
- ✅ 是否有潜在的性能问题
- ✅ 是否处理了异常情况

## 🧪 测试规范

### 单元测试

```java
@SpringBootTest
class StockServiceTest {

    @Autowired
    private StockService stockService;

    @Test
    @DisplayName("测试获取股票历史数据")
    void testGetStockHistory() {
        // Given
        String stockCode = "000001.SZ";
        int days = 30;

        // When
        List<StockData> result = stockService.getStockHistory(stockCode, days);

        // Then
        assertNotNull(result);
        assertTrue(result.size() <= days);
    }
}
```

### 集成测试

```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class TradingControllerIntegrationTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void testCreateStrategy() {
        // 测试完整的 HTTP 请求流程
    }
}
```

## 📊 性能优化指南

### 数据库优化

1. **使用索引：** 为常用查询字段添加索引
2. **分页查询：** 大数据量必须分页
3. **批量操作：** 使用 batch insert/update
4. **连接池：** HikariCP 配置（最小10，最大50）

### 缓存策略

1. **Redis 缓存：**
   - 热门股票数据：缓存 5 分钟
   - 用户配置：缓存 1 小时
   - 策略结果：缓存 10 分钟

2. **本地缓存：**
   - 使用 `@Cacheable` 注解
   - 配置 Caffeine 缓存

## 🐛 常见问题

### 1. Maven 编译失败

**问题：** `mvn: command not found`

**解决：** 使用 Maven Wrapper
```bash
./mvnw clean compile
```

### 2. 端口被占用

**问题：** `Port 8082 is already in use`

**解决：**
```bash
# 查找占用端口的进程
lsof -i :8082

# 杀死进程
kill -9 <PID>
```

### 3. 数据库连接失败

**问题：** `Connection refused`

**解决：**
```bash
# 检查 MySQL 是否运行
docker ps | grep mysql

# 启动 MySQL
docker-compose up -d mysql
```

## 🔐 安全规范

1. **敏感信息：**
   - ❌ 不要在代码中硬编码密码、API Key
   - ✅ 使用环境变量或配置文件
   - ✅ `.env` 文件加入 `.gitignore`

2. **SQL 注入防护：**
   - ✅ 使用 JPA/MyBatis 参数化查询
   - ❌ 避免拼接 SQL 字符串

3. **权限控制：**
   - ✅ 使用 Spring Security
   - ✅ API 接口需要认证
   - ✅ 敏感操作需要权限检查

## 📚 相关文档

- [架构设计文档](../quant-platform/ARCHITECTURE.md)
- [API 接口文档](../quant-platform/api/API_SPECIFICATIONS.md)
- [部署运维指南](../quant-platform/deployment/DEPLOYMENT_GUIDE.md)
- [Scheduler Service 文档](../quant-platform/SCHEDULER_SERVICE.md)

## 💡 最佳实践

### 1. 提交信息规范

```bash
# 格式：<type>: <description>
feat: 添加均线交叉策略
fix: 修复股票数据重复问题
docs: 更新 API 文档
refactor: 重构交易引擎代码
test: 添加策略回测单元测试
chore: 更新依赖版本
```

### 2. 分支管理

- `main` - 主分支（生产环境）
- `develop` - 开发分支
- `feature/*` - 功能分支
- `bugfix/*` - 修复分支
- `hotfix/*` - 紧急修复

### 3. 代码审查清单

- [ ] 代码符合规范
- [ ] 有足够的单元测试
- [ ] 注释清晰完整
- [ ] 无硬编码敏感信息
- [ ] 性能优化到位
- [ ] 异常处理完善

## 🎯 给 Claude 的指引

### 优先级原则

1. **安全第一：** 不要跳过测试，不要忽略异常
2. **规范优先：** 严格遵循本文档的代码规范
3. **清晰沟通：** 不确定时询问，不要猜测需求
4. **完整实现：** 功能完整，包括测试和文档

### 常用任务模板

**添加新接口：**
1. 在 Controller 添加接口方法
2. 在 Service 实现业务逻辑
3. 添加单元测试
4. 更新 API 文档

**修复 Bug：**
1. 定位问题代码
2. 分析根本原因
3. 实现修复
4. 添加回归测试

**性能优化：**
1. 定位性能瓶颈
2. 分析优化方案
3. 实现优化
4. 性能测试对比
```

## 🎨 优秀的 claude.md 应该包含什么？

### 必备内容 ✅

1. **项目基本信息**
   - 项目名称和简介
   - 技术栈
   - 仓库地址

2. **构建命令**（最重要）
   - 编译命令
   - 测试命令
   - 打包命令
   - 运行命令

3. **代码规范**
   - 命名规范
   - 代码风格
   - 注释要求

4. **项目结构**
   - 目录说明
   - 模块职责
   - 依赖关系

5. **开发工作流**
   - 分支策略
   - 提交规范
   - 代码审查

### 可选内容 📋

6. **测试规范**
7. **性能优化指南**
8. **常见问题 FAQ**
9. **安全规范**
10. **相关文档链接**

## 🔄 工作原理

```
┌──────────────────────────────────────────────────┐
│  你启动 Claude CLI                                │
│  $ claude "帮我编译项目"                          │
└──────────────────┬───────────────────────────────┘
                   │
                   ↓
┌──────────────────────────────────────────────────┐
│  Claude 自动读取 .claude/claude.md               │
│  - 加载项目规范                                   │
│  - 加载构建命令                                   │
│  - 加载代码标准                                   │
└──────────────────┬───────────────────────────────┘
                   │
                   ↓
┌──────────────────────────────────────────────────┐
│  Claude 根据 claude.md 执行                      │
│  - 识别到"编译项目"                              │
│  - 查找 claude.md 中的编译命令                   │
│  - 执行: ./mvnw clean compile                   │
└──────────────────────────────────────────────────┘
```

## 💡 实战技巧

### 1. 明确指定使用的命令

```markdown
## 构建命令

**⚠️ 本项目使用 Maven Wrapper，必须使用 `./mvnw` 而不是 `mvn`**

**编译项目：**
```bash
./mvnw clean compile
```
```

这样 Claude 就会优先使用 `./mvnw` 而不是 `mvn`。

### 2. 提供多种场景的命令

```markdown
## 构建命令

**完整构建（包含测试）：**
```bash
./mvnw clean install
```

**快速构建（跳过测试）：**
```bash
./mvnw clean install -DskipTests
```

**只编译不打包：**
```bash
./mvnw clean compile
```
```

### 3. 说明模块间的依赖

```markdown
## 模块说明

### Common 模块

**重要：** 其他模块都依赖 common 模块，修改 common 后需要重新安装：

```bash
cd common
./mvnw clean install
```
```

### 4. 提供故障排查指南

```markdown
## 常见问题

### Maven 编译失败

如果遇到 `mvn: command not found`，说明系统未安装 Maven。

**解决方案：** 使用项目自带的 Maven Wrapper
```bash
./mvnw clean compile
```
```

## 📦 预批准命令（配合 settings.json）

`.claude/settings.json` 可以配置预批准的命令，避免每次都要确认：

```json
{
  "preapproved_commands": [
    "./mvnw clean compile",
    "./mvnw test",
    "./mvnw clean install -DskipTests",
    "npm run dev",
    "docker-compose up -d"
  ]
}
```

**结合 claude.md 使用：**

```markdown
## 构建命令

**以下命令已预批准，Claude 可以直接执行：**

- `./mvnw clean compile` - 编译项目
- `./mvnw test` - 运行测试
- `npm run dev` - 启动前端开发服务器
```

## 🎓 最佳实践总结

### ✅ DO（推荐做法）

1. ✅ **明确说明构建工具** - "必须使用 ./mvnw 而不是 mvn"
2. ✅ **提供完整命令** - 不要只写 `mvn compile`，要写 `./mvnw clean compile`
3. ✅ **解释命令用途** - "编译项目"、"运行测试"等
4. ✅ **说明依赖关系** - "修改 common 模块需要先 install"
5. ✅ **定期更新** - 随项目演进更新文档
6. ✅ **团队共识** - claude.md 作为团队规范文档

### ❌ DON'T（避免做法）

1. ❌ **过于简略** - 只写"使用 Maven 构建"（不够具体）
2. ❌ **命令错误** - 写错命令导致构建失败
3. ❌ **过时信息** - 没及时更新导致误导
4. ❌ **格式混乱** - 难以阅读和查找
5. ❌ **遗漏关键信息** - 没说明模块依赖关系

## 📊 效果对比

### 没有 claude.md

```
你: "帮我编译项目"

Claude: "我看到你使用 Maven，我会执行 mvn compile"
[执行失败：mvn: command not found]

你: "用 ./mvnw"

Claude: "好的，执行 ./mvnw compile"
[成功]
```

### 有 claude.md

```
你: "帮我编译项目"

Claude: "根据项目配置，执行 ./mvnw clean compile"
[直接成功]
```

## 🚀 立即行动

### 1. 创建你的 claude.md

```bash
mkdir -p .claude
touch .claude/claude.md
```

### 2. 使用模板

复制上面的模板，根据你的项目修改：
- 项目名称和技术栈
- 构建命令
- 代码规范

### 3. 测试效果

```bash
claude "帮我编译项目"
```

Claude 会根据 claude.md 中的配置自动执行正确的命令！

## 📚 相关资源

- 📖 [Claude Code 官方文档](https://docs.claude.com/claude-code)
- 🔧 [settings.json 配置指南](https://docs.claude.com/claude-code/settings)
- 💡 [Claude CLI 最佳实践](https://docs.claude.com/claude-code/best-practices)

---

**💡 提示：** 把 claude.md 纳入版本控制（Git），让团队成员都能使用统一的配置！
