// @ts-check
const { test, expect } = require('@playwright/test');

test.describe( 'List page', () => {

  test.beforeEach( async ({ page }) => {
    await page.goto( './' );
    await page.waitForLoadState();
  });


  test.describe( 'Structure', () => {
    test( 'Has navigation in 3 or more languages', async ({ page }) => {

      const navEls = page.locator( 'nav > a' ),
        navNums    = await navEls.count();

      expect( navNums ).toBeGreaterThanOrEqual( 3 );

      for ( const el of await navEls.all() ) {

        const attr = await el.getAttribute( 'href' );
        expect( attr ).not.toBeNull();

      }

    });

    test( 'Has a filter to search a pokemon', async ({ page }) => {

      const input = page.locator( '#search' );
      expect( input ).not.toBeNull();

    });

    test( 'Has a list with the Pokemon name and a thumbnail image', async ({ page }) => {

      const pokemons = page.getByTestId( 'pkmn-wrap' ),
        numPokemons  = await pokemons.count();

      expect( numPokemons ).toBeGreaterThanOrEqual( 1 );
      expect( pokemons.first().locator( 'img' ) ).not.toBeNull();
      expect( pokemons.first().locator( 'h2' ) ).not.toBeNull();

    });
  });


  test.describe( 'Functionality', () => {

    test( 'Navigate to a different language', async ({ page }) => {

      const navEls = page.locator( 'nav > a' );

      await navEls.nth( 2 ).click();

      page.on( 'response', ( response ) => {
        expect( response.status() ).not.toBe( 404 );
      });

    });

    test( 'Filter Pokemon', async ({ page }) => {

      const input = page.locator( '#search' );

      expect( input ).not.toBeNull();
      await input.type( 'bulbasaur' );

      const pokemons = page.getByTestId( 'pkmn-wrap' );
      await expect( pokemons ).toHaveCount( 1 );

    });

    test( 'Navigate to a pokemon page', async ({ page }) => {

      const pokemons = page.getByTestId( 'pkmn-wrap' );

      await pokemons.first().click();

      page.on( 'response', ( response ) => {
        expect( response.status() ).not.toBe( 404 );
      });

    });

  });

});