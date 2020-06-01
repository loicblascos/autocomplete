import Abstract from '../shared/abstract';

/**
 * Clear component
 *
 * @class Clear
 * @extends Abstract
 */
export default class Clear extends Abstract {

	/**
	 * Initialize Clear component
	 */
	init() {

		this.button();
		this.label();
		this.icon();

	}

	/**
	 * Destroy Clear component
	 */
	destroy() {

		this.remove();

	}

	/**
	 * Create button element
	 */
	button() {

		this.element = document.createElement( 'button' );
		this.element.className = this.classes.clear;
		this.element.type = 'button';

	}

	/**
	 * Create and append label in button for accessibility
	 */
	label() {

		const label = document.createElement( 'span' );

		label.textContent = this.options.clearLabel;
		this.element.append( label );

	}

	/**
	 * Create and append SVG icon in button
	 */
	icon() {

		const uri = 'http://www.w3.org/2000/svg';
		const svg = document.createElementNS( uri, 'svg' );
		const path = document.createElementNS( uri, 'path' );

		path.setAttribute( 'd', this.options.clearShape );
		svg.setAttribute( 'viewBox', `0 0 20 20` );
		svg.setAttribute( 'aria-hidden', true );
		svg.setAttribute( 'focusable', false );
		svg.appendChild( path );

		this.element.append( svg );

	}

	/**
	 * Append button element in DOM
	 */
	append() {

		! this.element.parentNode && this.input.after( this.element );

	}

	/**
	 * Remove button element from DOM
	 */
	remove() {

		this.element.remove();

	}
}
