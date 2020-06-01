export default function triggerKeyup( element, value ) {

	const event = new KeyboardEvent( 'keyup', { key: value } );

	element.dispatchEvent( event );

}
