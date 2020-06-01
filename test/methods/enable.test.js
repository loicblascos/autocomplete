import getInstance from '../helpers/getInstance';

const instance = getInstance();
const clear = instance.components.Clear.element;

describe( 'enable method', function() {

	describe( 'with input disabled', enableTests );
	describe( 'with input enabled', enableTests );

} );

function enableTests() {

	it( 'without value', () => {

		instance.element.value = '';
		instance.update();
		instance.enable();

		expect( document.body.contains( clear ) ).toBe( false );

	} );

	it( 'with value', () => {

		instance.element.value = 'item';
		instance.update();
		instance.enable();

		expect( document.body.contains( clear ) ).toBe( true );

	} );
}
