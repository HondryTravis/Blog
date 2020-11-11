var default_editUrl = `https://github.com/HondryTravis/Blog/tree/master/`
module.exports = {
  title: 'TRAVIS',
  tagline: '只要开始，虽晚不迟',
  url: 'https://hondrytravis.github.io/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'images/default/favicon.ico',
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'algorithm',
        path: 'algorithm',
        routeBasePath: 'algorithm',
        sidebarPath: require.resolve('./config/sidebars_for_algorithm.js'),
        editUrl: default_editUrl,
        showLastUpdateAuthor: false,
        showLastUpdateTime: false,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'open_source',
        path: 'open_source',
        routeBasePath: 'open_source',
        sidebarPath: require.resolve('./config/sidebars_for_open_source.js'),
        editUrl: default_editUrl,
        showLastUpdateAuthor: false,
        showLastUpdateTime: false,
      },
    ]
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        docs: {
          path: 'docs',
          editUrl: default_editUrl,
          sidebarPath: require.resolve('./config/sidebars_for_docs.js'),
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
        },
        blog: {
          path: 'blog',
          editUrl: default_editUrl,
          postsPerPage: 1,
        },
      },
    ],
  ],
  themeConfig: {
    docsSideNavCollapsible: true,
    hideableSidebar: true,
    hideOnScroll: true,
    navbar: {
      title: 'Better late than never',
      logo: {
        alt: 'logo',
        src: 'images/default/logo.png',
      },
      items: [
        {
          to: 'docs',
          label: '博客',
          position: 'left',
        },
        {
          to: '/algorithm/',
          label: '算法',
          position: 'left',
          activeBaseRegex: '/algorithm/',
        },
        {
          to: '/open_source/',
          label: ' 开源贡献',
          position: 'left',
          activeBaseRegex: '/open_source/',
        },
        {
          to: 'blog',
          label: '阅读',
          position: 'left',
        },
        {
          href: 'https://hondrytravis.github.io/',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '快速了解',
          items: [
            {
              label: '如何监控页面性能指标',
              to: '/docs/performance/page_performance_index',
            },
            {
              label: '设计模式',
              to: '/docs/thinking/design_patterns',
            },
            {
              label: '函数式编程',
              to: '/docs/thinking/functional_programming',
            }
          ],
        },
        {
          title: '学习',
          items: [
            {
              label: '算法',
              to: '/algorithm/',
            }
          ],
        },
        {
          title: '开源贡献',
          items: [
            {
              label: 'tscli 脚手架',
              to: '/open_source/cli/tscli',
            },
            {
              label: 'Indexeddb 前端中的数据库',
              to: '/open_source/github/indexeddb',
            },
            {
              label: 'TinyDB 文档',
              to: '/open_source/github/tinydb_docapi',
            },
            {
              label: 'Simple dark 主题',
              to: '/open_source/vscode/Simple-dark',
            },
            {
              label: 'xs-doc 开源 excel 表格文档',
              href: 'https://github.com/HondryTravis/xs-docs',
            },
            {
              label: 'x-spreadsheet 开源表格',
              href: 'https://github.com/myliang/x-spreadsheet',
            }
          ],
        },
        {
          title: '联系方式',
          items: [
            {
              label: '邮箱 | 社交方式',
              to: '/docs/contact',
            },
          ]
        },
      ],
      copyright: `MIT Licensed | Copyright © 2020-present HondryTravis, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: require('./code/dark/simple-dark'),
      darkTheme: require('./code/dark/simple-dark'),
    },
  },
};
