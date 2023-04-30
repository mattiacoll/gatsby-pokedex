// @ts-check
import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import PokemonList from '../components/PokemonList/PokemonList';
import Layout, { LayoutHead } from '../components/Layout';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { homeH1, homeSearch, homeTop } from './index.module.css';


const IndexPage = ({ data }) => {

  const [ search, updateSearch ] = useState( '' );

  // Loading search query from url
  useEffect( () => {

    const currSearch = new URLSearchParams( window.location.search );

    if ( currSearch.has( 's' ) )
      updateSearch( currSearch.get( 's' ) );

  }, []);


  /**
   * Search input events
   */
  const searchInpt = ( evt ) => {

    const { value } = evt.target;

    updateSearch( value );

    // Updates url to reflect search query
    const url = new URL( window.location.href );
    url.searchParams.set( 's', value );

    if ( window.history.pushState )
      window.history.pushState( '', '', url.href );

  };


  const { t } = useTranslation();

  return (
    <Layout>

      <div className={ homeTop }>

        <h1 className={ homeH1 }>Pokédex</h1>

        <p className={ homeSearch }>
          { t( 'search.title' ) }
        </p>

        <form action="/" method="GET">
          <label htmlFor="search">
            { t( 'search.label' ) }
          </label>
          <input
            id="search"
            type="search"
            name="s"
            placeholder={ t( 'search.label' ) }
            value={ search }
            onInput={ searchInpt }
          />
        </form>

      </div>

      <PokemonList
        list={ data.allPokemon.nodes }
        filter={ search }
      />

    </Layout>
  );
};


export const query = graphql`
  query ($language: String!) {
    allPokemon(filter: {locale: {eq: $language}}) {
      nodes {
        name
        number
        image
        color
      }
    }
    locales: allLocale {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;

export const Head = () => {
  return (
    <>
      <title>Pokédex</title>
      <LayoutHead/>
    </>
  );
};

export default IndexPage;