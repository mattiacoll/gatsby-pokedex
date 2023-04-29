// @ts-check
import React from 'react';
import { Link } from 'gatsby-plugin-react-i18next';
import { pokeEl, pokeImgWrap, pokeImg, pokeH2, pokeP } from './Pokemon.module.css';
import { colors } from './colors';

const Pokemon = ({ info }) => {

  const {
    name,
    image,
    number,
    color,
  } = info;

  return (
    <Link className={ pokeEl } to={`/pokemon/${ number }`} style={{
      backgroundColor: colors[color],
    }}>
      <div className={ pokeImgWrap }>
        <img
          className={ pokeImg }
          src={ image }
          alt={ name }
          width="96"
          height="96"
          loading="lazy"
        />
      </div>
      <h2 className={ pokeH2 }>{ name }</h2>
      <p className={ pokeP }>{ number.toString().padStart( 3, '0' ) }</p>
    </Link>
  );

};

export default Pokemon;