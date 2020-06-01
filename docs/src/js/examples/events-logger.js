import AutoComplete from '@loicblascos/autocomplete';
import { default as source } from '../sources/countries.js';

const input = document.querySelector( '#events-example' );
const logger = document.querySelector( '.events-logger' );
const logSpan = document.createElement( 'span' );
const typeSpan = document.createElement( 'span' );

logSpan.className = 'log-event';
typeSpan.className = 'log-type';

new AutoComplete(
	input,
	{
		source,
		maxResults: 50,
		onOpen: () => logEvent( 'onOpen', 'menu opened' ),
		onClose: () => logEvent( 'onClose', 'menu closed' ),
		onResize: () => logEvent( 'onResize', 'menu resized' ),
		onSearch: value => logEvent( 'onSearch', `search for "${ value }"` ),
		onAbort: () => logEvent( 'onAbort', 'search aborted' ),
		onClear: () => logEvent( 'onClear', 'input cleared' ),
		onSelect: item => logEvent( 'onSelect', `"${ item.label }" selected` ),
		onHighlight: item => logEvent( 'onHighlight', `"${ item.label }" highlighted` ),
	},
);

function logEvent( name, message ) {

	const log = logSpan.cloneNode();
	const type = typeSpan.cloneNode();

	type.textContent = name;
	log.append( type );
	log.append( document.createTextNode( `${ message }\n` ) );
	logger.append( log );

	if ( logger.childNodes.length > 50 ) {
		logger.firstChild.nextSibling.remove();
	}

	logger.lastChild.scrollIntoView( {
		block: 'nearest',
		inline: 'nearest',
	} );
}
