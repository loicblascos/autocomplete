import Abstract from '../shared/abstract';

/**
 * Item component
 *
 * @class Item
 * @extends Abstract
 */
export default class Item extends Abstract {

	/**
	 * Create item element
	 */
	createItem() {

		this.node = document.createElement( 'li' );
		this.node.id = `${ this.id }-`;
		this.node.className = this.classes.item;
		this.node.setAttribute( 'role', 'option' );
		this.node.setAttribute( 'aria-selected', false );

	}

	/**
	 * Clone item element
	 *
	 * @param {number} id - Item identifier
	 * @return {HTMLElement} Item
	 */
	cloneItem( id ) {

		const node = this.node.cloneNode( false );
		node.id += id;
		node._index = id;

		return node;

	}

	/**
	 * add item in the list
	 *
	 * @param {Object} item - Current item object from data source
	 * @param {number} id - Current item identifier
	 */
	addItem( item, id ) {

		const node = this.cloneItem( id );

		item = this.options.renderItem( item, node, id );

		if ( item === null ) {
			return;
		}

		if ( typeof item === 'string' ) {
			node.textContent = item;
		} else {
			node.append( item );
		}

		this.list.append( node );

	}

	/**
	 * Get item node from list
	 *
	 * @return {HTMLElement} Current item in the list
	 */
	getItem() {

		return this.element.children[ this.index ];

	}

	/**
	 * Focus current item in the list
	 */
	focusItem() {

		this.setSelected( true );

	}

	/**
	 * Blur current item in the list
	 */
	blurItem() {

		this.setSelected( false );

	}

	/**
	 * Update selected aria attribute of current item in the list
	 *
	 * @param {boolean} state - Selected state
	 */
	setSelected( state ) {

		const item = this.getItem();

		item && item.setAttribute( 'aria-selected', state );

	}
}
