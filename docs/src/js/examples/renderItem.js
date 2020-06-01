import AutoComplete from '@loicblascos/autocomplete';
import { default as source } from '../sources/colors.js';

const input = document.querySelector( '#renderitem-example' );
const colorSwatch = document.createElement( 'span' );

new AutoComplete(
	input,
	{
		source,
		maxResults: 50,
		renderItem: ( suggestion, item ) => {

			item.style.setProperty( '--color', suggestion.value );
			item.append( colorSwatch.cloneNode() );

			return suggestion.content;

		},
	},
);
