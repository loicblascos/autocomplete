import AutoComplete from '@loicblascos/autocomplete';
import { default as source } from '../sources/countries.js';

const input = document.querySelector( '#search-clear-example' );
const clear = document.querySelector( '#clear-btn' );
const search = document.querySelector( '#search-btn' );
const instance = new AutoComplete( input, { maxResults: 50, source } );

search.addEventListener( 'click', () => {

	input.value = 'saint';
	instance.search( 'saint' );

} );

clear.addEventListener( 'click', () => instance.clear() );
