// @ts-check
import React from 'react';
import { Link } from 'gatsby-plugin-react-i18next';
import { pokeEl, pokeImgWrap, pokeImg, pokeH2, pokeP } from './Pokemon.module.css';
import { colors } from './colors';

const Pokemon = ({ info }) => {

  if ( !info )
    return;

  const {
    color  = '',
    image  = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png',
    name   = '',
    number = 0,
  } = info;

  return (
    <Link 
      className={ pokeEl }
      to={`/pokemon/${ number }`}
      style={{
        backgroundColor: colors[color],
      }}
      data-testid="pnkm-wrap"
    >
      <div className={ pokeImgWrap }>
        <img
          className={ pokeImg }
          src={ image }
          alt={ name }
          width="96"
          height="96"
          loading="lazy"
          data-testid="pkmn-img"
        />
      </div>
      <h2 data-testid="pkmn-tit" className={ pokeH2 }>{ name }</h2>
      <p data-testid="pkmn-num" className={ pokeP }>{ number.toString().padStart( 3, '0' ) }</p>
    </Link>
  );

};

export default Pokemon;