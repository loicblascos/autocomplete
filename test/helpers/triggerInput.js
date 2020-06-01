export default function triggerInput( element, value ) {

	const event = new Event( 'input', { bubbles: true, cancelable: true } );

	element.value = value;
	element.dispatchEvent( event );

}
