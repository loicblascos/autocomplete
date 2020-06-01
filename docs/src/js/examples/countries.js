import AutoComplete from '@loicblascos/autocomplete';
import { default as source } from '../sources/countries.js';

// To prevent issue with Edge.
const url = location.href.substring( 0, location.href.lastIndexOf( '/' ) );
const input = document.querySelector( '#main-example' );
const instance = new AutoComplete(
	input,
	{
		source,
		regExp: '^($1)',
		minLength: 1,
		maxResults: 50,
		clearable: true,
		matchAll: true,
		autoSearch: true,
		autoFocus: true,
		autoComplete: true,
		smartAccent: true,
		renderItem: ( suggestion, item ) => {

			item.style.setProperty( '--image', `url('${ url }/dist/png/${ suggestion.code }.png')` );
			return suggestion.content;

		},
	},
);

addEventListener( 'DOMContentLoaded', () => {

	const controls = document.querySelector( '#option-controls' );

	controls.querySelectorAll( 'input' ).forEach( checkbox => checkbox.checked = true );
	controls.addEventListener( 'change', ( { target: { name, checked } } ) => {

		instance.options[ name ] = checked;
		name === 'clearable' && instance.update();

	} );

} );
