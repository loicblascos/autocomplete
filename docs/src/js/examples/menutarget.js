import AutoComplete from '@loicblascos/autocomplete';
import { default as source } from '../sources/countries.js';

const input = document.querySelector( '#menutarget-example' );
const menuTarget = input.closest( '.input-wrapper' ).nextElementSibling;

new AutoComplete(
	input,
	{
		source,
		menuTarget,
		minLength: 0,
		maxResults: 5,
		autoSearch: true,
		onResize: ( { style } ) => {

			style.position = 'relative';
			style.zIndex = 0;
			style.left = 0;
			style.top = 0;

		},
	},
);
