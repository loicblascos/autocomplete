import getInstance from '../helpers/getInstance';

const instance = getInstance();

describe( 'select method', function() {

	describe( 'with menu closed', () => {

		beforeEach( () => {

			instance.options.onSelect = jest.fn();
			instance.options.minLength = 3;
			instance.element.value = '';
			instance.search( 'item' );
			instance.close();

		} );

		it( 'without search results', () => {

			instance.search( 'none' );
			instance.close();
			instance.select( 0 );

			expect( instance.options.onSelect ).toHaveBeenCalledTimes( 0 );
			expect( instance.element.value ).toBe( '' );

		} );

		it( 'with search results', () => {

			instance.select( 0 );

			expect( instance.options.onSelect ).toHaveBeenCalledTimes( 0 );
			expect( instance.element.value ).toBe( '' );

		} );

		it( 'select not existing item with search results', () => {

			instance.select( 5 );

			expect( instance.options.onSelect ).toHaveBeenCalledTimes( 0 );
			expect( instance.element.value ).toBe( '' );

		} );

		it( 'select item 2 multiple times with search results', () => {

			instance.select( 2 );
			instance.select( 2 );
			instance.select( 2 );

			expect( instance.options.onSelect ).toHaveBeenCalledTimes( 0 );
			expect( instance.element.value ).toBe( '' );

		} );
	} );

	describe( 'with menu opened', () => {

		beforeEach( () => {

			instance.options.onSelect = jest.fn();
			instance.options.minLength = 3;
			instance.element.value = '';
			instance.search( 'item' );

		} );

		it( 'without search results', () => {

			instance.search( 'none' );
			instance.select( 0 );

			expect( instance.options.onSelect ).toHaveBeenCalledTimes( 0 );
			expect( instance.element.value ).toBe( '' );

		} );

		it( 'with search results', () => {

			instance.select( 0 );

			expect( instance.options.onSelect ).toHaveBeenCalledTimes( 1 );
			expect( instance.element.value ).toBe( 'item 1' );

		} );

		it( 'select not existing item with search results', () => {

			instance.select( 5 );

			expect( instance.options.onSelect ).toHaveBeenCalledTimes( 0 );
			expect( instance.element.value ).toBe( '' );

		} );

		it( 'select item 2 multiple times with search results', () => {

			instance.select( 2 );
			instance.select( 2 );
			instance.select( 2 );

			expect( instance.options.onSelect ).toHaveBeenCalledTimes( 1 );
			expect( instance.element.value ).toBe( 'item 3' );

		} );
	} );
} );
