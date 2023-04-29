import React from 'react';
import { render } from '@testing-library/react';
import Pokemon from './Pokemon';

describe( 'Render Pokemon', () => {

  test( 'With complete props', () => {

    const { queryByTestId } = render( <Pokemon info={{
      color: 'green',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      name:  'Bulbasaur',
      number: 1,
    }} /> );

    expect( queryByTestId( 'pkmn-img' ) ).not.toBeNull();

    expect( queryByTestId( 'pkmn-tit' ) ).not.toBeNull();
    expect( queryByTestId( 'pkmn-tit' ) ).toHaveTextContent( 'Bulbasaur' );

    expect( queryByTestId( 'pkmn-num' ) ).not.toBeNull();
    expect( queryByTestId( 'pkmn-num' ) ).toHaveTextContent( '1' );

  });

  test( 'With no props', () => {

    const { queryByTestId } = render( <Pokemon /> );

    // Assertion
    expect( queryByTestId( 'pkmn-wrap' ) ).toBeNull();

  });

  test( 'With partial props', () => {

    const { queryByTestId } = render( <Pokemon info={{
      color: 'green',
    }} /> );

    expect( queryByTestId( 'pkmn-img' ) ).not.toBeNull();
    expect( queryByTestId( 'pkmn-tit' ) ).not.toBeNull();
    expect( queryByTestId( 'pkmn-num' ) ).not.toBeNull();

  });

  test( 'With wrong props types', () => {

    const { queryByTestId } = render( <Pokemon info={{
      name:   null,
      number: 'fw',
      image:  undefined,
    }} /> );

    expect( queryByTestId( 'pkmn-img' ) ).not.toBeNull();
    expect( queryByTestId( 'pkmn-tit' ) ).not.toBeNull();
    expect( queryByTestId( 'pkmn-num' ) ).not.toBeNull();

  });

});