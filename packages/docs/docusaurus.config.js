/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  title: 'PageZilla',
  tagline: 'A React framework for building drag-n-drop page editors',
  url: 'https://pagezilla.ir/',
  baseUrl: '/r/',
  favicon: 'img/favicon.ico',
  organizationName: 'dadwic', // Usually your GitHub org/user name.
  projectName: 'PageZilla', // Usually your repo name.
  themeConfig: {
    algolia: {
      apiKey: 'e641d82b10af84aa818e883b1035c3b4',
      indexName: 'craft-js',
      algoliaOptions: {}, // Optional, if provided by Algolia
    },
    prism: {
      theme: require('prism-react-renderer/themes/shadesOfPurple'),
    },
    navbar: {
      hideOnScroll: false,
      title: 'PageZilla',
      links: [
        {
          to: 'docs/overview',
          label: 'Documentation',
          position: 'left',
          activeBasePath: `docs`,
          position: 'right',
        },
        { to: 'support', label: 'Support', position: 'right' },
        {
          href: 'https://github.com/dadwic/PageZilla',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Overview',
              to: 'docs/overview',
            },
            {
              label: 'Core Concepts',
              to: 'docs/concepts/nodes',
            },
            {
              label: 'Tutorial',
              to: 'docs/guides/basic-tutorial',
            },
            {
              label: 'API Reference',
              to: 'docs/api/editor-state',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Github Repository',
              href: 'https://github.com/dadwic/PageZilla',
            },
            {
              label: 'Open Collective',
              href: 'https://opencollective.com/pagezilla',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/sPpF7fX',
            },
            {
              label: 'NPM',
              href: 'https://npmjs.com/package/@pagezilla/core',
            },
          ],
        },
        {
          title: 'Find me elsewhere',
          items: [
            {
              label: 'Github',
              href: 'https://github.com/dadwic',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/prev/',
            },
            {
              label: 'Dribbble',
              href: 'https://dribbble.com/dadwic',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/dadwic',
            },
          ],
        },
      ],

      copyright: `Copyright © ${new Date().getFullYear()} Mehrdad Mehralian`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
