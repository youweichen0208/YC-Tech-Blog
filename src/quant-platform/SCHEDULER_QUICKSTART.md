# Scheduler Service 快速上手指南

## 🎯 简介

Scheduler Service 是量化交易平台的智能调度引擎，它使用AI算法动态评估股票热度，并根据热度自动调整价格更新频率。本指南将帮助你快速上手这个强大的服务。

## 🚀 5分钟快速启动

### 前置条件

```bash
# 确保已安装
✅ Java 17+
✅ Redis 7.0+
✅ Stock Service (8082)
✅ Trading Service (8083)
```

### 第一步：启动Redis

```bash
# 使用Docker快速启动
docker run -d --name redis -p 6379:6379 redis:latest

# 验证Redis运行
redis-cli ping
# 输出: PONG ✅
```

### 第二步：启动依赖服务

```bash
# 启动Stock Service
cd stock-service
mvn spring-boot:run &

# 启动Trading Service
cd trading-service
mvn spring-boot:run &
```

### 第三步：启动Scheduler Service

```bash
cd scheduler-service
mvn spring-boot:run
```

看到以下输出表示启动成功：

```
📅 调度服务启动成功！
🔗 WebSocket连接地址: ws://localhost:8085/ws
📊 健康检查: http://localhost:8085/actuator/health
⏰ 定时任务监控: http://localhost:8085/actuator/scheduledtasks
```

### 第四步：验证服务

```bash
# 健康检查
curl http://localhost:8085/actuator/health

# 查看调度器状态
curl http://localhost:8085/api/v1/scheduler/status

# 查看AI热度排行榜
curl http://localhost:8085/api/v1/scheduler/hotness/ranking?limit=5
```

## 📊 核心功能演示

### 1. AI热度检测

查看实时股票热度评分和分类：

```bash
# 获取热度排行榜（Top 10）
curl http://localhost:8085/api/v1/scheduler/hotness/ranking?limit=10 | jq
```

响应示例：

```json
[
  {
    "stockCode": "600519.SH",
    "stockName": "贵州茅台",
    "hotnessScore": 85.6,        // AI评分
    "category": "SUPER_HOT",      // 自动分类
    "volume": 125000000,          // 交易量
    "volatility": 0.045,          // 波动率
    "priceChange": 2.8,           // 涨跌幅
    "updateFrequency": 120,       // 更新次数
    "lastUpdate": "2024-01-20T14:30:00"
  }
]
```

### 2. 查看指定股票热度

```bash
# 查询贵州茅台的热度数据
curl http://localhost:8085/api/v1/scheduler/hotness/600519.SH | jq
```

### 3. 热度统计信息

```bash
# 获取整体统计
curl http://localhost:8085/api/v1/scheduler/hotness/statistics | jq
```

响应：

```json
{
  "superHotCount": 1,           // 超级热门股票数
  "hotCount": 2,                // 热门股票数
  "normalCount": 15,            // 普通股票数
  "coldCount": 8,               // 冷门股票数
  "totalStocks": 26,            // 总监控股票数
  "averageHotnessScore": 42.5   // 平均热度评分
}
```

### 4. 性能指标监控

```bash
# 查看调度器性能指标
curl http://localhost:8085/api/v1/scheduler/metrics | jq
```

响应：

```json
{
  "totalUpdates": 15240,        // 总更新次数
  "failedUpdates": 12,          // 失败次数
  "successRate": 99.92,         // 成功率
  "monitoredStocks": 26,        // 监控股票数
  "topStocks": {                // 更新最频繁的股票
    "600519.SH": 1520,
    "000001.SZ": 1015
  },
  "aiHotness": {                // AI热度统计
    "superHotCount": 1,
    "hotCount": 2,
    "normalCount": 15,
    "coldCount": 8,
    "averageHotnessScore": 42.5
  }
}
```

## 🔄 WebSocket实时推送

### 前端集成示例

```javascript
// 1. 建立WebSocket连接
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const socket = new SockJS('http://localhost:8085/ws');
const stompClient = Stomp.over(socket);

stompClient.connect({}, (frame) => {
  console.log('WebSocket连接成功！', frame);

  // 2. 订阅股票价格更新
  stompClient.subscribe('/topic/price/600519.SH', (message) => {
    const priceData = JSON.parse(message.body);
    console.log('收到价格更新:', priceData);

    // 更新UI
    updateStockCard(priceData);
  });

  // 3. 订阅交易信号
  stompClient.subscribe('/topic/signals', (message) => {
    const signal = JSON.parse(message.body);
    console.log('收到交易信号:', signal);

    // 显示通知
    showSignalNotification(signal);
  });
});
```

### 消息格式

**价格更新消息**:
```json
{
  "stockCode": "600519.SH",
  "stockName": "贵州茅台",
  "price": 1685.50,
  "change": 2.8,
  "changePercent": 0.0166,
  "volume": 125000000,
  "category": "SUPER_HOT",
  "updateTime": 1705738200000
}
```

**交易信号消息**:
```json
{
  "id": 123,
  "strategyId": 456,
  "stockCode": "600519.SH",
  "stockName": "贵州茅台",
  "signalType": "BUY",
  "price": 1685.50,
  "signalStrength": 0.85,
  "reason": "短期均线上穿长期均线",
  "signalTime": "2024-01-20T14:30:00",
  "executed": false
}
```

