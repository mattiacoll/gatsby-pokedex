// @ts-check

/**
 * Fills the pokemon names to the correct locale
 *
 * @param {object} names - pokemon names
 * @param {array} siteLocales - a list of supported locales
 *
 * @returns {object}
 */
const fillNames = ( names, siteLocales ) => {

  const locales = {};

  names.forEach( ({ name, language }) => {

    if ( siteLocales.includes( language.name ) )
      locales[language.name] = name;

  });

  return locales;

};

/**
 * Fills the pokemon genus to the correct locale
 *
 * @param {object} genera - pokemon genera
 * @param {array} siteLocales - a list of supported locales
 *
 * @returns {object}
 */
const fillGenus = ( genera, siteLocales ) => {

  const locales = {};

  genera.forEach( ({ genus, language }) => {

    if ( siteLocales.includes( language.name ) )
      locales[language.name] = genus;

  });

  return locales;

};

/**
 * Fills the pokemon description to the correct locale
 *
 * @param {object} description - pokemon description
 * @param {array} siteLocales - a list of supported locales
 *
 * @returns {object}
 */
const fillDesc = ( description, siteLocales ) => {

  const locales = {};

  description.forEach( ({ flavor_text, language, version }) => {

    if ( version.name !== 'y' )
      return;

    if ( siteLocales.includes( language.name ) )
      locales[language.name] = flavor_text;

  });

  return locales;

};



export const sourceNodes = async (
  { actions, createContentDigest, createNodeId },
  pluginOptions
) => {

  const { createNode } = actions,
    pokemonListRaw     = await fetch( `https://pokeapi.co/api/v2/pokemon?limit=${pluginOptions.pokemons ?? 151 }` ),
    pokemonList        = await pokemonListRaw.json(),
    siteLocales = [ // Supported languages, we can add more if we want to
      ...pluginOptions.languages ?? [],
      'en',
      'it',
      'ja',
    ];

  for ( const pokemonID of pokemonList.results ) {

    const pokemonRaw = await fetch( `https://pokeapi.co/api/v2/pokemon-species/${pokemonID.name}` ),
      pokemon        = await pokemonRaw.json(),
      pokemonBase    = { // Base pokemon object
        number:      pokemon.id,
        name:        pokemon.name,
        genus:       '',
        description: '',
      },
      locales = { // Will hold various translations
        name:        fillNames( pokemon.names, siteLocales ),
        genus:       fillGenus( pokemon.genera, siteLocales ),
        description: fillDesc( pokemon.flavor_text_entries, siteLocales ),
      };

     // Fill current pokemon locales
    siteLocales.forEach( ( lang ) => {

      const pokemonCurrent = {
        ...pokemonBase,
        name:        locales.name[lang] ?? pokemon.name,
        genus:       locales.genus[lang] ?? '',
        description: locales.description[lang] ?? '',
        color:       pokemon.color.name,
        image:       `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
        locale:      lang,
      }

      createNode({
        ...pokemonCurrent,
        id: createNodeId( `${pokemon.id}-${lang}` ),
        internal: {
          type:          'Pokemon',
          content:       JSON.stringify( pokemonCurrent ),
          contentDigest: createContentDigest( pokemonCurrent ),
        },
      });

    });

  }
};