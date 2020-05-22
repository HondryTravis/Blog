// blog
const blog = [
  {
    title: 'python',
    collapsable: false,
    children: [
      'python/python爬虫'
    ]
  },
  {
    title: 'nginx',
    collapsable: false,
    children: [
      'nginx/nginx'
    ]
  },
  {
    title: '数据库',
    collapsable: false,
    children: [
      'mysql/mysql'
    ]
  },
  {
    title: '常用工具',
    collapsable: false,
    children: [
      'mac/command_line',
      'mac/homebrew',
      'mac/nvm',
      'node/nrm'
    ]
  }
]

// 算法
const algorithm = [
  {
    title: '数组',
    collapsable: false,
    children: [
      'array/count',
      'array/bisection_method',
      'array/find_min_number'
    ]
  },
  {
    title: '字符串',
    collapsable: false,
    children: [
      'string/slide_window'
    ]
  },
  {
    title: '栈、队列、链表',
    collapsable: false,
    children: [
      'sort/queue',
      'sort/linked_list',
      'linked_list/find_key'
    ]
  },
  {
    title: '趣味算法',
    collapsable: false,
    children: [
      'other/cards',
      'other/range_of_motion'
    ]
  },
]

// 开源相关
const open_source = [
  {
    title: 'TinyDB',
    collapsable: false,
    children: [
      'github/indexeddb',
      'github/tinydb_docapi'
    ]
  },
  {
    title: 'Simple-dark',
    collapsable: false,
    children: [
      'vscode/Simple-dark'
    ]
  },
  {
    title: 'tscli',
    collapsable: false,
    children: [
      'cli/tscli'
    ]
  }
]

module.exports = {
  '/blog/': blog,
  '/algorithm/': algorithm,
  '/open_source/': open_source
}