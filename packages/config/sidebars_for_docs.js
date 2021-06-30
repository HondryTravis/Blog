const font_end = [
  {
    type: 'category',
    label: 'Typescript',
    items: [
      'typescript/ts_utility_types',
      'typescript/ts_operator',
      'typescript/implement_list',
      'typescript/javascript_high',
      'typescript/recursive_optimization',
      'typescript/javascript_workflow',
      'typescript/u_dont_know_js',
      'typescript/js_packing_unboxing'
    ]
  },
  {
    type: 'category',
    label: 'Wasm',
    items: [
      'wasm/wasm',
    ]
  },
  {
    type: 'category',
    label: 'HTML | CSS',
    items: [
      'css/css_io',
      'css/css_split',
      'css/css_houdini',
      'css/css_workflow',
      'css/css_matrix',
      'css/css_plugin'
    ]
  },
  {
    type: 'category',
    label: 'Webpack',
    items: [
      'tools/webpack_until_v4',
    ]
  },
  {
    type: 'category',
    label: 'Node',
    items: [
      'node/node',
      'node/pm2',
      'node/node_optimization'
    ]
  },
  {
    type: 'category',
    label: '前端工程化',
    items: [
      'ci_with_cd/ci_cd',
      'ci_with_cd/sonar',
      'ci_with_cd/jenkins',
      'ci_with_cd/workspace',
      'ci_with_cd/husky'
    ]
  },
  {
    type: 'category',
    label: '性能优化',
    items: [
      'performance/performance',
      'performance/browser_rendering_process',
      'performance/performance_base',
      'performance/test_network_speed',
      'performance/rendering_process',
      'performance/page_performance_index'
    ]
  },
]

const framework = [
  {
    type: 'category',
    label: 'Framework',
    items: [
      'framework/vue/vue_1',
      'framework/redux/redux_start'
    ]
  },
]

const back_end = [
  // network
  {
    type: 'category',
    label: 'HTTP',
    items: [
      'http/http_1',
      'http/http_2',
      'http/tcp',
      'http/cdn'
    ]
  },
  // nginx
  {
    type: 'category',
    label: 'Nginx',
    items: [
      'nginx/nginx'
    ]
  },
  // java
  {
    type: 'category',
    label: 'Java',
    items: [
      'java/java',
    ]
  },
  // python
  {
    type: 'category',
    label: 'Python',
    items: [
      'python/python爬虫'
    ]
  },
  // 数据库
  {
    type: 'category',
    label: '数据库',
    items: [
      'mysql/mysql'
    ]
  },
]
const other = [
  {
    type: 'category',
    label: '其他常用工具',
    items: [
      'mac/command_line',
      'mac/homebrew',
      'mac/nvm',
      'mac/nrm'
    ]
  }
]
const thinking = [
  {
    type: 'category',
    label: '编程思想',
    items: [
      'thinking/aop',
      'thinking/functional_programming',
      'thinking/design_patterns',
      'thinking/ioc'
    ]
  },
]
const os = [
  // os
  {
    type: 'category',
    label: 'OS',
    items: [
      'os/thread'
    ]
  },
  // linux
  {
    type: 'category',
    label: 'Linux',
    items: [
      'linux/linux',
      'linux/linux_deploy',
      'linux/linux_centos',
    ]
  },
]
module.exports = {
  docs: [
    'summary',
    ...font_end,
    ...framework,
    ...os,
    ...thinking,
    ...back_end,
    ...other,
  ],

};


