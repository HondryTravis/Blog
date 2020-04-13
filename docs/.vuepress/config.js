module.exports = {
  title: 'travis的开发日志',
  description: '只要开始，永远不晚',
  themeConfig: {
    repo: 'HondryTravis/HondryTravis.github.io',
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
      }
      
    ],
    sidebar:{
      '/blog/':[
        {
          title: 'nvm 常用命令',
          collapsable: false,
          children:[
            'nvm'
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