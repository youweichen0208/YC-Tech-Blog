# 双均线交叉策略功能 - 测试指南

## 🎯 功能概述

已实现完整的双均线交叉策略系统，包括：
- ✅ 技术指标计算库（MA、MACD、RSI、BOLL）
- ✅ 策略接口和双均线交叉策略实现
- ✅ 数据库实体和Repository
- ✅ 策略服务层和REST API
- ✅ 前端策略管理页面

## 📋 测试步骤

### 1. 启动后端服务

```bash
# 进入trading-service目录
cd trading-service

# 使用Maven启动（需要安装Maven）
mvn spring-boot:run

# 或使用Gradle（如果有gradle wrapper）
./gradlew bootRun
```

服务将在端口 **8083** 启动。

### 2. 验证服务健康状态

```bash
# 检查策略服务健康状态
curl http://localhost:8083/trading-service/api/strategy/health

# 预期响应：
# {"status":"UP","service":"strategy-service"}
```

### 3. 获取支持的策略类型

```bash
curl http://localhost:8083/trading-service/api/strategy/types

# 预期响应包含MA_CROSS策略信息
```

### 4. 创建双均线交叉策略

```bash
curl -X POST http://localhost:8083/trading-service/api/strategy/create \
  -H "Content-Type: application/json" \
  -d '{
    "name": "我的第一个策略",
    "type": "MA_CROSS",
    "description": "5日和20日均线交叉策略",
    "parameters": "{\"shortPeriod\": 5, \"longPeriod\": 20}",
    "userId": 1
  }'

# 预期响应：
# {"success":true,"message":"策略创建成功","strategy":{...}}
# 记录返回的strategy.id用于后续测试
```

### 5. 为指定股票生成交易信号

```bash
# 假设上一步返回的strategyId是1
curl -X POST http://localhost:8083/trading-service/api/strategy/1/signal/000001.SZ

# 预期响应：
# {
#   "success": true,
#   "message": "信号生成成功",
#   "signal": {
#     "stockCode": "000001.SZ",
#     "stockName": "平安银行",
#     "signalType": "BUY" | "SELL" | "HOLD",
#     "price": 11.16,
#     "signalStrength": 2.5,
#     "reason": "金叉信号: MA5(11.20) 向上穿越 MA20(11.00)",
#     "signalTime": "2025-10-23T12:00:00"
#   }
# }
```

### 6. 批量生成多只股票的信号

```bash
curl -X POST http://localhost:8083/trading-service/api/strategy/1/signals \
  -H "Content-Type: application/json" \
  -d '{
    "stockCodes": ["000001.SZ", "600036.SH", "600519.SH"]
  }'

# 预期响应：
# {
#   "success": true,
#   "message": "批量信号生成完成",
#   "signals": [...],
#   "totalCount": 3
# }
```

### 7. 查看策略的所有历史信号

```bash
curl http://localhost:8083/trading-service/api/strategy/1/signals

# 返回该策略生成的所有信号记录
```

### 8. 前端测试

```bash
# 启动前端（在项目根目录）
cd web-frontend
npm install  # 如果还没安装依赖
npm run dev

# 访问 http://localhost:3003/dashboard/strategy
```

**前端操作流程：**
1. 点击"创建新策略"按钮
2. 填写策略名称，选择"双均线交叉"策略类型
3. 配置短期均线（5日）和长期均线（20日）
4. 点击"创建"
5. 在策略列表中点击"生成信号"
6. 输入股票代码（如 000001.SZ）
7. 查看生成的交易信号（BUY/SELL/HOLD）
8. 点击"查看信号"查看历史记录

## 🧪 测试用例

### 测试用例 1: 金叉信号（买入）
当短期MA向上穿越长期MA时，应该生成BUY信号。

**模拟数据特征：**
- 前一天：MA5 < MA20
- 当天：MA5 > MA20
- **预期结果：** signalType = "BUY"

### 测试用例 2: 死叉信号（卖出）
当短期MA向下穿越长期MA时，应该生成SELL信号。

**模拟数据特征：**
- 前一天：MA5 > MA20
- 当天：MA5 < MA20
- **预期结果：** signalType = "SELL"

### 测试用例 3: 无交叉（持有）
当没有交叉发生时，应该生成HOLD信号。

**预期结果：** signalType = "HOLD"

## 📊 关键文件位置

### 后端
```
trading-service/src/main/java/com/quant/trading/
├── indicator/
│   └── IndicatorCalculator.java          # 技术指标计算
├── strategy/
│   ├── TradingStrategy.java              # 策略接口
│   └── MovingAverageCrossStrategy.java   # 双均线策略实现
├── entity/
│   ├── Strategy.java                     # 策略实体
│   └── StrategySignal.java               # 信号实体
├── repository/
│   ├── StrategyRepository.java
│   └── StrategySignalRepository.java
├── service/
│   └── StrategyService.java              # 策略服务
└── controller/
    └── StrategyController.java           # REST API
```

### 前端
```
web-frontend/src/
├── views/dashboard/
│   ├── Strategy.vue                      # 策略管理页面
│   └── Layout.vue                        # 导航菜单（已添加策略入口）
└── router/
    └── index.js                          # 路由配置（已添加/strategy路由）
```

## 🎯 信号类型说明

### BUY（买入信号）
- **条件：** 金叉（Golden Cross）
- **定义：** 短期均线向上穿越长期均线
- **操作建议：** 考虑买入该股票

### SELL（卖出信号）
- **条件：** 死叉（Death Cross）
- **定义：** 短期均线向下穿越长期均线
- **操作建议：** 考虑卖出持仓

### HOLD（持有信号）
- **条件：** 无交叉发生
- **定义：** 短期均线和长期均线保持原有相对位置
- **操作建议：** 保持当前仓位

## 📈 信号强度计算

信号强度表示均线交叉的程度：

```java
// 买入信号强度 = (MA5 - MA20) / MA20 * 100
// 卖出信号强度 = (MA20 - MA5) / MA20 * 100
```

**强度解读：**
- 0-1%: 弱信号
- 1-3%: 中等信号
- 3%+: 强信号

## 🔧 常见问题

### Q1: 策略生成"数据不足"信号
**原因：** 历史数据少于长期均线周期（默认20天）
**解决：** 确保提供至少20个以上的历史价格数据点

### Q2: 前端无法访问策略页面
**原因：** 路由未正确配置或服务未启动
**解决：**
1. 确认trading-service在8083端口运行
2. 检查浏览器控制台是否有跨域错误
3. 确认路由配置正确

### Q3: 生成的信号都是HOLD
**原因：** 当前没有均线交叉发生
**解决：** 这是正常现象，只有在交叉时才会产生BUY/SELL信号

## 🚀 下一步开发建议

完成测试后，可以继续开发：

1. **更多策略类型**
   - MACD交叉策略
   - RSI超买超卖策略
   - 布林带突破策略

2. **实时数据集成**
   - 替换模拟数据为真实历史数据
   - 集成market-data-service获取K线数据

3. **自动交易引擎**
   - 定时任务调度（每5分钟扫描一次）
   - 自动执行交易信号
   - 交易结果记录和统计

4. **回测系统**
   - 历史数据回测
   - 策略收益率计算
   - 回测结果可视化

## 📞 技术支持

如遇问题，可以检查：
1. trading-service的日志输出
2. 浏览器开发者工具的Network和Console
3. 数据库中strategies和strategy_signals表的数据
