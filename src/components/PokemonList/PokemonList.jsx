// @ts-check
import React from 'react';
import Pokemon from '../Pokemon/Pokemon';
import { List, AutoSizer } from 'react-virtualized';
import { pokeList, pokeRow } from './PokemonList.module.css';

const PokemonList = ({ list, filter = '' }) => {

  const items = list.filter( ( pokemon ) => {
    return pokemon.name.toLowerCase().includes( filter.toLowerCase() );
  });

  return (
    <div className={ pokeList }>
      <AutoSizer
        defaultHeight={ 700 }
        defaultWidth={ 375 }
      >
        {({height, width}) => (
          <List
            width={ width }
            height={ height }
            rowHeight={ 176 }
            rowRenderer={({ index, key, style }) => (
              <div className={ pokeRow } key={ key } style={ style } role="row">
                <div role="gridcell">
                  <Pokemon info={ items[( index * 2 )] } />
                </div>
                <div role="gridcell">
                  <Pokemon info={ items[( index * 2 ) + 1] } />
                </div>
              </div>
            )}
            rowCount={ Math.ceil( items.length / 2 ) }
            overscanRowCount={ 3 }
          />
        )}
      </AutoSizer>
    </div>
  )

};

export default PokemonList;