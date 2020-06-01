import triggerBlur from '../helpers/triggerBlur';
import getInstance from '../helpers/getInstance';

const instance = getInstance();

describe( 'blur event', function() {

	it( 'blur input', () => {

		instance.search( 'item' );
		instance.element.value = '';
		triggerBlur( instance.element );

		expect( document.activeElement ).toBe( document.body );
		expect( instance.opened ).toBe( false );

	} );
} );
