// @ts-check
const { test, expect } = require('@playwright/test');

test.describe( 'Pokemon page', () => {

  test.beforeEach( async ({ page }) => {
    await page.goto( 'http://localhost:8000/pokemon/1/' );
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

    test( 'Has pokemon information', async ({ page }) => {

      // text information
      [
        'pkmn-name',
        'pkmn-num',
        'pkmn-desc',
        'pkmn-genus',
      ].forEach( ( testID ) => {

        const element = page.getByTestId( testID );

        expect( element ).not.toBeNull();
        expect( element ).not.toBeEmpty();

      });

      // image
      const element = page.getByTestId( 'pkmn-img' );
      expect( element ).not.toBeNull();
      expect( await element.getAttribute( 'src' ) ).not.toBeNull();

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

  });

});