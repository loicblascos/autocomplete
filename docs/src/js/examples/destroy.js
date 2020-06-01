import AutoComplete from '@loicblascos/autocomplete';
import { default as source } from '../sources/countries.js';

const instantiate = () => instance = new AutoComplete( input, { maxResults: 50, source } );
const input = document.querySelector( '#destroy-example' );
let instance;

instantiate();
document.querySelector( '#init-btn' ).addEventListener( 'click', instantiate );
document.querySelector( '#destroy-btn' ).addEventListener( 'click', () => instance && instance.destroy() );
