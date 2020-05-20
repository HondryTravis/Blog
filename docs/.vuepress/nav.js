// blog
const blog  = { 
  text: '博客', 
  link: '/blog/' 
}

// 算法
const algorithm = { 
  text: '算法', 
  link: '/algorithm/' 
}

// more
const more = {
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
}


module.exports = [
  blog,
  algorithm,
  more
]