import triggerMouseenter from '../helpers/triggerMouseenter';
import getInstance from '../helpers/getInstance';

const instance = getInstance();
const list = instance.components.List.element;

describe( 'mouseenter event', function() {

	beforeEach( () => {

		instance.search( 'item' );
		instance.index = null;
		instance.autoFocus = false;
		instance.element.value = '';
		instance.options.onHighlight = jest.fn();

	} );

	it( 'mouseenter on body', () => {

		triggerMouseenter( document.body );

		expect( instance.options.onHighlight ).toHaveBeenCalledTimes( 0 );
		expect( instance.index ).toBe( null );

	} );

	it( 'mouseenter on list', () => {

		triggerMouseenter( list );

		expect( instance.options.onHighlight ).toHaveBeenCalledTimes( 0 );
		expect( instance.index ).toBe( null );

	} );

	it( 'mouseenter on item', () => {

		triggerMouseenter( list.children[ 1 ] );

		expect( instance.options.onHighlight ).toHaveBeenCalledTimes( 1 );
		expect( instance.index ).toBe( 1 );

	} );

	it( 'mouseenter on highlighter', () => {

		triggerMouseenter( list.children[ 1 ].firstElementChild );

		expect( instance.options.onHighlight ).toHaveBeenCalledTimes( 0 );
		expect( instance.index ).toBe( null );

	} );
} );
