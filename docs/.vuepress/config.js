module.exports = {
  title: '笔记(travis)',
  description: '只要开始，永远不晚',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    sidebarDepth: 2,
    smoothScroll: true,
    repo: 'HondryTravis/Blog',
    nav: [
      { 
        text: '博客', 
        link: '/blog/' 
      },
      { 
        text: '算法', 
        link: '/algorithm/' 
      },
      {
        text: '了解更多',
        ariaLabel: '菜单',
        items: [
          {
            text: '开源贡献',
            items: [
              {text: '快速浏览', link: '/open_source/'}
            ]
          },
          {
            text: '学习相关',
            items: [
              {text: '阅读', link: '/books/'}
            ]
          },
          {
            text: '关于我',
            items: [
              {text: '联系方式', link: '/work/'}
            ]
          }
        ]
      },

      
    ],
    sidebar:{
      '/blog/':[
        {
          title: 'python 安装以及使用',
          collapsable: false,
          children:[
            'python爬虫'
          ]
        },
        {
          title: 'nginx 安装以及使用',
          collapsable: false,
          children:[
            'nginx'
          ]
        },
        {
          title: '数据库知识',
          collapsable: false,
          children:[
            'mysql'
          ]
        },
        {
          title: '常用工具，命令行必备',
          collapsable: false,
          children:[
            'nvm',
            'nrm',
            'mac',
            'brew'
          ]
        }
      ],
      '/algorithm/':[
        {
          title: '数组',
          collapsable: false,
          children:[
            'array_count',
            'array_bisection_method'
          ]
        },
        {
          title: '趣味算法',
          collapsable: false,
          children:[
            'other_cards'
          ]
        },
      ],
      '/open_source/':[
        {
          title: 'TinyDB',
          collapsable: false,
          children:[
            'indexeddb',
            'tinydb_docapi'
          ]
        },
        {
          title: 'Simple-dark',
          collapsable: false,
          children:[
            'Simple-dark'
          ]
        },
        {
          title: 'tscli',
          collapsable: false,
          children:[
            'tscli'
          ]
        }
      ],
    },
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '在 Github 上编辑',
    lastUpdated: '更新时间',
  }
}