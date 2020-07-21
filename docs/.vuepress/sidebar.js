// blog
const blog = [
  {
    title: 'TypeScript',
    collapsable: false,
    children: [
      'typescript/recursive_optimization',
      'typescript/functional_programming.md'
    ]
  },
  {
    title: 'Node',
    collapsable: false,
    children: [
      'node/node',
      'node/pm2'
    ]
  },
  {
    title: 'HTTP',
    collapsable: false,
    children: [
      'http/http_1',
      'http/http_2'
    ]
  },
  {
    title: 'Linux',
    collapsable: false,
    children: [
      'linux/linux',
      'linux/linux_deploy',
      'linux/linux_centos',
    ]
  },
  {
    title: 'OS',
    collapsable: false,
    children: [
      'os/thread'
    ]
  },
  {
    title: 'Python',
    collapsable: false,
    children: [
      'python/python爬虫'
    ]
  },
  {
    title: 'Java',
    collapsable: false,
    children: [
      'java/java'
    ]
  },
  {
    title: 'Nginx',
    collapsable: false,
    children: [
      'nginx/nginx'
    ]
  },
  {
    title: '项目工程化',
    collapsable: false,
    children: [
      'engineering/ci_cd',
      'engineering/sonar',
      'engineering/jenkins',
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
    title: '开源贡献',
    collapsable: false,
    children: [
      '',
    ]
  },
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