import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    solidPlugin(),
    monkey({
      entry: 'src/index.tsx',
      userscript: {
        name: {
          '': 'RSSHub 订阅助手',
          'en': 'RSSHub Subscription Helper',
          'zh-CN': 'RSSHub 订阅助手',
        },
        namespace: 'github.com/chlorinec/rsshub-monkey-helper',
        version: '1.0.0',
        description: {
          '': '快速生成并复制RSSHub订阅链接，支持Bilibili、YouTube、X等主流平台',
          'en': 'Quickly generate and copy RSSHub subscription links for Bilibili, YouTube, X, and more.',
          'zh-CN': '快速生成并复制RSSHub订阅链接，支持Bilibili、YouTube、X等主流平台',
        },
        author: 'chlorinec',
        icon: 'https://docs.rsshub.app/logo.png',
        match: [
          'https://www.bilibili.com/*',
          'https://space.bilibili.com/*',
          'https://www.youtube.com/*',
          'https://youtube.com/*',
          'https://x.com/*',
          'https://twitter.com/*',
        ],
        grant: [
          'GM_addElement',
          'GM_addStyle',
          'GM_setValue',
          'GM_getValue',
          'GM_xmlhttpRequest',
        ],
        'run-at': 'document-end',
        noframes: true,
        license: 'MIT',
        homepage: 'https://github.com/chlorinec/rsshub-monkey-helper',
        supportURL: 'https://github.com/chlorinec/rsshub-monkey-helper/issues',
        updateURL: 'https://github.com/chlorinec/rsshub-monkey-helper/releases/latest/download/rsshub-monkey-helper.meta.js',
        downloadURL: 'https://github.com/chlorinec/rsshub-monkey-helper/releases/latest/download/rsshub-monkey-helper.user.js',
      },
      server: {
        open: true,
        mountGmApi: false, // 推荐ESM方式import GM_*
      },
      build: {
        autoGrant: true,
        metaFileName: true,
      },
    }),
  ],
});
