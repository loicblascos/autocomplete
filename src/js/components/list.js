import Item from './Item';

/**
 * List component
 *
 * @class List
 * @extends Item
 */
export default class List extends Item {

	/**
	 * Initialize List component
	 */
	init() {

		this.element = document.createElement( 'ul' );
		this.element.id = this.id;
		this.element.className = this.classes.list;
		this.element.setAttribute( 'aria-labelledby', this.components.Input.label.id );
		this.element.setAttribute( 'role', 'listbox' );

	}

	/**
	 * Destroy List component
	 */
	destroy() {

		this.depopulate();
		this.element.remove();

	}

	/**
	 * Populate list from parsed data
	 */
	populate() {

		this.list = document.createDocumentFragment();

		this.depopulate();
		this.createItem();
		this.items.forEach( this.addItem, this );
		this.element.append( this.list );

	}

	/**
	 * Remove each child from the list
	 */
	depopulate() {

		while ( this.element.firstChild ) {
			this.element.firstChild.remove();
		}
	}
}
