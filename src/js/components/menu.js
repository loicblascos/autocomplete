import Abstract from '../shared/abstract';

/**
 * Menu component
 *
 * @class Menu
 * @extends Abstract
 */
export default class Menu extends Abstract {

	/**
	 * Initialize Menu component
	 */
	init() {

		this.element = document.createElement( 'div' );
		this.element.className = this.classes.menu;
		this.element.append( this.components.List.element );

		if ( ! ( this.options.menuTarget instanceof HTMLElement ) ) {
			this.options.menuTarget = document.body;
		}
	}

	/**
	 * Destroy Menu component
	 */
	destroy() {

		this.remove();

	}

	/**
	 * Append menu element in DOM
	 */
	append() {

		this.options.menuTarget.append( this.element );
		this.resize();

	}

	/**
	 * Remove menu element from DOM
	 */
	remove() {

		this.element.remove();
		this.element.removeAttribute( 'style' );

	}

	/**
	 * Scroll to selected item in the list
	 * We are currently unable to use scrollIntoView() due to inconsistent behaviour in Edge
	 */
	scroll() {

		const item = this.components.List.getItem();

		if ( ! item ) {
			return;
		}

		const iRect = item.getBoundingClientRect();
		const mRect = this.element.getBoundingClientRect();
		const offset = iRect.top - mRect.top + iRect.height;

		if ( offset > mRect.height ) {
			this.element.scrollTop += offset - mRect.height;
		} else if ( offset < iRect.height ) {
			this.element.scrollTop += offset - iRect.height;
		}
	}

	/**
	 * Resize menu
	 * Use of requestAnimationFrame to prevent to force reflow on blur event
	 *
	 * @return {function(): void} requestAnimationFrame
	 */
	resize = () => requestAnimationFrame( () => {

		const input = this.input.getBoundingClientRect();
		const target = this.target();
		const { style } = this.element;

		style.top = `${ input.bottom - target.top + ( target.top ? 0 : window.pageYOffset ) }px`;
		style.left = `${ input.left - target.left }px`;
		style.width = `${ input.width }px`;

		this.instance.emitEvent( 'onResize', this.element );

	} );

	/**
	 * Get menu target position
	 *
	 * @return {Object} requestAnimationFrame
	 */
	target() {

		const { menuTarget } = this.options;

		if ( menuTarget === document.body ) {
			return { top: 0, bottom: 0, left: 0 };
		}

		return menuTarget.getBoundingClientRect();

	}
}
