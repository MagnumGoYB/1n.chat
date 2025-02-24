module.exports = {
  disableEmoji: false,
  format: '{emoji}{type}{scope}: {subject}',
  list: [
    'feat',
    'fix',
    'docs',
    'ci',
    'style',
    'refactor',
    'release',
    'perf',
    'test',
  ],
  maxMessageLength: 64,
  minMessageLength: 3,
  questions: ['type', 'scope', 'subject', 'body'],
  types: {
    ci: {
      description: 'CI 相关的更改',
      emoji: '👷',
      value: 'ci',
    },
    docs: {
      description: '仅文档更改',
      emoji: '📝',
      value: 'docs',
    },
    feat: {
      description: '新功能',
      emoji: '✨',
      value: 'feat',
    },
    fix: {
      description: '错误修复',
      emoji: '🐛',
      value: 'fix',
    },
    perf: {
      description: '提高性能的代码更改',
      emoji: '⚡️',
      value: 'perf',
    },
    refactor: {
      description: '既不是错误修复也不是添加功能的代码更改',
      emoji: '♻️',
      value: 'refactor',
    },
    release: {
      description: '创建发布提交',
      emoji: '🔖',
      value: 'release',
    },
    style: {
      description: '标记、空白、格式、缺少分号等...',
      emoji: '💄',
      value: 'style',
    },
    test: {
      description: '添加失败的测试',
      emoji: '🧪',
      value: 'test',
    },
    messages: {
      type: '选择您要提交的更改类型:',
      customScope: '选择此组件影响的范围:',
      subject: '简短描述更改内容:\n',
      body: '提供更改的详细描述:\n ',
      confirmCommit: '此提交影响的包:\n',
    },
  },
}
