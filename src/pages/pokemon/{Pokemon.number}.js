// @ts-check
import { graphql } from 'gatsby';
import React from 'react';
import { Link, Trans } from 'gatsby-plugin-react-i18next';
import Layout, { LayoutHead } from '../../components/Layout';
import {
  pokeTop,
  pokeBack,
  pokeTit,
  pokeH1,
  pokeH2,
  pokeImgW,
  pokeImg,
  pokeP,
} from './PokemonPage.module.css';
import { colors } from '../../components/colors';
import { useTranslation } from 'gatsby-plugin-react-i18next';

const PokemonPage = ({ data }) => {

  const {
    name,
    image,
    number,
    description,
    genus,
    color,
  } = data.pokemon;

  const { t } = useTranslation();

  return (
    <Layout>

      <div className={ pokeTop }>
        <Link
          to="/"
          className={ pokeBack }
          aria-label={ t( 'pokemon.home' ) }
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
            <path d="M480 896 160 576l320-320 42 42-248 248h526v60H274l248 248-42 42Z"/>
          </svg>
        </Link>

        <div className={ pokeTit }>
          <h1 className={ pokeH1 }>{ name }</h1>
          <h2 className={ pokeH2 }>{ number.toString().padStart( 3, '0' ) }</h2>
        </div>
      </div>

      <div className={ pokeImgW } style={{
        backgroundColor: colors[color],
      }}>
        <img 
          className={ pokeImg }
          src={ image }
          alt={ name }
          width="96"
          height="96"
          loading="eager"
          fetchpriority="high"
        />
      </div>

      <div>
        <p className={ pokeP }>
          <strong><Trans>pokemon.desc</Trans></strong><br/>
          <em>{ description }</em>
        </p>
        <p className={ pokeP }>
          <strong><Trans>pokemon.genus</Trans></strong><br/>
          { genus }
        </p>
      </div>

    </Layout>
  )
}

export const query = graphql`
  query ($number: Int, $language: String!) {
    pokemon(locale: {eq: $language}, number: {eq: $number}) {
      genus
      id
      image
      name
      number
      description
      color
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

export default PokemonPage;

export const Head = ({ data }) => {
  return (
    <>
      <title>{ data.pokemon.name } / { data.pokemon.number }</title>
      <LayoutHead/>
    </>
  )
}