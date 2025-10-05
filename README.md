# RSSHub Monkey Helper

> 快速生成并复制 RSSHub 订阅链接，支持 Bilibili、YouTube、X 等主流平台的浏览器用户脚本

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build](https://github.com/chlorinec/rsshub-monkey-helper/actions/workflows/build.yml/badge.svg)](https://github.com/chlorinec/rsshub-monkey-helper/actions/workflows/build.yml)
[![Release](https://img.shields.io/github/v/release/chlorinec/rsshub-monkey-helper)](https://github.com/chlorinec/rsshub-monkey-helper/releases/latest)

## ✨ 功能特点

- 🚀 **一键复制**：自动检测当前页面并生成对应的 RSSHub 订阅链接
- 🎯 **智能识别**：支持自动识别 Bilibili、YouTube、X (Twitter) 等平台
- 🎨 **现代界面**：基于 SolidJS 构建的响应式用户界面
- 🌙 **暗黑模式**：自动适配系统暗黑模式
- 📱 **移动友好**：支持移动���浏览器使用

## 🎪 支持平台

### Bilibili
- UP主投稿
- UP主所有视频  
- 排行榜
- 每周推荐

### YouTube
- 频道订阅（@handle）
- 播放列表

### X (Twitter)
- 用户推文
- 自定义参数

*更多平台正在添加中...*

## 🚀 安装使用

### 方式一：从 Release 安装（推荐）
1. 安装用户脚本管理器：[Tampermonkey](https://tampermonkey.net/) 或 [Violentmonkey](https://violentmonkey.github.io/)
2. 点击安装：[📦 安装 RSSHub Monkey Helper](https://github.com/chlorinec/rsshub-monkey-helper/releases/latest/download/rsshub-monkey-helper.user.js)

### 方式二：从源码构建
```bash
# 克隆仓库
git clone https://github.com/chlorinec/rsshub-monkey-helper.git
cd rsshub-monkey-helper

# 安装依赖
bun install

# 构建
bun run build

# 安装 dist/rsshub-monkey-helper.user.js 到用户脚本管理器
```

## 📖 使用说明

1. 访问支持的平台（如 bilibili.com、youtube.com）
2. 页面右下角会出现 RSSHub 图标按钮
3. 点击按钮打开订阅面板
4. 选择需要的订阅类型，一键复制链接
5. 将链接添加到你的 RSS 阅读器

## 🛠️ 开发指南

### 技术栈
- **框架**：SolidJS - 高性能响应式 UI 框架
- **构建**：Vite + vite-plugin-monkey - 现代化构建工具
- **语言**：TypeScript - 类型安全
- **样式**：CSS Modules - 组件化样式

### 本地开发
```bash
# 开发模式（热重载）
bun dev

# 构建生产版本
bun build

# 预览构建结果
bun preview
```

### 项目结构
```
src/
├── components/          # UI 组件
│   ├── Panel.tsx       # 主面板组件
│   └── RuleItem.tsx    # 规则项组件
├── icons/              # SVG 图标
├── rsshub-rules.ts     # 平台规则配置
├── platform-detectors.ts # 平台检测逻辑
├── App.tsx            # 主应用组件
└── index.tsx          # 入口文件
```

### 添加新平台支持

1. 在 `src/rsshub-rules.ts` 中添加平台配置：
```typescript
{
  id: 'new-platform',
  name: '新平台',
  icon: newPlatformIcon,
  rules: [
    {
      id: 'rule-id',
      name: '规则名称',
      desc: '规则描述',
      doc: 'https://docs.rsshub.app/...',
      genLink: ({ param }) => `/new-platform/${param}`,
      preview: '/new-platform/example',
    }
  ]
}
```

2. 在 `src/platform-detectors.ts` 中添加检测逻辑：
```typescript
export function detectParams(platformId: Platform): Record<string, string> {
  switch (platformId) {
    case 'new-platform':
      // 从当前页面 URL 提取参数
      return { param: extractFromURL() };
    // ...
  }
}
```

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### 提交 Issue
- 🐛 Bug 报告
- ✨ 功能请求  
- 📝 文档改进
- ❓ 使用问题

### 提交 PR
1. Fork 本仓库
2. 创建功能分支：`git checkout -b feature/new-feature`
3. 推送分支：`git push origin feature/new-feature`
4. 创建 Pull Request

## 📄 开源协议

本项目采用 [MIT](LICENSE) 协议开源。

## 🙏 致谢

- [RSSHub](https://docs.rsshub.app/) - 强大的 RSS 生成器
- [SolidJS](https://solidjs.com/) - 高性能响应式框架
- [vite-plugin-monkey](https://github.com/lisonge/vite-plugin-monkey) - 用户脚本构建工具

## 📊 项目状态

![GitHub stars](https://img.shields.io/github/stars/chlorinec/rsshub-monkey-helper?style=social)
![GitHub forks](https://img.shields.io/github/forks/chlorinec/rsshub-monkey-helper?style=social)
![GitHub issues](https://img.shields.io/github/issues/chlorinec/rsshub-monkey-helper)
![GitHub last commit](https://img.shields.io/github/last-commit/chlorinec/rsshub-monkey-helper)

---

如果觉得这个项目对你有帮助，请给它一个 ⭐ Star！
