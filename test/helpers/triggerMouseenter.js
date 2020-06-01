export default function triggerMouseenter( element ) {

	const event = new MouseEvent( 'mouseenter', { view: window, bubbles: true, cancelable: true } );

	element.dispatchEvent( event );

}
