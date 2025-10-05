# RSSHub 订阅链接快速生成与复制油猴脚本

## 需求概述

- 在支持的页面边缘显示RSSHub Logo悬浮窗，点击后展开，展示当前页面可用的RSSHub订阅规则及预览链接
- 支持一键复制RSS链接，点击规则标题跳转到RSSHub文档
- 适配Bilibili、YouTube、X（Twitter）三大平台，后续支持更多平台

## 支持平台及规则

### 1. Bilibili

- UP主投稿：/bilibili/user/video/:uid
- UP主所有视频：/bilibili/user/video-all/:uid
- 排行榜：/bilibili/ranking/:rid_index?
- 周推：/bilibili/weekly

### 2. YouTube

- 频道（@handle）：/youtube/user/:username（如@JFlaMusic）
- 播放列表：/youtube/playlist/:id

### 3. X（Twitter）

- 用户推文：/x/user/:id
- 通用规则：/x/:routeParams

## UI原型草图（文字描述）

- 页面右下角悬浮RSSHub Logo按钮，悬浮时有阴影和提示
- 点击后展开侧边栏，展示：
  - 平台icon + 规则名（可跳转文档）
  - 规则描述
  - 预览生成的RSS链接（可点击复制，复制后有toast提示）
- 支持多平台切换，自动识别当前页面可用规则

## 技术选型与依赖

- SolidJS + Vite + vite-plugin-monkey
- 样式：CSS Modules
- 图标：simple-icons（品牌icon）、自定义SVG（RSSHub Logo）
- 复制功能：clipboard.js

## Roadmap

1. Bilibili（优先）
2. YouTube
3. X（Twitter）
4. 其他平台（知乎、微博、抖音、微信公众号、GitHub、豆瓣、贴吧等，后续补充）

## 后续开发步骤

1. UI原型设计与素材收集
2. 编写平台规则解析与链接生成逻辑
3. SolidJS组件开发（悬浮窗、侧边栏、规则列表、复制按钮、toast等）
4. 脚本注入与页面适配
5. 交互优化与测试
6. 支持更多平台与规则
7. 文档与发布

---

> 本计划将根据开发进度持续完善。
