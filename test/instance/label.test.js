import AutoComplete from '../../src/js/autocomplete';
import implicitLabel from '../fixtures/implicitLabel';
import explicitLabel from '../fixtures/explicitLabel';
import definedLabel from '../fixtures/definedLabel';

document.body.innerHTML = implicitLabel + explicitLabel + definedLabel;

describe( 'input label', function() {

	it( 'implicit label', () => {

		const input = document.querySelector( '#implicit-input' );
		const label = input.closest( 'label' );
		new AutoComplete( input );

		expect( label.id ).toMatch( /_acplt[0-9]l+/ );

	} );

	it( 'explicit label', () => {

		const input = document.querySelector( '#explicit-input' );
		const label = document.querySelector( '[for="explicit-input"]' );
		new AutoComplete( input );

		expect( label.id ).toMatch( /_acplt[0-9]l+/ );

	} );

	it( 'with label ID', () => {

		const input = document.querySelector( '#explicit-input' );
		const label = document.querySelector( '#input-label' );
		new AutoComplete( input );

		expect( label.id ).toBe( 'input-label' );

	} );
} );
