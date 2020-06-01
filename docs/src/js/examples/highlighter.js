import AutoComplete from '@loicblascos/autocomplete';
import { default as source } from '../sources/countries.js';

const input = document.querySelector( '#highlighter-example' );
const highlighter = document.createElement( 'mark' );
highlighter.className = 'highlighter';

new AutoComplete(
	input,
	{
		source,
		highlighter,
		maxResults: 50,
	},
);
