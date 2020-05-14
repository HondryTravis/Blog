const nav = require('./nav')
const sidebar = require('./sidebar')

module.exports = {
  title: 'Better late than never',
  description: '只要开始，虽晚不迟',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    sidebarDepth: 2,
    smoothScroll: true,
    repo: 'HondryTravis/Blog',
    nav,
    sidebar,
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '在 Github 上编辑',
    lastUpdated: '更新时间',
  }
}