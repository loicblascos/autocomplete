import triggerFocus from '../helpers/triggerFocus';
import triggerInput from '../helpers/triggerInput';
import getInstance from '../helpers/getInstance';

const instance = getInstance();

function input( value ) {

	triggerFocus( instance.element );
	triggerInput( instance.element, value );

}

describe( 'input event', function() {

	describe( 'with menu opened', () => {

		beforeEach( () => {

			instance.options.minLength = 0;
			instance.search( 'item' );

		} );

		it( 'Type one character', () => {

			input( 'i' );

			expect( instance.opened ).toBe( true );
			expect( instance.element.value ).toBe( 'i' );

		} );

		it( 'Type several characters', () => {

			input( 'i' );
			input( 'it' );
			input( 'ite' );
			input( 'item' );

			expect( instance.opened ).toBe( true );
			expect( instance.element.value ).toBe( 'item' );

		} );

		it( 'Type without results', () => {

			input( 'none' );

			expect( instance.opened ).toBe( false );
			expect( instance.element.value ).toBe( 'none' );

		} );
	} );

	describe( 'with menu closed', () => {

		beforeEach( () => {

			instance.close();
			instance.options.minLength = 2;

		} );

		it( 'Type one character', () => {

			input( 'i' );

			expect( instance.opened ).toBe( false );
			expect( instance.element.value ).toBe( 'i' );

		} );

		it( 'Type several characters', () => {

			input( 'i' );
			input( 'it' );
			input( 'ite' );
			input( 'item' );

			expect( instance.opened ).toBe( true );
			expect( instance.element.value ).toBe( 'item' );

		} );

		it( 'Type without results', () => {

			input( 'none' );

			expect( instance.opened ).toBe( false );
			expect( instance.element.value ).toBe( 'none' );

		} );
	} );
} );
