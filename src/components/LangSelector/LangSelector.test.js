import React from 'react';
import { render } from '@testing-library/react';
import LangSelector from './LangSelector';

describe( 'LangSelector', () => {

  test( 'With complete props', () => {

    const { queryAllByTestId, queryByText } = render( <LangSelector 
      language="en"
      languages={ ['en', 'it', 'fr'] }
      originalPath="/"
    /> );

    expect( queryAllByTestId( 'lng' ).length ).toEqual( 3 );
    expect( queryByText( 'en' ) ).toEqual( queryAllByTestId( 'lng' )[0] );

  });

  test( 'With no props', () => {

    const { queryAllByTestId } = render( <LangSelector /> );
    expect( queryAllByTestId( 'lng' ).length ).toEqual( 0 );

  });

});