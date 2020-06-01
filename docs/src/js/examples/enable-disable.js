import AutoComplete from '@loicblascos/autocomplete';
import { default as source } from '../sources/countries.js';

const input = document.querySelector( '#enable-disable-example' );
const enable = document.querySelector( '#enable-btn' );
const disable = document.querySelector( '#disable-btn' );
const instance = new AutoComplete( input, { maxResults: 50, source } );

enable.addEventListener( 'click', () => instance.enable() );
disable.addEventListener( 'click', () => instance.disable() );
