var default_editUrl = `https://github.com/HondryTravis/Blog/tree/master/`
const showUpdateInfo = true
module.exports = {
  title: 'TRAVIS',
  tagline: '只要开始，虽晚不迟',
  url: 'https://hondrytravis.github.io/',
  baseUrl: '/',
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans']
  },
  onBrokenLinks: 'throw',
  favicon: 'images/default/favicon.ico',
  organizationName: 'HondryTravis', // Usually your GitHub org/user name.
  projectName: 'hondrytravis.github.io', // Usually your repo name.
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'algorithm',
        path: './packages/algorithm',
        routeBasePath: 'algorithm',
        sidebarPath: require.resolve('./packages/config/sidebars_for_algorithm.js'),
        editUrl: default_editUrl,
        showLastUpdateAuthor: showUpdateInfo,
        showLastUpdateTime: showUpdateInfo,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'open_source',
        path: './packages/open_source',
        routeBasePath: 'open_source',
        sidebarPath: require.resolve('./packages/config/sidebars_for_open_source.js'),
        editUrl: default_editUrl,
        showLastUpdateAuthor: showUpdateInfo,
        showLastUpdateTime: showUpdateInfo,
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
          path: './packages/docs',
          editUrl: default_editUrl,
          sidebarPath: require.resolve('./packages/config/sidebars_for_docs.js'),
          showLastUpdateAuthor: showUpdateInfo,
          showLastUpdateTime: showUpdateInfo,
        },
        blog: {
          path: './packages/blog',
          editUrl: default_editUrl,
          postsPerPage: 1,
        },
      },
    ],
  ],
  themeConfig: {
    docsSideNavCollapsible: true,
    hideableSidebar: true,
    navbar: {
      hideOnScroll: true,
      style: 'dark',
      title: 'Better Late Than Never',
      logo: {
        alt: 'logo',
        src: 'images/default/Logo.png',
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
          href: 'https://github.com/HondryTravis',
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
              label: 'tscli',
              to: '/open_source/cli/tscli',
            },
            {
              label: 'Indexeddb',
              to: '/open_source/github/indexeddb',
            },
            {
              label: 'TinyDB',
              to: '/open_source/github/tinydb_docapi',
            },
            {
              label: 'Simple dark',
              to: '/open_source/vscode/Simple-dark',
            },
            {
              label: 'xs-doc',
              href: 'https://github.com/HondryTravis/xs-docs',
            },
            {
              label: 'x-spreadsheet',
              href: 'https://github.com/myliang/x-spreadsheet',
            }
          ],
        },
        {
          title: '联系方式',
          items: [
            {
              label: '邮箱 | 联系方式',
              to: '/docs/contact',
            },
          ]
        },
        {
          title: '友情链接',
          items: [
            {
              label: '卡拉云低代码工具',
              href: 'https://kalacloud.com',
            },
          ]
        },
      ],
      copyright: `AGPL-3.0 Licensed | Copyright © 2020-present HondryTravis, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: require('./packages/code/dark/simple-dark.js'),
      darkTheme: require('./packages/code/dark/simple-dark.js'),
      additionalLanguages: ['csharp'],
    },
    colorMode:{
      defaultMode: 'light',
      disableSwitch: false
    }
  },
};
