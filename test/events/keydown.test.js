import '../helpers/scrollIntoView';
import triggerKeydown from '../helpers/triggerKeydown';
import triggerFocus from '../helpers/triggerFocus';
import getInstance from '../helpers/getInstance';

const instance = getInstance();

function keydown( value ) {

	triggerFocus( instance.element );
	triggerKeydown( instance.element, value );

}

describe( 'keydown event', function() {

	describe( 'with menu opened', () => {

		beforeEach( () => {

			instance.options.autoComplete = true;
			instance.options.onSelect = jest.fn();
			instance.search( 'item' );

		} );

		it( 'Enter key', () => {

			keydown( 'Enter' );

			expect( instance.options.onSelect ).toHaveBeenCalledTimes( 1 );
			expect( instance.opened ).toBe( false );
			expect( instance.element.value ).toBe( 'item 1' );

		} );

		it( 'Escape key', () => {

			keydown( 'Escape' );

			expect( instance.opened ).toBe( false );
			expect( instance.element.value ).toBe( '' );

		} );

		it( 'ArrowDown key', () => {

			keydown( 'ArrowDown' );

			expect( instance.opened ).toBe( true );
			expect( instance.element.value ).toBe( 'item 2' );
			expect( instance.items[ instance.index ] ).toEqual(
				expect.objectContaining( { label: 'item 2', value: 'item 2' } ),
			);

		} );

		it( 'ArrowUp key', () => {

			keydown( 'ArrowUp' );

			expect( instance.opened ).toBe( true );
			expect( instance.element.value ).toBe( 'item 3' );
			expect( instance.items[ instance.index ] ).toEqual(
				expect.objectContaining( { label: 'item 3', value: 'item 3' } ),
			);

		} );
	} );

	describe( 'with menu closed', () => {

		beforeEach( () => {

			instance.element.value = '';
			instance.options.onSelect = jest.fn();
			instance.depopulate();

		} );

		it( 'Enter key', () => {

			keydown( 'Enter' );

			expect( instance.options.onSelect ).toHaveBeenCalledTimes( 0 );
			expect( instance.opened ).toBe( false );
			expect( instance.element.value ).toBe( '' );

		} );

		it( 'Escape key', () => {

			keydown( 'Escape' );

			expect( instance.opened ).toBe( false );
			expect( instance.element.value ).toBe( '' );

		} );

		it( 'ArrowDown key', () => {

			keydown( 'ArrowDown' );

			expect( instance.opened ).toBe( false );
			expect( instance.element.value ).toBe( '' );
			expect( instance.items[ instance.index ] ).toEqual( undefined );

		} );

		it( 'ArrowUp key', () => {

			keydown( 'ArrowUp' );

			expect( instance.opened ).toBe( false );
			expect( instance.element.value ).toBe( '' );
			expect( instance.items[ instance.index ] ).toEqual( undefined );

		} );
	} );
} );
