export default function triggerKeydown( element, value ) {

	const event = new KeyboardEvent( 'keydown', { key: value } );

	element.dispatchEvent( event );

}
