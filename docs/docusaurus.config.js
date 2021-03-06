const config = require('./contrib/config.js')
const fs = require('fs')

let versions = [
  'next'
]

const links = [
  {
    to: 'index',
    activeBasePath: `${config.projectSlug}/docs`,
    label: `Docs`,
    position: 'left',
  },
  {
    href: 'https://www.ory.sh/docs',
    label: 'Ecosystem',
    position: 'left',
  },
  {
    href: 'https://www.ory.sh/blog', label: 'Blog',
    position: 'left',
  },
  {
    href: 'https://community.ory.sh', label: 'Forum',
    position: 'left',
  },
  {
    href: 'https://www.ory.sh/chat', label: 'Chat',
    position: 'left',
  },
  {
    href: `https://github.com/ory/${config.projectSlug}`,
    label: 'GitHub',
    position: 'left',
  },
]

if (fs.existsSync('./versions.json')) {
  const version = require('./versions.json');
  if (version && version.length > 0) {
    links.push({
      label: version[0],
      position: 'right',
      to: 'versions'
    });
  }
}

module.exports = {
  title: config.projectName,
  tagline: config.projectTagLine,
  url: `https://www.ory.sh/`,
  baseUrl: `/${config.projectSlug}/docs/`,
  favicon: 'img/favico.png',
  organizationName: 'ory', // Usually your GitHub org/user name.
  projectName: config.projectSlug, // Usually your repo name.
  themeConfig: {
    googleAnalytics: {
      trackingID: 'UA-71865250-1',
      anonymizeIP: true,
    },
    algolia: {
      apiKey: '8463c6ece843b377565726bb4ed325b0',
      indexName: 'ory',
      // algoliaOptions: {
      //   facetFilters: ['language:LANGUAGE', 'version:VERSION'],
      // },
    },
    navbar: {
      logo: {
        alt: config.projectName,
        src: `img/logo-${config.projectSlug}.svg`,
      },
      links: links
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} ORY GmbH`,
      links: [
        {
          title: 'Company',
          items: [
            {
              label: 'Imprint',
              href: 'https://www.ory.sh/imprint',
            },
            {
              label: 'Privacy',
              href: 'https://www.ory.sh/privacy',
            },
            {
              label: 'Terms',
              href: 'https://www.ory.sh/tos',
            },
          ],
        },
      ],
    },
  },
  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        path: config.projectSlug === 'docusaurus-template' ? 'contrib/docs' : 'docs',
        sidebarPath: require.resolve('./contrib/sidebar.js'),
        editUrl:
          `https://github.com/docs/${config.projectSlug}/edit/master/docs`,
        routeBasePath: '',
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      },
    ],
    [
      "@docusaurus/plugin-content-pages",
    ],
    ["@docusaurus/plugin-google-analytics"],
    ["@docusaurus/plugin-sitemap"]
  ],
  themes: [
    [
      "@docusaurus/theme-classic",
      {
        customCss: config.projectSlug === 'docusaurus-template' ? require.resolve('./contrib/theme.css') : require.resolve('./src/css/theme.css'),
      }
    ], [
      "@docusaurus/theme-search-algolia"
    ]
  ],
};
