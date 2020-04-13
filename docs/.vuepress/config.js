module.exports = {
  title: 'travis的开发日志',
  description: '只要开始，永远不晚',
  themeConfig: {
    repo: 'HondryTravis/Blog',
    nav: [
      { 
        text: '博客', 
        link: '/blog/' 
      },
      {
        text: '了解更多',
        ariaLabel: '菜单',
        items: [
          {
            text: '关于我',
            items: [
              {text: '联系方式', link: '/work/'}
            ]
          },
          {
            text: '学习相关',
            items: [
              {text: '阅读', link: '/books/'}
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
    },
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '源码地址',
    lastUpdated: '更新时间',
  }
}