import getInstance from '../helpers/getInstance';

let instance;
let message;
let wrapper;
let list;

describe( 'aria attributes', function() {

	beforeEach( () => {

		instance = getInstance();
		message = instance.components.Message.element;
		wrapper = instance.components.Input.element;
		list = instance.components.List.element;

	} );

	it( 'input aria', () => {

		expect( instance.element.hasAttribute( 'aria-controls' ) ).toBe( false );
		expect( instance.element.getAttribute( 'aria-autocomplete' ) ).toBe( 'list' );
		expect( instance.element.hasAttribute( 'aria-activedescendant' ) ).toBe( false );

	} );

	it( 'input aria after a search', () => {

		instance.search( 'item' );

		expect( instance.element.getAttribute( 'aria-controls' ) ).toMatch( /_acplt[0-9]+/ );
		expect( instance.element.getAttribute( 'aria-autocomplete' ) ).toBe( 'list' );
		expect( instance.element.getAttribute( 'aria-activedescendant' ) ).toMatch( /_acplt[0-9]+-[0-9]+/ );

	} );

	it( 'input aria after destroy', () => {

		instance.destroy();

		expect( instance.element.hasAttribute( 'aria-controls' ) ).toBe( false );
		expect( instance.element.hasAttribute( 'aria-autocomplete' ) ).toBe( false );
		expect( instance.element.hasAttribute( 'aria-activedescendant' ) ).toBe( false );

	} );

	it( 'wrapper aria', () => {

		instance.search( 'item' );

		expect( wrapper.getAttribute( 'aria-owns' ) ).toMatch( /_acplt[0-9]+/ );
		expect( wrapper.getAttribute( 'aria-haspopup' ) ).toBe( 'listbox' );
		expect( wrapper.getAttribute( 'aria-expanded' ) ).toBe( 'true' );

		instance.close();

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
