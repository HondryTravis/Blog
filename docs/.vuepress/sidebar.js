const front_end = [
  {
    title: 'TypeScript | js',
    collapsable: true,
    children: [
      'typescript/recursive_optimization',
      'typescript/implement_list',
      'typescript/javascript_high'
    ]
  },
  {
    title: 'HTML | CSS',
    collapsable: true,
    children: [
      'css/css_io',
      'css/css_split',
      'css/css_houdini',
      'css/css_workflow',
      'css/css_matrix',
      'css/css_plugin'
    ]
  },
  {
    title: 'Node',
    collapsable: true,
    children: [
      'node/node',
      'node/pm2',
      'node/node_optimization'
    ]
  },

]

const back_end = [
  {
    title: 'Python',
    collapsable: true,
    children: [
      'python/python爬虫'
    ]
  },
  {
    title: 'Java',
    collapsable: true,
    children: [
      'java/java'
    ]
  },
  {
    title: '数据库',
    collapsable: true,
    children: [
      'mysql/mysql'
    ]
  },
]
const network = [
  {
    title: 'HTTP',
    collapsable: true,
    children: [
      'http/http_1',
      'http/http_2',
      'http/tcp',
      'http/cdn'
    ]
  },
  {
    title: 'Nginx',
    collapsable: true,
    children: [
      'nginx/nginx'
    ]
  },
]
const framework = [
  {
    title: 'Framework',
    collapsable: true,
    children: [
      'framework/vue/vue_1.md'
    ]
  },
]

const os = [
  {
    title: 'OS',
    collapsable: true,
    children: [
      'os/thread'
    ]
  },
  {
    title: 'Linux',
    collapsable: true,
    children: [
      'linux/linux',
      'linux/linux_deploy',
      'linux/linux_centos',
    ]
  },
]

const performance = [
  {
    title: '性能初探',
    collapsable: true,
    children: [
      'performance/performance',
      'performance/browser_rendering_process',
      'performance/performance_base',
      'performance/test_network_speed',
      'performance/rendering_process',
      'performance/page_performance_index'
    ]
  },
]

const optimization = [
  {
    title: '优化相关',
    collapsable: true,
    children: [
      'optimization/webpack_until_v4',
    ]
  },
]

const thinking = [
  {
    title: '编程思想',
    collapsable: true,
    children: [
      'thinking/aop',
      'thinking/functional_programming',
      'thinking/design_patterns'
    ]
  },
]

const ci_cd = [
  {
    title: '项目工程化',
    collapsable: true,
    children: [
      'engineering/ci_cd',
      'engineering/sonar',
      'engineering/jenkins',
    ]
  },
]

const other = [
  {
    title: '常用工具',
    collapsable: true,
    children: [
      'mac/command_line',
      'mac/homebrew',
      'mac/nvm',
      'node/nrm'
    ]
  }
]

// blog
const blog = [
  ...front_end,
  ...framework,
  ...performance,
  ...optimization,
  ...ci_cd,
  ...thinking,
  ...network,
  ...back_end,
  ...os,
  ...other
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