## ⚙️ 配置自定义

### 调整更新频率

编辑 `application.yml`:

```yaml
scheduler:
  price-update:
    super-hot-stocks-interval: 3000   # 超级热门: 3秒
    hot-stocks-interval: 5000         # 热门: 5秒
    normal-stocks-interval: 10000     # 普通: 10秒
    cold-stocks-interval: 30000       # 冷门: 30秒
```

### 配置超级热门股票

```yaml
scheduler:
  super-hot-stocks:
    - "600519.SH"  # 贵州茅台
    - "000001.SZ"  # 平安银行
```

### 调整性能参数

```yaml
scheduler:
  performance:
    thread-pool-size: 8        # 线程池大小（推荐: CPU核心数×2）
    parallel-enabled: true     # 启用并行处理
    batch-size: 10            # 批处理大小
```

### 修改交易时段

```yaml
scheduler:
  trading-hours:
    start: "09:30"   # 开始时间
    end: "15:00"     # 结束时间
```

## 📈 监控Dashboard

### Prometheus指标

访问: `http://localhost:8085/actuator/prometheus`

关键指标：
```
scheduler_price_updates_total        # 总更新次数
scheduler_price_updates_failed       # 失败次数
scheduler_ai_hotness_score           # AI热度评分
scheduler_monitored_stocks           # 监控股票数
```

### Grafana可视化

1. 启动Grafana:
```bash
docker run -d -p 3000:3000 grafana/grafana
```

2. 访问: `http://localhost:3000` (admin/admin)

3. 导入Dashboard:
   - 上传 `infrastructure/grafana/dashboards/scheduler-monitor.json`

## 🔍 实时监控前端页面

访问前端实时监控页面查看可视化数据：

```
http://localhost:3003/monitoring/realtime
```

功能包括：
- 📊 实时股票卡片展示
- 📈 热度分布统计
- 🔔 实时更新日志
- 🎯 分类筛选和排序

## 🎓 进阶使用

### 1. 自定义热度评分权重

修改 `StockHotnessDetectionService.java`:

```java
// 调整权重配置
private static final double VOLUME_WEIGHT = 0.3;        // 交易量权重
private static final double VOLATILITY_WEIGHT = 0.25;   // 波动率权重
private static final double PRICE_CHANGE_WEIGHT = 0.2;  // 价格变化权重
private static final double FREQUENCY_WEIGHT = 0.15;    // 更新频率权重
private static final double TIME_DECAY_WEIGHT = 0.1;    // 时间衰减权重
```

### 2. 调整热度阈值

```java
// 修改分类阈值
private static final double SUPER_HOT_THRESHOLD = 80.0;  // 超级热门
private static final double HOT_THRESHOLD = 60.0;       // 热门
private static final double NORMAL_THRESHOLD = 30.0;    // 普通
```

### 3. 启用策略自动交易

```yaml
scheduler:
  auto-trade-enabled: true  # ⚠️ 谨慎启用
```

启用后，系统会自动执行策略生成的交易信号。

## 📝 常见使用场景

### 场景1：监控重点股票

1. 配置超级热门股票列表
2. 系统自动3秒更新
3. WebSocket实时推送给前端
4. 前端展示实时价格卡片

### 场景2：策略自动执行

1. 创建交易策略（如MA交叉策略）
2. 启用策略监控
3. 系统自动检测信号
4. 推送信号给用户
5. （可选）自动执行交易

### 场景3：性能监控分析

1. 访问Grafana dashboard
2. 查看实时更新趋势
3. 分析成功率和性能
4. 识别热门股票变化

## 🐛 故障排查

### 问题1：Redis连接失败

```bash
# 检查Redis状态
redis-cli ping

# 如果返回错误，重启Redis
docker restart redis
```

### 问题2：Stock Service调用失败

```bash
# 检查Stock Service状态
curl http://localhost:8082/actuator/health

# 检查端口是否被占用
lsof -i :8082
```

### 问题3：非交易时段无数据

这是正常现象。系统默认只在9:30-15:00更新数据。

**测试时临时关闭限制**:
```java
// TieredPricePollingScheduler.java
private boolean isTradingHours() {
    return true;  // 仅用于测试
}
```

## 📚 扩展阅读

- [完整技术文档](./SCHEDULER_SERVICE.md) - 深入了解架构和算法
- [AI热度检测详解](../../scheduler-service/AI_HOTNESS_DETECTION.md)
- [轮询优化文档](../../scheduler-service/POLLING_OPTIMIZATION.md)
- [部署说明](../../scheduler-service/DEPLOYMENT_NOTES.md)

## 💡 最佳实践

1. **开发环境**: 关闭Kafka，使用轮询模式即可
2. **生产环境**: 根据负载调整线程池大小
3. **监控配置**: 始终启用Prometheus + Grafana
4. **缓存策略**: 确保Redis有足够内存
5. **热度权重**: 根据实际需求调整评分权重

## 🎯 下一步

- ✅ 尝试修改热度权重，观察分类变化
- ✅ 集成前端WebSocket，实现实时UI
- ✅ 配置Grafana Dashboard，可视化监控
- ✅ 创建自定义交易策略，测试自动执行

---

*快速上手指南 - 让你在5分钟内体验Scheduler Service的强大功能！*
