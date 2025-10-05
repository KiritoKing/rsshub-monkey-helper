---
mode: agent
---

<!--
title: Tampermonkey 油猴脚本开发最佳实践指南
description: 基于官方文档和社区最佳实践的油猴脚本开发规范指导
-->

# 油猴脚本开发最佳实践指南

## 📋 任务目标

基于 Tampermonkey、Violentmonkey、Greasemonkey 官方文档和社区最佳实践，为开发者提供全面的油猴脚本开发规范指导，确保脚本的安全性、兼容性、可维护性和用户体验。

## 🎯 核心要求

### 1. 元数据规范 (Metadata Block)

#### 必填字段

```javascript
// ==UserScript==
// @name         脚本名称 (清晰描述功能)
// @namespace    唯一命名空间 (通常使用域名或GitHub)
// @version      版本号 (遵循语义化版本)
// @description  功能描述 (简洁明了)
// @author       作者信息
// @match        目标网站匹配规则
// @grant        所需权限列表
// ==/UserScript==
```

#### 推荐字段

```javascript
// @icon          脚本图标 (64x64 PNG)
// @homepage      项目主页
// @supportURL    支持页面/问题反馈
// @updateURL     更新检查URL
// @downloadURL   下载地址
// @license       开源许可证 (推荐 MIT/GPL-3.0)
// @run-at        运行时机 (document-end/document-start/document-idle)
// @noframes      是否在iframe中运行
// @compatible    兼容性声明
// @require       外部依赖库
// @resource      外部资源文件
```

#### 国际化支持

```javascript
// @name:en       English Name
// @name:zh-CN    中文名称
// @name:ja       日本語名前
// @description:en English Description
// @description:zh-CN 中文描述
```

### 2. 安全最佳实践

#### 权限最小化原则

```javascript
// ❌ 避免过度授权
// @grant        *

// ✅ 只申请必需权限
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
```

#### 网络请求安全

```javascript
// @connect      example.com        // 明确声明允许连接的域名
// @connect      self               // 当前域名
// @connect      localhost          // 本地连接
// @connect      *                  // 仅在必要时使用通配符
```

#### 内容安全策略 (CSP) 遵循

```javascript
// 使用 GM_addElement 替代直接 DOM 操作
GM_addElement('script', {
  src: 'https://cdn.example.com/lib.js',
  type: 'text/javascript',
});

// 使用 GM_addStyle 添加样式
GM_addStyle(`
  .my-custom-class {
    color: #ff0000 !important;
  }
`);
```

### 3. 代码质量标准

#### 错误处理

```javascript
try {
  // 主要功能代码
  initUserScript();
} catch (error) {
  GM_log('脚本初始化失败: ' + error.message);
  console.error('UserScript Error:', error);
}

// 异步操作错误处理
async function fetchData(url) {
  try {
    const response = await GM.xmlHttpRequest({ url });
    return response.responseText;
  } catch (error) {
    console.error('请求失败:', error);
    throw error;
  }
}
```

#### 性能优化

```javascript
// 使用防抖避免频繁执行
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 观察器模式监听DOM变化
const observer = new MutationObserver(
  debounce(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        // 处理DOM变化
      }
    });
  }, 300)
);

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
```

#### 兼容性考虑

```javascript
// 检测用户脚本管理器
function getUserScriptManager() {
  if (typeof GM_info !== 'undefined') {
    return GM_info.scriptHandler;
  }
  return 'unknown';
}

// 使用 Promise 或回调函数兼容
function setValue(key, value) {
  if (typeof GM.setValue === 'function') {
    return GM.setValue(key, value); // Promise-based
  } else if (typeof GM_setValue === 'function') {
    return GM_setValue(key, value); // Callback-based
  }
}
```

### 4. 用户体验优化

#### 界面注入最佳实践

```javascript
// 等待DOM加载完成
function waitForElement(selector, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const element = document.querySelector(selector);
    if (element) {
      resolve(element);
      return;
    }

    const observer = new MutationObserver(mutations => {
      const element = document.querySelector(selector);
      if (element) {
        observer.disconnect();
        resolve(element);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    setTimeout(() => {
      observer.disconnect();
      reject(new Error(`Element ${selector} not found within ${timeout}ms`));
    }, timeout);
  });
}

// 使用示例
waitForElement('.target-class').then(element => {
  // 在找到元素后执行操作
  injectCustomUI(element);
});
```

#### 设置界面实现

