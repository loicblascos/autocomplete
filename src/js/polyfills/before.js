/* eslint-disable */
// https://developer.mozilla.org/fr/docs/Web/API/ChildNode/before
( function( arr ) {
	arr.forEach( function( item ) {
		if ( item.hasOwnProperty( 'before' ) ) {
			return;
		}
		Object.defineProperty( item, 'before', {
			configurable: true,
			enumerable: true,
			writable: true,
			value: function before() {
				const argArr = Array.prototype.slice.call( arguments ),
					docFrag = document.createDocumentFragment();

				argArr.forEach( function( argItem ) {
					const isNode = argItem instanceof Node;
					docFrag.appendChild( isNode ? argItem : document.createTextNode( String( argItem ) ) );
				} );

				this.parentNode.insertBefore( docFrag, this );
			},
		} );
	} );
} )( [ Element.prototype, CharacterData.prototype, DocumentType.prototype ] );
