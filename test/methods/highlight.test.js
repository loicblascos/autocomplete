import '../helpers/scrollIntoView';
import getInstance from '../helpers/getInstance';

const instance = getInstance();
const list = instance.components.List.element;

describe( 'highlight method', function() {

	describe( 'highlight menu closed', () => {

		beforeEach( () => {

			instance.options.onHighlight = jest.fn();
			instance.options.autoFocus = false;

		} );

		it( 'highlight without results', () => {

			instance.highlight( 0 );

			expect( instance.options.onHighlight ).toHaveBeenCalledTimes( 0 );
			expect( instance.index ).toBeNull();
			expect( instance.items[ instance.index ] ).toBeUndefined();

		} );

		it( 'highlight with results', () => {

			instance.populate( 'item', instance.options.source );
			instance.highlight( 2 );

			expect( instance.options.onHighlight ).toHaveBeenCalledTimes( 0 );
			expect( instance.index ).toBeNull();
			expect( instance.items[ instance.index ] ).toBeUndefined();

		} );
	} );

	describe( 'highlight menu opened', () => {

		beforeEach( () => {

			instance.options.onHighlight = jest.fn();
			instance.options.autoFocus = false;

		} );

		it( 'highlight without results', () => {

			instance.highlight( 0 );

			expect( instance.options.onHighlight ).toHaveBeenCalledTimes( 0 );
			expect( instance.index ).toBeNull();
			expect( instance.items[ instance.index ] ).toBeUndefined();

		} );

		it( 'highlight first item', () => {

			instance.search( 'item' );

			expect( list.children[ 2 ].getAttribute( 'aria-selected' ) ).toBe( 'false' );
			instance.highlight( 2 );
			expect( list.children[ 2 ].getAttribute( 'aria-selected' ) ).toBe( 'true' );

			expect( instance.options.onHighlight ).toHaveBeenCalledTimes( 1 );
			expect( instance.index ).toBe( 2 );
			expect( instance.items[ instance.index ] ).toEqual(
				expect.objectContaining( { label: 'item 3', value: 'item 3' } ),
			);

		} );

		it( 'highlight last item', () => {

			instance.search( 'item' );

			expect( list.children[ 2 ].getAttribute( 'aria-selected' ) ).toBe( 'false' );
			instance.highlight( 2 );
			expect( list.children[ 2 ].getAttribute( 'aria-selected' ) ).toBe( 'true' );

			expect( instance.options.onHighlight ).toHaveBeenCalledTimes( 1 );
			expect( instance.index ).toBe( 2 );
			expect( instance.items[ instance.index ] ).toEqual(
				expect.objectContaining( { label: 'item 3', value: 'item 3' } ),
			);

		} );

		it( 'highlight with index equal to -1', () => {

			instance.search( 'item' );

			expect( list.children[ 2 ].getAttribute( 'aria-selected' ) ).toBe( 'false' );
			instance.highlight( -1 );
			expect( list.children[ 2 ].getAttribute( 'aria-selected' ) ).toBe( 'true' );

			expect( instance.options.onHighlight ).toHaveBeenCalledTimes( 1 );
			expect( instance.index ).toBe( 2 );
			expect( instance.items[ instance.index ] ).toEqual(
				expect.objectContaining( { label: 'item 3', value: 'item 3' } ),
			);

		} );

		it( 'highlight with index superior to result length', () => {

			instance.search( 'item' );

			expect( list.children[ 0 ].getAttribute( 'aria-selected' ) ).toBe( 'false' );
			instance.highlight( 3 );
			expect( list.children[ 0 ].getAttribute( 'aria-selected' ) ).toBe( 'true' );

			expect( instance.options.onHighlight ).toHaveBeenCalledTimes( 1 );
			expect( instance.index ).toBe( 0 );
			expect( instance.items[ instance.index ] ).toEqual(
				expect.objectContaining( { label: 'item 1', value: 'item 1' } ),
			);

		} );
	} );
} );
