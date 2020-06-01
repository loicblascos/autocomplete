import AutoComplete from '@loicblascos/autocomplete';
import { default as source } from '../sources/countries.js';

const input = document.querySelector( '#open-close-example' );
const open = document.querySelector( '#open-btn' );
const close = document.querySelector( '#close-btn' );
const instance = new AutoComplete(
	input,
	{
		source,
		minLength: 0,
		autoSearch: true,
		maxResults: 50,
	},
);

instance.populate( '', source );

open.addEventListener( 'click', () => instance.open() );
close.addEventListener( 'click', () => instance.close() );
