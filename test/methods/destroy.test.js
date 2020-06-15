import getInstance from '../helpers/getInstance';

const instance = getInstance();
const message = instance.components.Message.element;
const wrapper = instance.components.Input.element;
const clear = instance.components.Clear.element;
const list = instance.components.List.element;

describe( 'destroy method', function() {

	it( 'HTMLElements', () => {

		instance.search( 'item' );
		instance.destroy();

		expect( document.body.contains( message ) ).toBe( false );
		expect( document.body.contains( wrapper ) ).toBe( false );
		expect( document.body.contains( list ) ).toBe( false );
		expect( document.body.contains( clear ) ).toBe( false );

	} );
} );