```javascript
// 创建设置面板
function createSettingsPanel() {
  const panel = GM_addElement(document.body, 'div', {
    id: 'userscript-settings',
    style: `
      position: fixed;
      top: 20px;
      right: 20px;
      width: 300px;
      background: white;
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      z-index: 10000;
      font-family: Arial, sans-serif;
    `,
  });

  // 添加设置选项
  const settings = [
    { key: 'enabled', label: '启用脚本', type: 'checkbox' },
    { key: 'theme', label: '主题', type: 'select', options: ['light', 'dark'] },
  ];

  settings.forEach(setting => {
    const container = GM_addElement(panel, 'div', {
      style: 'margin-bottom: 10px;',
    });

    GM_addElement(container, 'label', {
      textContent: setting.label,
      style: 'display: block; margin-bottom: 5px;',
    });

    if (setting.type === 'checkbox') {
      const checkbox = GM_addElement(container, 'input', {
        type: 'checkbox',
        checked: GM_getValue(setting.key, false),
      });

      checkbox.addEventListener('change', () => {
        GM_setValue(setting.key, checkbox.checked);
      });
    }
  });
}

// 添加菜单命令
GM_registerMenuCommand('设置', createSettingsPanel);
```

### 5. 版本管理和发布

#### 版本号规范

```javascript
// 遵循语义化版本 (Semantic Versioning)
// @version     1.2.3
//              ^ ^ ^
//              | | 修订号 (Bug 修复)
//              | 次版本号 (新功能，向后兼容)
//              主版本号 (重大变更，可能不兼容)

// 预发布版本示例
// @version     1.2.3-beta.1
// @version     1.2.3-alpha.2
// @version     1.2.3-rc.1
```

#### 更新机制

```javascript
// 自动更新配置
// @updateURL    https://example.com/script.meta.js
// @downloadURL  https://example.com/script.user.js

// 版本检查和提示
function checkForUpdates() {
  const currentVersion = GM_info.script.version;
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'https://api.github.com/repos/user/repo/releases/latest',
    onload: function (response) {
      const data = JSON.parse(response.responseText);
      const latestVersion = data.tag_name.replace('v', '');

      if (compareVersions(currentVersion, latestVersion) < 0) {
        GM_notification({
          text: `发现新版本 ${latestVersion}，点击更新`,
          title: '脚本更新',
          onclick: () => window.open(data.html_url),
        });
      }
    },
  });
}
```

### 6. 调试和测试

#### 调试工具

```javascript
// 开发模式检测
const isDev = GM_getValue('debug_mode', false);

function debugLog(...args) {
  if (isDev) {
    console.log('[UserScript Debug]', ...args);
  }
}

// 性能监控
function performanceWrapper(fn, name) {
  return function (...args) {
    const start = performance.now();
    const result = fn.apply(this, args);
    const end = performance.now();
    debugLog(`${name} 执行时间: ${end - start}ms`);
    return result;
  };
}
```

#### 测试检查清单

- [ ] 在不同浏览器中测试 (Chrome, Firefox, Safari, Edge)
- [ ] 验证不同用户脚本管理器兼容性 (Tampermonkey, Violentmonkey, Greasemonkey)
- [ ] 测试网络连接失败情况
- [ ] 验证在移动设备上的表现
- [ ] 检查内存泄漏和性能影响
- [ ] 测试与其他脚本的兼容性
- [ ] 验证权限最小化原则

### 7. 文档和社区

#### README 模板

```markdown
# 脚本名称

## 功能描述

简要说明脚本的主要功能和用途

## 安装方法

1. 安装用户脚本管理器
2. 点击安装链接
3. 确认安装

## 使用说明

详细的使用步骤和注意事项

## 兼容性

- 浏览器支持: Chrome 80+, Firefox 75+, Safari 13+
- 脚本管理器: Tampermonkey, Violentmonkey

## 更新日志

详细的版本更新记录

## 许可证

开源许可证信息

## 支持

问题反馈和支持渠道
```

## ✅ 成功标准

1. **功能完整性**: 脚本能够正确实现所有预期功能
2. **安全性**: 遵循最小权限原则，无安全漏洞
3. **兼容性**: 在主流浏览器和脚本管理器中正常工作
4. **性能**: 不影响页面加载速度和用户体验
5. **可维护性**: 代码结构清晰，易于理解和修改
6. **用户友好**: 提供直观的用户界面和设置选项
7. **文档完善**: 包含详细的安装、使用和故障排除说明

## 🚫 约束条件

1. **隐私保护**: 不收集用户隐私数据
2. **广告限制**: 不插入广告或恶意代码
3. **资源占用**: 最小化内存和CPU使用
4. **网络请求**: 仅连接必要的外部服务
5. **DOM操作**: 不破坏原有页面功能
6. **许可证遵循**: 遵守相关开源许可证要求

## 📚 参考资源

- [Tampermonkey 官方文档](https://www.tampermonkey.net/documentation.php)
- [Violentmonkey API 文档](https://violentmonkey.github.io/api/)
- [Greasemonkey Wiki](https://wiki.greasespot.net/)
- [Greasy Fork 帮助文档](https://greasyfork.org/help)
- [用户脚本最佳实践](https://github.com/OpenUserJS/OpenUserJS.org/wiki)

---

_本指南基于官方文档和社区最佳实践编写，定期更新以保持与最新标准同步。_
