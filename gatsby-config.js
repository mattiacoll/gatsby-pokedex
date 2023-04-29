// @ts-check
const siteUrl = 'http://localhost:8000/', // TODO: change with .env
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
      resolve: 'pokemon-api',
      options: {
        languages,
        pokemons: 151,
      },
    },
  ]
};