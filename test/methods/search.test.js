import getInstance from '../helpers/getInstance';

const instance = getInstance();
const list = instance.components.List.element;

describe( 'search method', function() {

	describe( 'without not enough number of characters', () => {

		beforeEach( () => {

			instance.options.onSearch = jest.fn();
			instance.options.minLength = 3;

		} );

		it( 'search once', () => {

			instance.search( 'i' );

			expect( instance.options.onSearch ).toHaveBeenCalledTimes( 0 );
			expect( list.childElementCount ).toBe( 0 );
			expect( instance.items.length ).toBe( 0 );

		} );

		it( 'search several times', () => {

			instance.search( '' );
			instance.search( 'i' );
			instance.search( 'it' );

			expect( instance.options.onSearch ).toHaveBeenCalledTimes( 0 );
			expect( list.childElementCount ).toBe( 0 );
			expect( instance.items.length ).toBe( 0 );

		} );
	} );

	describe( 'with min length of 0', () => {

		beforeEach( () => {

			instance.options.onSearch = jest.fn();
			instance.options.minLength = 0;

		} );

		it( 'search once with empty value', () => {

			instance.search( '' );

			expect( instance.options.onSearch ).toHaveBeenCalledTimes( 1 );
			expect( list.childElementCount ).toBe( 3 );
			expect( instance.items.length ).toBe( 3 );

		} );

		it( 'search once with one character', () => {

			instance.search( 'i' );

			expect( instance.options.onSearch ).toHaveBeenCalledTimes( 1 );
			expect( list.childElementCount ).toBe( 3 );
			expect( instance.items.length ).toBe( 3 );

		} );

		it( 'search several times', () => {

			instance.search( 'i' );
			instance.search( 'it' );
			instance.search( 'ite' );

			expect( instance.options.onSearch ).toHaveBeenCalledTimes( 3 );
			expect( list.childElementCount ).toBe( 3 );
			expect( instance.items.length ).toBe( 3 );

		} );
	} );

	describe( 'search with results', () => {

		beforeEach( () => {

			instance.options.onSearch = jest.fn();
			instance.options.minLength = 1;

		} );

		it( 'search once', () => {

			instance.search( 'i' );

			expect( instance.options.onSearch ).toHaveBeenCalledTimes( 1 );
			expect( list.childElementCount ).toBe( 3 );
			expect( instance.items.length ).toBe( 3 );

		} );

		it( 'search several times', () => {

			instance.search( 'i' );
			instance.search( 'it' );
			instance.search( 'ite' );

			expect( instance.options.onSearch ).toHaveBeenCalledTimes( 3 );
			expect( list.childElementCount ).toBe( 3 );
			expect( instance.items.length ).toBe( 3 );

		} );
	} );

	describe( 'search with limited results', () => {

		beforeEach( () => {

			instance.options.onSearch = jest.fn();
			instance.options.minLength = 1;
			instance.options.maxResults = 2;

		} );

		it( 'search once', () => {

			instance.search( 'i' );

			expect( instance.options.onSearch ).toHaveBeenCalledTimes( 1 );
			expect( list.childElementCount ).toBe( 2 );
			expect( instance.items.length ).toBe( 2 );

		} );

		it( 'search several times', () => {

			instance.search( 'i' );
			instance.search( 'it' );
			instance.search( 'ite' );

			expect( instance.options.onSearch ).toHaveBeenCalledTimes( 3 );
			expect( list.childElementCount ).toBe( 2 );
			expect( instance.items.length ).toBe( 2 );

		} );
	} );

	describe( 'search without results', () => {

		beforeEach( () => {

			instance.options.source = [];
			instance.options.onSearch = jest.fn();
			instance.options.minLength = 1;

		} );

		it( 'search once', () => {

			instance.search( 'i' );

			expect( instance.options.onSearch ).toHaveBeenCalledTimes( 1 );
			expect( list.childElementCount ).toBe( 0 );
			expect( instance.items.length ).toBe( 0 );

		} );

		it( 'search several times', () => {

			instance.search( 'i' );
			instance.search( 'it' );
			instance.search( 'ite' );

			expect( instance.options.onSearch ).toHaveBeenCalledTimes( 3 );
			expect( list.childElementCount ).toBe( 0 );
			expect( instance.items.length ).toBe( 0 );

		} );
	} );

	describe( 'asynchronous search', () => {

		beforeEach( () => {

			instance.options.onSearch = jest.fn();
			instance.options.minLength = 1;
			instance.options.maxResults = -1;

		} );

		it( 'with results', done => {

			instance.options.source = function( value, response ) {

				Promise.resolve( [ 'item 1', 'item 2', 'item 3' ] ).then( suggestions => {

					response( suggestions );
					expect( instance.options.onSearch ).toHaveBeenCalledTimes( 1 );
					expect( list.childElementCount ).toBe( 3 );
					expect( instance.items.length ).toBe( 3 );
					done();

				} );

			};

			instance.search( 'item' );

		} );

		it( 'without results', done => {

			instance.options.source = function( value, response ) {

				Promise.resolve( [] ).then( suggestions => {

					response( suggestions );
					expect( instance.options.onSearch ).toHaveBeenCalledTimes( 1 );
					expect( list.childElementCount ).toBe( 0 );
					expect( instance.items.length ).toBe( 0 );
					done();

				} );

			};

			instance.search( 'item' );

		} );
	} );
} );
