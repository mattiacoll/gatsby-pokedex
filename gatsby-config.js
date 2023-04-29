// @ts-check
const siteUrl = process.env.SITE_URL ?? 'http://localhost:8000/', // TODO: change with .env
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
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/locales`,
        name: 'locale',
      }
    },
    {
      resolve: 'gatsby-plugin-react-i18next',
      options: {
        fallbackLanguage: 'en',
        defaultLanguage:  languages[0],
        languages,
        redirect:         false,
        siteUrl,
      }
    },
    {
      resolve: 'pokemon-api',
      options: {
        languages,
        pokemons: 151,
      },
    },
  ]
};