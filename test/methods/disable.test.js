import getInstance from '../helpers/getInstance';

const instance = getInstance();
const clear = instance.components.Clear.element;

describe( 'disable method', function() {

	describe( 'with input disabled', disableTests );
	describe( 'with input enabled', disableTests );

} );

function disableTests() {

	it( 'without value', () => {

		instance.element.value = '';
		instance.update();
		instance.disable();

		expect( document.body.contains( clear ) ).toBe( false );

	} );

	it( 'with value', () => {

		instance.element.value = 'item';
		instance.update();
		instance.disable();

		expect( document.body.contains( clear ) ).toBe( false );

	} );
}
