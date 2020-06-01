import Abstract from '../shared/abstract';

/**
 * Loader component
 *
 * @class Loader
 * @extends Abstract
 */
export default class Loader extends Abstract {

	/**
	 * Initialize Loader component
	 */
	init() {

		this.element = document.createElement( 'div' );
		this.element.className = this.classes.loader;

		[ 1, 2, 3 ].forEach( () => this.element.appendChild( document.createElement( 'span' ) ) );

	}

	/**
	 * Destroy Loader component
	 */
	destroy() {

		this.remove();

	}

	/**
	 * Append loader element in DOM
	 */
	append() {

		! this.element.parentNode && this.input.after( this.element );

	}

	/**
	 * Remove loader element from DOM
	 */
	remove() {

		this.element.remove();

	}
}
