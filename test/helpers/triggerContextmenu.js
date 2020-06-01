export default function triggerContextmenu( element ) {

	element.dispatchEvent( new CustomEvent( 'contextmenu' ) );

}
