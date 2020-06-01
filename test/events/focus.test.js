import triggerBlur from '../helpers/triggerBlur';
import triggerFocus from '../helpers/triggerFocus';
import getInstance from '../helpers/getInstance';

const instance = getInstance();

describe( 'focus event', function() {

	beforeEach( () => {

		triggerBlur( instance.element );
		instance.close();
		instance.element.value = '';

	} );

	it( 'focus without value', () => {

		triggerFocus( instance.element );

		expect( instance.element ).toBe( document.activeElement );
		expect( instance.opened ).toBe( false );

	} );

	it( 'focus with existing value', () => {

		instance.element.value = 'test';
		triggerFocus( instance.element );

		expect( instance.element ).toBe( document.activeElement );
		expect( instance.opened ).toBe( false );

	} );

	it( 'focus with no existing value', () => {

		instance.element.value = 'none';
		triggerFocus( instance.element );

		expect( instance.element ).toBe( document.activeElement );
		expect( instance.opened ).toBe( false );

	} );

	it( 'focus without value and autoSearch enabled', () => {

		instance.options.autoSearch = true;
		instance.options.minLength = 0;
		instance.element.value = '';
		triggerFocus( instance.element );

		expect( instance.element ).toBe( document.activeElement );
		expect( instance.opened ).toBe( true );

	} );

	it( 'focus with existing value and autoSearch enabled', () => {

		instance.options.autoSearch = true;
		instance.element.value = 'item';
		triggerFocus( instance.element );

		expect( instance.element ).toBe( document.activeElement );
		expect( instance.opened ).toBe( true );

	} );

	it( 'focus with no existing value and autoSearch enabled', () => {

		instance.options.autoSearch = true;
		instance.element.value = 'none';
		triggerFocus( instance.element );

		expect( instance.element ).toBe( document.activeElement );
		expect( instance.opened ).toBe( false );

	} );
} );
