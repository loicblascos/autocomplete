import AutoComplete from '@loicblascos/autocomplete';

const input = document.querySelector( '#dynamic-example' );
const colorSwatch = document.createElement( 'span' );

new AutoComplete(
	input,
	{
		source: ( value, response ) => {

			const isHex = /^#([0-9A-F]{3}){1,2}$/i.test( value );
			response( isHex ? [ value ] : [] );

		},
		renderItem: ( suggestion, item ) => {

			item.style.setProperty( '--color', suggestion.value );
			item.append( colorSwatch.cloneNode() );

			return suggestion.content;

		},
	},
);
