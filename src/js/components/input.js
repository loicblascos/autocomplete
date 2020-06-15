import Abstract from '../shared/abstract';

/**
 * Input component
 *
 * @class Input
 * @extends Abstract
 */
export default class Input extends Abstract {

	/**
	 * Initialize Input component
	 */
	init() {

		this.attributes();
		this.wrapper();
		this.label();
		this.wrap();

	}

	/**
	 * Destroy Input component
	 */
	destroy() {

		this.collapse();
		this.attributes( 'remove' );
		this.element.before( this.input );
		this.element.remove();

		if ( this.label.id === `${ this.id }l` ) {
			this.label.removeAttribute( 'id' );
		}
	}

	/**
	 * Set or remove input attributes
	 *
	 * @param {string} method - set or remove attribute method
	 */
	attributes( method = 'set' ) {

		method = `${ method }Attribute`;

		this.input[ method ]( 'autocomplete', 'off' );
		this.input[ method ]( 'aria-autocomplete', this.options.autoComplete ? 'both' : 'list' );

	}

	/**
	 * Create input wrapper
	 */
	wrapper() {

		this.element = document.createElement( 'div' );
		this.element.className = this.classes.wrapper;
		this.element.setAttribute( 'aria-owns', this.id );
		this.element.setAttribute( 'aria-haspopup', 'listbox' );
		this.element.setAttribute( 'aria-expanded', false );

	}

	/**
	 * Get and/or set id attribute
	 */
	label() {

		// Get explicit label.
		this.label = document.querySelector( `label[for="${ this.input.id }"]` );

		// Get implicit label.
		if ( ! this.label ) {
			this.label = this.input.closest( 'label' ) || {};
		}

		// Set id attribute if missing.
		if ( ! this.label.id ) {
			this.label.id = `${ this.id }l`;
		}
	}

	/**
	 * Append wrapper and append input inside it
	 */
	wrap() {

		this.input.before( this.element );
		this.element.append( this.input );

	}

	/**
	 * Expand wrapper when menu is opened
	 */
	expand() {

		this.element.setAttribute( 'aria-expanded', true );
		this.input.setAttribute( 'aria-controls', this.id );
		this.setDescendant();

	}

	/**
	 * collapse wrapper when menu is closed
	 */
	collapse() {

		this.element.setAttribute( 'aria-expanded', false );
		this.input.removeAttribute( 'aria-activedescendant' );
		this.input.removeAttribute( 'aria-controls', this.id );

	}

	/**
	 * Set descendant when list item is focused
	 */
	setDescendant() {

		const index = this.index;
		const value = index === 0 || index > 0 ? `${ this.id }-${ index }` : '';
		const method = value !== '' ? 'set' : 'remove';

		this.input[ `${ method }Attribute` ]( 'aria-activedescendant', value );

	}
}
