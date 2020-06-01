import getInstance from '../helpers/getInstance';

const instance = getInstance();
const menu = instance.components.Menu.element;

describe( 'open method', function() {

	describe( 'without search history', () => {

		beforeEach( () => {

			instance.options.onOpen = jest.fn();

		} );

		it( 'open once', () => {

			instance.open();

			expect( instance.options.onOpen ).toHaveBeenCalledTimes( 0 );
			expect( document.body.contains( menu ) ).toBe( false );
			expect( instance.opened ).toBe( false );

		} );

		it( 'open several times', () => {

			instance.open();
			instance.open();
			instance.open();

			expect( instance.options.onOpen ).toHaveBeenCalledTimes( 0 );
			expect( document.body.contains( menu ) ).toBe( false );
			expect( instance.opened ).toBe( false );

		} );
	} );

	describe( 'after a search with results', () => {

		beforeEach( () => {

			instance.close();
			instance.options.onOpen = jest.fn();
			instance.populate( 'item', [ 'item' ] );

		} );

		it( 'open once', () => {

			instance.open();

			expect( instance.options.onOpen ).toHaveBeenCalledTimes( 1 );
			expect( document.body.contains( menu ) ).toBe( true );
			expect( instance.opened ).toBe( true );

		} );

		it( 'open several times', () => {

			instance.open();
			instance.open();
			instance.open();

			expect( instance.options.onOpen ).toHaveBeenCalledTimes( 1 );
			expect( document.body.contains( menu ) ).toBe( true );
			expect( instance.opened ).toBe( true );

		} );
	} );

	describe( 'after a search without results', () => {

		beforeEach( () => {

			instance.close();
			instance.options.onOpen = jest.fn();
			instance.populate( 'none', [ 'item' ] );

		} );

		it( 'open once', () => {

			instance.open();

			expect( instance.options.onOpen ).toHaveBeenCalledTimes( 0 );
			expect( document.body.contains( menu ) ).toBe( false );
			expect( instance.opened ).toBe( false );

		} );

		it( 'open several times', () => {

			instance.open();
			instance.open();
			instance.open();

			expect( instance.options.onOpen ).toHaveBeenCalledTimes( 0 );
			expect( document.body.contains( menu ) ).toBe( false );
			expect( instance.opened ).toBe( false );

		} );
	} );
} );
