const path = require('path');

module.exports = {
  proxy: {
    prefix: '/query',
    url: 'https://ossn-api.swaco.io/'
  },
  siteMetadata: {
    title: 'Open Source Student Network'
  },
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    'gatsby-plugin-react-helmet',
    `gatsby-transformer-json`,
    {
      resolve: 'gatsby-source-graphql',
      options: {
        // This type will contain remote schema Query type
        typeName: 'OSSNAPI',
        // This is field under which it's accessible
        fieldName: 'ossnApi',
        // Url to query from
        url: 'https://ossn-api.swaco.io/query'
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'data',
        path: `./src/data/`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'images',
        path: path.join(__dirname, `src`, `images`)
      }
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        includePaths: [
          'node_modules/breakpoint-sass/stylesheets',
          'node_modules/chroma-sass/sass',
          'node_modules/support-for/sass',
          'node_modules/typey/stylesheets',
          'src/components',
          'src'
        ]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        // short_name: 'starter',
        start_url: '/',
        // background_color: '#663399',
        theme_color: '#f9f9fa',
        display: 'minimal-ui'
        // icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      }
    },
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.js$/,
        exclude: /(node_modules|cache|public)/,
        options: {
          emitWarning: true,
          failOnError: false
        }
      }
    }
  ]
};
