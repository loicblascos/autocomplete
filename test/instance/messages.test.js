import getInstance from '../helpers/getInstance';
import triggerFocus from '../helpers/triggerFocus';

const instance = getInstance();
const { messages } = instance.options;
const message = instance.components.Message.element;

describe( 'messages', function() {

	beforeEach( () => {

		instance.clear();

	} );

	it( 'open message', () => {

		instance.search( 'item' );

		expect( message.textContent ).toBe( messages.open );

	} );

	it( 'input message', () => {

		triggerFocus( instance.element );

		expect( message.textContent ).toBe( messages.input );

	} );

	it( 'select message', () => {

		instance.search( 'item' );
		instance.select( 0 );

		expect( message.textContent ).toBe( messages.select.replace( '%s', 'item 1' ) );

	} );

	it( 'clear message', () => {

		instance.element.value = 'item';
		instance.update();

		expect( message.textContent ).toBe( messages.clear );

	} );

	it( 'noResults message', () => {

		instance.search( 'none' );

		expect( message.textContent ).toBe( messages.noResults );

	} );

	it( 'loading message', done => {

		instance.options.source = function( value, response ) {

			Promise.resolve( [ 'item 1', 'item 2', 'item 3' ] ).then( suggestions => {

				expect( message.textContent ).toBe( messages.loading );
				response( suggestions );
				done();

			} );

		};

		instance.search( 'item' );

	} );
} );
