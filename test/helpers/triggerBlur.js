export default function triggerBlur( element ) {

	const eventType = 'onfocusout' in element ? 'focusin' : 'blur';
	const bubbles = 'onfocusout' in element;
	const event = new Event( eventType, { bubbles: bubbles, cancelable: true } );

	element.blur();
	element.dispatchEvent( event );

}
