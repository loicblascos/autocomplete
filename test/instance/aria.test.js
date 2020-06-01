import getInstance from '../helpers/getInstance';

const instance = getInstance();
const message = instance.components.Message.element;
const wrapper = instance.components.Input.element;
const list = instance.components.List.element;

describe( 'aria attributes', function() {

	it( 'input aria', () => {

		expect( instance.element.getAttribute( 'aria-controls' ) ).toMatch( /_acplt[0-9]+/ );
		expect( instance.element.getAttribute( 'aria-autocomplete' ) ).toBe( 'list' );
		expect( instance.element.getAttribute( 'aria-activedescendant' ) ).toBe( '' );

	} );

	it( 'wrapper aria', () => {

		expect( wrapper.getAttribute( 'aria-owns' ) ).toMatch( /_acplt[0-9]+/ );
		expect( wrapper.getAttribute( 'aria-haspopup' ) ).toBe( 'listbox' );
		expect( wrapper.getAttribute( 'aria-expanded' ) ).toBe( 'false' );

	} );

	it( 'message aria', () => {

		expect( message.getAttribute( 'role' ) ).toBe( 'status' );
		expect( message.getAttribute( 'aria-atomic' ) ).toBe( 'true' );
		expect( message.getAttribute( 'aria-live' ) ).toBe( 'polite' );

	} );

	it( 'list aria', () => {

		expect( list.getAttribute( 'role' ) ).toBe( 'listbox' );
		expect( list.getAttribute( 'aria-labelledby' ) ).toMatch( /_acplt[0-9]l+/ );

	} );

	it( 'item aria', () => {

		instance.search( 'item' );

		expect( list.firstElementChild.getAttribute( 'role' ) ).toBe( 'option' );
		expect( list.firstElementChild.getAttribute( 'aria-selected' ) ).toBe( 'true' );

	} );
} );
