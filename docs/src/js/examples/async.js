import AutoComplete from '@loicblascos/autocomplete';
import debounce from 'lodash/debounce';
import 'promise-polyfill/src/polyfill';
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only';
import 'whatwg-fetch';

const cache = new Map();
const input = document.querySelector( '#async-example' );
const github = 'https://api.github.com/search/repositories?q=%s';
let controller;

const span = document.createElement( 'span' );
const link = document.createElement( 'a' );
const icon = ( () => {

	const uri = 'http://www.w3.org/2000/svg';
	const svg = document.createElementNS( uri, 'svg' );
	const path = document.createElementNS( uri, 'path' );

	path.setAttribute( 'd', 'M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z' );
	svg.setAttribute( 'viewBox', `0 0 12 16` );
	svg.setAttribute( 'aria-hidden', true );
	svg.setAttribute( 'focusable', false );
	svg.setAttribute( 'fill', 'currentColor' );
	svg.setAttribute( 'height', 16 );
	svg.setAttribute( 'width', 16 );
	svg.appendChild( path );

	return svg;

} )();

const request = debounce(
	function( endpoint, response ) {

		fetch(
			endpoint,
			{
				method: 'GET',
				signal: controller.signal,
			},
		)
			.then( obj => obj.json() )
			.then( data => {

				const list = data.items.map( item => ( {
					label: item.full_name,
					value: item.full_name,
					url: item.html_url,
				} ) );

				cache.set( endpoint, list );
				response( list );

			} )
			.catch( error => {

				// We return empty response if not aborted.
				if ( error.name !== 'AbortError' ) {
					response( [] );
				}
			} );

	},
	250,
);

const source = function( value, response ) {

	const endpoint = github.replace( '%s', value.toLowerCase() );

	// We abort previous request.
	controller && controller.abort();

	// We return cached response.
	if ( cache.has( endpoint ) ) {

		response( cache.get( endpoint ) );
		return;

	}

	// We fetch response.
	controller = new AbortController();
	request( endpoint, response );

};

new AutoComplete(
	input,
	{
		source,
		loader: true,
		highlighter: false,
		filterResults: () => true,
		onAbort: () => {

			// We abort current request.
			controller && controller.abort();
			// We cancel debounced request.
			request.cancel();

		},
		renderItem: ( suggestion, item ) => {

			item.classList.add( 'github-repo' );

			suggestion.content = link.cloneNode();
			suggestion.content.append( icon.cloneNode( true ) );
			suggestion.content.append( span.cloneNode() );
			suggestion.content.lastChild.textContent = suggestion.label;
			suggestion.content.append( span.cloneNode() );
			suggestion.content.lastChild.textContent = 'Jump to ↵';
			suggestion.content.href = suggestion.url;

			return suggestion.content;

		},
	},
);
