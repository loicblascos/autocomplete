import triggerContextmenu from '../helpers/triggerContextmenu';
import getInstance from '../helpers/getInstance';

const instance = getInstance();
const clear = instance.components.Clear.element;
const list = instance.components.List.element;

describe( 'click event', function() {

	beforeEach( () => {

		instance.search( 'item' );
		instance.element.value = '';
		instance.options.onClear = jest.fn();
		instance.options.onSelect = jest.fn();

	} );

	it( 'left click on body', () => {

		document.body.click();

		expect( instance.options.onSelect ).toHaveBeenCalledTimes( 0 );
		expect( instance.opened ).toBe( true );
		expect( instance.element.value ).toBe( '' );

	} );

	it( 'left click on list', () => {

		list.click();

		expect( instance.options.onSelect ).toHaveBeenCalledTimes( 0 );
		expect( instance.opened ).toBe( true );
		expect( instance.element.value ).toBe( '' );

	} );

	it( 'left click on item', () => {

		list.children[ 1 ].click();

		expect( instance.options.onSelect ).toHaveBeenCalledTimes( 1 );
		expect( instance.opened ).toBe( false );
		expect( instance.element.value ).toBe( 'item 2' );

	} );

	it( 'left click on item highlighter', () => {

		list.children[ 1 ].firstElementChild.click();

		expect( instance.options.onSelect ).toHaveBeenCalledTimes( 1 );
		expect( instance.opened ).toBe( false );
		expect( instance.element.value ).toBe( 'item 2' );

	} );

	it( 'right click on item', () => {

		triggerContextmenu( list.children[ 1 ] );

		expect( instance.options.onSelect ).toHaveBeenCalledTimes( 0 );
		expect( instance.opened ).toBe( true );
		expect( instance.element.value ).toBe( '' );

	} );

	it( 'left click on clear button', () => {

		instance.element.value = 'item';
		instance.update();

		expect( document.body.contains( clear ) ).toBe( true );
		clear.click();
		expect( instance.options.onClear ).toHaveBeenCalledTimes( 1 );
		expect( instance.opened ).toBe( false );
		expect( instance.element.value ).toBe( '' );

	} );
} );
