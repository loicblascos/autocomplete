import AutoComplete from '@loicblascos/autocomplete';
import { default as source } from '../sources/countries.js';

const input = document.querySelector( '#multi-example' );

new AutoComplete(
	input,
	{
		maxResults: 50,
		source: function( value ) {

			this.values = value.trim().split( /\s*,\s*/ );
			// We use internal method instead of source callback.
			this.response( this.values.pop(), source );

		},
		onSelect: function( { label } ) {

			this.values.push( label );
			input.value = `${ this.values.filter( Boolean ).join( ', ' ) }, `;

		},
	},
);
