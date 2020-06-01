/* eslint-disable */
// https://developer.mozilla.org/fr/docs/Web/API/ChildNode/remove
( function( arr ) {
	arr.forEach( function( item ) {
		if ( item.hasOwnProperty( 'remove' ) ) {
			return;
		}
		Object.defineProperty( item, 'remove', {
			configurable: true,
			enumerable: true,
			writable: true,
			value: function remove() {
				if ( this.parentNode !== null ) this.parentNode.removeChild( this );
			},
		} );
	} );
} )( [ Element.prototype, CharacterData.prototype, DocumentType.prototype ] );
