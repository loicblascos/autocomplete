import Abstract from '../shared/abstract';

/**
 * Message component
 *
 * @class Message
 * @extends Abstract
 */
export default class Message extends Abstract {

	/**
	 * Initialize Message component
	 */
	init() {

		this.element = document.createElement( 'span' );
		this.element.className = this.classes.message;
		this.element.setAttribute( 'role', 'status' );
		this.element.setAttribute( 'aria-atomic', true );
		this.element.setAttribute( 'aria-live', 'polite' );
		this.input.before( this.element );

	}

	/**
	 * Destroy Message component
	 */
	destroy() {

		this.remove();

	}

	/**
	 * Remove message element from DOM
	 */
	remove() {

		this.element.remove();

	}

	/**
	 * Set message content
	 *
	 * @param {type} type - Message type to retrieve and to set
	 */
	set( type ) {

		this.element.textContent = this.options.messages[ type ].replace( '%s', this.item.label );

	}
}
