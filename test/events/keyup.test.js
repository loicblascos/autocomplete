import triggerFocus from '../helpers/triggerFocus';
import triggerKeyup from '../helpers/triggerKeyup';
import triggerKeydown from '../helpers/triggerKeydown';
import triggerInput from '../helpers/triggerInput';
import getInstance from '../helpers/getInstance';

const instance = getInstance();

function type( key, value ) {

	instance.element.value = value;

	triggerFocus( instance.element );
	triggerInput( instance.element, value );
	triggerKeydown( instance.element, key );
	triggerKeyup( instance.element, key );

}

describe( 'keyup event', function() {

	beforeEach( () => {

		instance.options.source.push( 'value 2' );
		instance.options.autoComplete = true;
		instance.element.value = '';

	} );

	it( 'After typing item', () => {

		type( 'i', 'i' );
		type( 't', 'it' );
		type( 'e', 'ite' );
		type( 'm', 'item' );

		expect( instance.opened ).toBe( true );
		expect( instance.element.value ).toBe( 'item 1' );

	} );

	it( 'After typing value', () => {

		type( 'v', 'v' );
		type( 'a', 'va' );
		type( 'l', 'val' );
		type( 'u', 'valu' );
		type( 'e', 'value' );

		expect( instance.opened ).toBe( true );
		expect( instance.element.value ).toBe( 'value 2' );

	} );

	it( 'After typing none', () => {

		type( 'n', 'n' );
		type( 'o', 'no' );
		type( 'n', 'non' );
		type( 'e', 'none' );

		expect( instance.opened ).toBe( false );
		expect( instance.element.value ).toBe( 'none' );

	} );
} );
