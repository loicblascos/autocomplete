import AutoComplete from '@loicblascos/autocomplete';
import { default as source } from '../sources/countries.js';

const input = document.querySelector( '#select-highlight-example' );
const menuTarget = input.closest( '.field-wrapper' ).nextElementSibling;
const select = document.querySelector( '#select-btn' );
const moveUp = document.querySelector( '#moveup-btn' );
const moveDown = document.querySelector( '#movedown-btn' );
const instance = new AutoComplete(
	input,
	{
		source,
		menuTarget,
		minLength: 0,
		maxResults: 20,
		onResize: ( { style } ) => {

			style.position = 'relative';
			style.zIndex = 0;
			style.left = 0;
			style.top = 0;

		},
	},
);

instance.close = () => null;
instance.disable();
instance.search();

select.addEventListener( 'click', () => instance.select( instance.index ) );
moveUp.addEventListener( 'click', () => instance.highlight( instance.index - 1 ) );
moveDown.addEventListener( 'click', () => instance.highlight( instance.index + 1 ) );
