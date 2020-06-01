const canScroll = 'scrollBehavior' in document.documentElement.style;
const offset = parseInt( getComputedStyle( document.documentElement )[ 'scroll-padding-top' ], 10 ) || 128;
const hash = window.location.hash;

hash && scrollTo( hash );

function scrollTo( fragment ) {

	const element = document.querySelector( fragment );

	! canScroll && element && window.scrollTo( 0, window.pageYOffset + element.getBoundingClientRect().top - offset );

}

export default function shouldScroll( element, event ) {

	const href = element.getAttribute( 'href' );

	if ( ! href ) {
		return;
	}

	window.location.hash = href.substr( 1 );
	event.preventDefault();
	scrollTo( href );

}
