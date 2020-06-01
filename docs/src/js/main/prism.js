import Clipboard from 'clipboard';
import Prism from 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';

const clipboard = new Clipboard(
	'.copy-btn',
	{
		target: trigger => trigger.previousElementSibling,
	},
);

const clipButton = ( function() {

	const button = document.createElement( 'button' );
	const label = document.createElement( 'span' );

	label.className = 'sr-only';
	label.textContent = 'Copy code';

	button.setAttribute( 'aria-label', 'Copied !' );
	button.className = 'copy-btn';
	button.type = 'button';
	button.innerHTML =
		`<svg fill="none"viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor">
    		<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
		</svg>`;

	button.append( label );

	return button;

} )();

document.querySelectorAll( '.code-wrapper' ).forEach( el => el.append( clipButton.cloneNode( true ) ) );

clipboard.on( 'success', event => {

	const btn = event.trigger.lastChild;

	toggleTooltip( btn, true );
	event.clearSelection();

} );

function toggleTooltip( el, show ) {

	clearTimeout( el.tid );

	el.textContent = show ? 'Copied!' : 'Copy code';
	el.classList[ show ? 'remove' : 'add' ]( 'sr-only' );
	el.tid = setTimeout( () => toggleTooltip( el, false ), 1500 );

}

requestAnimationFrame( () => Prism.highlightAll() );
