export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // Bug 修复
        'docs', // 文档更新
        'style', // 代码格式调整
        'refactor', // 重构
        'perf', // 性能优化
        'test', // 测试相关
        'build', // 构建系统或外部依赖变更
        'ci', // CI 配置文件和脚本变更
        'chore', // 其他不修改 src 或 test 文件的变更
        'revert', // 回滚提交
      ],
    ],
    'subject-max-length': [2, 'always', 72],
    'subject-case': [0], // 不限制 subject 大小写
  },
};
