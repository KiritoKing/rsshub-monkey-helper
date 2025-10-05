# Contributing to RSSHub Monkey Helper

感谢你对 RSSHub Monkey Helper 的贡献！这份指南将帮助你了解如何参与项目开发。

## 🚀 快速开始

### 环境要求
- Node.js >= 18
- Bun >= 1.0 （推荐）或 npm/yarn
- Git

### 本地开发设置
```bash
# 1. Fork 并克隆仓库
git clone https://github.com/YOUR_USERNAME/rsshub-monkey-helper.git
cd rsshub-monkey-helper

# 2. 安装依赖
bun install

# 3. 启动开发服务器
bun dev

# 4. 在浏览器中测试（需要用户脚本管理器）
```

## 📝 贡献类型

### 🐛 Bug 报告
在提交 Bug 报告之前，请：
1. 检查是否已有相关 Issue
2. 尝试在最新版本中复现问题
3. 收集详细的错误信息和重现步骤

**Bug 报告模板：**
```markdown
## 🐛 Bug 描述
简洁清晰地描述发生了什么问题。

## 🔄 重现步骤
1. 访问 '...'
2. 点击 '...'
3. 滚动到 '...'
4. 出现错误

## ✅ 期望行为
描述你期望发生的事情。

## 📷 截图
如果适用，添加截图帮助解释问题。

## 🌍 环境信息
- 浏览器: [如 Chrome 120]
- 用户脚本管理器: [如 Tampermonkey 4.19]
- 脚本版本: [如 v1.0.0]
- 操作系统: [如 macOS 14.0]
```

### ✨ 功能请求
提交功能请求时请：
1. 清楚地描述功能和使用场景
2. 解释为什么这个功能对用户有价值
3. 如果可能，提供实现建议

### 🔧 代码贡献

#### 分支命名规范
- `feature/功能名称` - 新功能
- `bugfix/问题描述` - Bug 修复  
- `docs/文档更新` - 文档更新
- `refactor/重构内容` - 代码重构

#### 提交信息规范
使用 [Conventional Commits](https://conventionalcommits.org/) 格式：

```
<类型>[可选范围]: <描述>

[可选正文]

[可选脚注]
```

**类型：**
- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或工具变更

**示例：**
```
feat(bilibili): 添加动态订阅支持

- 新增 Bilibili 动态检测逻辑
- 添加用户动态 RSS 规则
- 更新 UI 显示动态订阅选项

Closes #123
```

#### Pull Request 流程

1. **创建分支**
   ```bash
   git checkout -b feature/new-platform-support
   ```

2. **编写代码**
   - 遵循现有代码风格
   - 添加必要的注释
   - 确保类型安全（TypeScript）

3. **测试验证**
   ```bash
   # 构建测试
   bun build
   
   # 在浏览器中测试功能
   # 确保在不同平台上正常工作
   ```

4. **提交更改**
   ```bash
   git add .
   git commit -m "feat: add new platform support"
   ```

5. **推送并创建 PR**
   ```bash
   git push origin feature/new-platform-support
   ```

#### Code Review 要求
- 代码清晰易懂，有适当注释
- TypeScript 类型正确无错误
- 新功能包含使用示例
- 不破坏现有功能
- 遵循项目架构模式

## 🏗️ 项目架构

### 目录结构
```
src/
├── components/          # UI 组件
│   ├── Panel.tsx       # 主面板
│   └── RuleItem.tsx    # 规则项
├── icons/              # SVG 图标资源
├── rsshub-rules.ts     # 平台规则配置
├── platform-detectors.ts # 平台检测逻辑
├── App.tsx            # 主应用组件
└── index.tsx          # 应用入口
```

### 核心概念

#### Platform（平台）
代表一个支持的网站平台，如 Bilibili、YouTube 等。

#### Rule（规则）
平台下的具体订阅规则，如"UP主投稿"、"播放列表"等。

#### Detector（检测器）
从当前页面 URL 提取参数的逻辑。

### 添加新平台示例

1. **定义平台图标** (`src/icons/new-platform.ts`)
```typescript
export default `<svg>...</svg>`;
```

2. **添加平台配置** (`src/rsshub-rules.ts`)
```typescript
{
  id: 'new-platform',
  name: '新平台',
  icon: newPlatformIcon,
  rules: [
    {
      id: 'user-posts',
      name: '用户动态',
      desc: '获取用户最新动态',
      doc: 'https://docs.rsshub.app/...',
      genLink: ({ userId }) => `/new-platform/user/${userId}`,
      preview: '/new-platform/user/example',
    }
  ]
}
```

3. **添加参数检测** (`src/platform-detectors.ts`)
```typescript
case 'new-platform':
  return {
    userId: extractUserIdFromURL(window.location.href)
  };
```

4. **更新 vite.config.ts 匹配规则**
```typescript
match: [
  // ... 现有规则
  'https://new-platform.com/*',
]
```

## 🧪 测试指南

### 手动测试清单
- [ ] 页面加载时悬浮按钮正常显示
- [ ] 点击按钮弹出面板
- [ ] 平台自动识别正确
- [ ] 参数提取准确
- [ ] 复制功能正常工作
- [ ] Toast 提示显示
- [ ] 暗黑模式适配正常
- [ ] 移动端布局正常

### 测试环境
- Chrome + Tampermonkey
- Firefox + Violentmonkey  
- Safari + Userscripts
- 移动端浏览器

## 💬 交流讨论

- **GitHub Issues**: 报告问题和功能请求
- **GitHub Discussions**: 一般讨论和问答
- **Pull Request**: 代码审查和技术讨论

## 📋 开发规范

### 代码风格
- 使用 TypeScript 严格模式
- 组件采用函数式写法
- CSS 使用 CSS Modules
- 统一使用 2 空格缩进
- 优先使用 `const` 和箭头函数

### 命名规范
- 组件：PascalCase (`Panel.tsx`)
- 文件：kebab-case (`platform-detectors.ts`)
- 变量/函数：camelCase (`detectParams`)
- 常量：UPPER_SNAKE_CASE (`DEFAULT_TIMEOUT`)
- CSS 类：camelCase (`.ruleItem`)

### 性能要求
- 脚本加载时间 < 100ms
- 面板打开响应 < 200ms
- 内存占用 < 10MB
- 不影响原网页性能

感谢你的贡献！🎉