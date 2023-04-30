// @ts-check
const { test, expect } = require('@playwright/test'),
  AxeBuilder = require('@axe-core/playwright').default;

test.describe( 'Pokemon page', () => {

  test.beforeEach( async ({ page }) => {
    await page.goto( './pokemon/1/' );
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

  test( 'Should not have any automatically detectable accessibility issues', async ({ page }) => {

    const a11yResult = await new AxeBuilder({ page }).analyze();
    expect( a11yResult.violations ).toEqual([]);

  });

});