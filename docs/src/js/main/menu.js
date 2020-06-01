import shouldScroll from './scroll';

const width = parseInt( getComputedStyle( document.body ).getPropertyValue( '--menu-match-media' ), 10 ) || 1250;
const button = document.querySelector( '#menu-control' );
const main = document.querySelector( '#site-main' );
const nav = document.querySelector( '#site-nav' );

addEventListener( 'resize', onResize );
addEventListener( 'click', onClick );

function toggleMenu( open ) {

	button.setAttribute( 'aria-expanded', open );
	nav.classList[ open ? 'add' : 'remove' ]( 'opened' );
	nav.removeAttribute( 'style' );

}

function onClick( event ) {

	const { target } = event;
	const state = button.getAttribute( 'aria-expanded' ) === 'false';
	const handle = button === target || ( target === main && ! state );
	const anchor = ! handle && ( target.tagName === 'A' && target.closest( '#site-nav' ) );

	( handle || anchor ) && toggleMenu( state );
	anchor && shouldScroll( target, event );

}

function onResize() {

	nav.style.transition = 'none';
	window.innerWidth > width && toggleMenu( false );

}
