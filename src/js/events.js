/**
 * Handle events
 *
 * @class Events
 */
export default class Events {

	/**
	 * Emit custom "event" callback from options.
	 *
	 * @param {string} type - Event type
	 * @param {*} args - Callback arguments
	 */
	emitEvent( type, ...args ) {

		this.options[ type ] && this.options[ type ].apply( this, args );

	}

	/**
	 * Attach event handlers (addEventListener)
	 */
	addEvents() {

		this.handleEvents( 'add' );

	}

	/**
	 * Detach event handlers (removeEventListener)
	 */
	removeEvents() {

		this.handleEvents( 'remove' );

	}

	/**
	 * Override handleEvent method from EventListener called by the user agent
	 *
	 * @param {Event} event - Event interface
	 */
	handleEvent( event ) {

		this[ `on${ event.type }` ]( event );

	}

	/**
	 * Add or remove event handlers
	 *
	 * @param {string} method - Method type to add or remove listeners
	 */
	handleEvents( method ) {

		method += 'EventListener';

		// Handle component events.
		this.components.Clear.element[ method ]( 'click', this );
		this.components.List.element[ method ]( 'click', this );
		this.components.List.element[ method ]( 'mouseenter', this, true );

		// Handle input events.
		this.element[ method ]( 'keydown', this );
		this.element[ method ]( 'keyup', this );
		this.element[ method ]( 'input', this );
		this.element[ method ]( 'focus', this );
		this.element[ method ]( 'blur', this );

		// Prevent to blur input on list click.
		window[ method ]( 'mousedown', this );
		window[ method ]( 'resize', this );

	}

	/**
	 * Handle click event type
	 * Select item in the list on click
	 *
	 * @param {Event} event - Event interface
	 * @param {EventTarget} event.target - Event interface target property
	 */
	onclick( { target } ) {

		if ( target === this.components.Clear.element ) {

			this.clear();
			this.element.focus();
			return;

		}

		const item = target.closest( 'li' );
		const index = item && item._index;

		( index === 0 || index > 0 ) && this.select( index );

	}

	/**
	 * Handle keydown event type
	 * Trigger method attached to keyMethod object
	 *
	 * @param {Event} event - Event interface
	 */
	onkeydown( event ) {

		const { autoComplete } = this.options;

		switch ( event.key ) {
			case 'Enter':
				this.select( this.index );
				break;
			case 'Esc':
			case 'Escape':
				this.clear();
				break;
			case 'Down':
			case 'ArrowDown':
				this.highlight( this.index === null ? 0 : this.index + 1 );
				autoComplete && this.replace();
				break;
			case 'Up':
			case 'ArrowUp':
				this.highlight( this.index === null ? -1 : this.index - 1 );
				autoComplete && this.replace();
				break;
			default:
				return;
		}

		event.preventDefault();

	}

	/**
	 * Handle keyup event type
	 *
	 * @param {Event} event - Event interface
	 * @param {string} event.key - Event key
	 */
	onkeyup( { key } ) {

		// We check if one character was typed in the input.
		// We use spread operator to prevent issue with non-BMP characters.
		this.options.autoComplete && [ ...key ].length === 1 && this.complete();

	}

	/**
	 * Handle mousedown event type
	 * Prevent to blur if click happens on item list
	 *
	 * @param {Event} event - Event interface
	 */
	onmousedown( event ) {

		const { List, Clear } = this.components;
		const select = event.target.closest( 'ul' ) === List.element;
		const clear = event.target === Clear.element;

		( select || clear ) && event.preventDefault();

	}

	/**
	 * Handle mouseenter event type
	 * Highlight item in the list on mouse enter
	 *
	 * @param {Event} event - Event interface
	 * @param {EventTarget} event.target - Event interface target property
	 * @param {number} event.target._index - Target element index expando
	 */
	onmouseenter( { target: { _index } } ) {

		_index >= 0 && this.index !== _index && this.highlight( _index, false );

	}

	/**
	 * Handle resize event type
	 * Resize menu if opened
	 */
	onresize() {

		this.opened && this.components.Menu.resize();

	}

	/**
	 * Handle input event type
	 * search and open list
	 */
	oninput() {

		this.search( this.element.value );

	}

	/**
	 * Handle focus event type
	 * @see {@link Events#onInput}
	 */
	onfocus() {

		this.components.Message.set( 'input' );
		this.options.autoSearch && this.oninput();

	}

	/**
	 * Handle blur event type
	 * Abort response and close the menu
	 */
	onblur() {

		this.abort();
		this.close();
		this.update();

	}
}
