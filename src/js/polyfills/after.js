/* eslint-disable */
// https://developer.mozilla.org/fr/docs/Web/API/ChildNode/after
( function( arr ) {
	arr.forEach( function( item ) {
		if ( item.hasOwnProperty( 'after' ) ) {
			return;
		}
		Object.defineProperty( item, 'after', {
			configurable: true,
			enumerable: true,
			writable: true,
			value: function after() {
				const argArr = Array.prototype.slice.call( arguments ),
					docFrag = document.createDocumentFragment();

				argArr.forEach( function( argItem ) {
					const isNode = argItem instanceof Node;
					docFrag.appendChild( isNode ? argItem : document.createTextNode( String( argItem ) ) );
				} );

				this.parentNode.insertBefore( docFrag, this.nextSibling );
			},
		} );
	} );
} )( [ Element.prototype, CharacterData.prototype, DocumentType.prototype ] );
