// @ts-check
const siteUrl = process.env.SITE_URL ?? 'http://localhost:8000/',
  languages   = ['en', 'it', 'fr']; // Current supported languages are found in /locales

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: 'gatsby-pokedex',
    siteUrl,
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'locale',
        path: `${__dirname}/locales`,
      },
    },
    {
      resolve: 'gatsby-plugin-react-i18next',
      options: {
        defaultLanguage:  languages[0],
        fallbackLanguage: 'en',
        languages,
        pages: [{
          languages: ['en'],
          matchPath: '/:lang?/404',
        }],
        redirect: false,
        siteUrl,
      },
    },
    {
      resolve: 'pokemon-api',
      options: {
        languages,
        pokemons: 151,
      },
    },
  ],
};