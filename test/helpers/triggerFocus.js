export default function triggerFocus( element ) {

	const eventType = 'onfocusin' in element ? 'focusin' : 'focus';
	const bubbles = 'onfocusin' in element;
	const event = new Event( eventType, { bubbles: bubbles, cancelable: true } );

	element.focus();
	element.dispatchEvent( event );

}
