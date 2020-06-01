import getInstance from '../helpers/getInstance';

const instance = getInstance();
const menu = instance.components.Menu.element;

describe( 'close method', function() {

	describe( 'without search history', () => {

		beforeEach( () => {

			instance.options.onClose = jest.fn();

		} );

		it( 'close once', () => {

			instance.close();

			expect( instance.options.onClose ).toHaveBeenCalledTimes( 0 );
			expect( document.body.contains( menu ) ).toBe( false );
			expect( instance.opened ).toBe( false );

		} );

		it( 'close several times', () => {

			instance.close();
			instance.close();
			instance.close();

			expect( instance.options.onClose ).toHaveBeenCalledTimes( 0 );
			expect( document.body.contains( menu ) ).toBe( false );
			expect( instance.opened ).toBe( false );

		} );
	} );

	describe( 'after a search with results', () => {

		beforeEach( () => {

			instance.options.onClose = jest.fn();
			instance.search( 'item' );

		} );

		it( 'close once', () => {

			instance.close();

			expect( instance.options.onClose ).toHaveBeenCalledTimes( 1 );
			expect( document.body.contains( menu ) ).toBe( false );
			expect( instance.opened ).toBe( false );

		} );

		it( 'close several times', () => {

			instance.close();
			instance.close();
			instance.close();

			expect( instance.options.onClose ).toHaveBeenCalledTimes( 1 );
			expect( document.body.contains( menu ) ).toBe( false );
			expect( instance.opened ).toBe( false );

		} );
	} );

	describe( 'after a search without results', () => {

		beforeEach( () => {

			instance.options.onClose = jest.fn();
			instance.search( 'none' );

		} );

		it( 'close once', () => {

			instance.close();

			expect( instance.options.onClose ).toHaveBeenCalledTimes( 0 );
			expect( document.body.contains( menu ) ).toBe( false );
			expect( instance.opened ).toBe( false );

		} );

		it( 'close several times', () => {

			instance.close();
			instance.close();
			instance.close();

			expect( instance.options.onClose ).toHaveBeenCalledTimes( 0 );
			expect( document.body.contains( menu ) ).toBe( false );
			expect( instance.opened ).toBe( false );

		} );
	} );
} );
