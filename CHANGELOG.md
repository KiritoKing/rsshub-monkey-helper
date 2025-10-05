## [1.0.0] - 2025-01-06

### 🎉 首次发布

#### ✨ 新增功能

- 🚀 支持一键复制 RSSHub 订阅链接
- 🎯 自动识别当前访问的平台
- 🎨 基于 SolidJS 的现代化用户界面
- 🌙 自动适配系统暗黑模式
- 📱 移动端友好的响应式设计

#### 🎪 支持平台

- **Bilibili**
  - UP主投稿订阅
  - UP主所有视频
  - 分区排行榜
  - 每周热门推荐
- **YouTube**
  - 频道订阅（支持 @handle 格式）
  - 播放列表订阅
- **X (Twitter)**
  - 用户推文订阅
  - 自定义参数支持

#### 🛠️ 技术特性

- TypeScript 全量类型支持
- CSS Modules 组件化样式
- Vite + vite-plugin-monkey 现代构建
- 自动化 GitHub Actions 发布流程
- 完整的错误处理和用户反馈

#### 📦 发布内容

- `rsshub-monkey-helper.user.js` - 完整用户脚本
- `rsshub-monkey-helper.meta.js` - 元数据文件（用于更新检测）

---

### 📋 发布说明格式

本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/) 规范：

- **主版本号**：不兼容的 API 修改
- **次版本号**：向下兼容的功能性新增
- **修订号**：向下兼容的问题修正

#### 变更类型标识

- `✨ Added` - 新增功能
- `🔧 Changed` - 功能变更
- `🗑️ Deprecated` - 即将移除的功能
- `🚫 Removed` - 移除的功能
- `🐛 Fixed` - 问题修复
- `🔒 Security` - 安全相关修复
