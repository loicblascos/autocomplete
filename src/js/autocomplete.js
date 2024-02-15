import * as Components from './components';
import { modulo } from './utils/modulo';
import { defaults } from './defaults';
import Container from './shared/container';
import Events from './events';
import Data from './utils/data';

/**
 * Core AutoComplete library
 *
 * @class AutoComplete
 * @extends Events
 */
export default class AutoComplete extends Events {

	/**
	 * Default components
	 *
	 * @type {Object.<string, Object>} components
	 */
	components = {};

	/**
	 * AutoComplete Constructor
	 *
	 * @param {HTMLElement} element - Input to autocomplete.
	 * @param {Object.<string, *>} options - Holds autocomplete options.
	 * @return {Object} Instance
	 */
	constructor( element, options = {} ) {

		super();

		this.element = element;
		this.options = { ...defaults, ...options };

		// Return main instance if it exists.
		if ( Container.has( element ) ) {
			return Container.get( element );
		}

		Container.add( element, this );
		this.create();

	}

	/**
	 * Instantiate all components
	 * Setup input and attach all events
	 */
	create() {

		this.Data = new Data( this.options );
		this.items = [];
		this.index = null;
		this.opened = false;
		this.loading = false;

		// Init all components.
		for ( const name in Components ) {

			this.components[ name ] = new Components[ name ]( this );
			this.components[ name ].init();

		}

		this.update();
		this.addEvents();

	}

	/**
	 * Destroy all instances of components
	 * Detach all events and restore input
	 */
	destroy() {

		const { element, components } = this;
		const isActive = document.activeElement === element;

		// If already destroyed.
		if ( ! Container.has( element ) ) {
			return;
		}

		this.removeEvents();
		// Destroy all components.
		Object.keys( components ).filter( name => components[ name ].destroy() );
		// Remove instance from container.
		Container.remove( element );
		// Focus input if it was focused before to destroy its instance.
		isActive && element.focus();

	}

	/**
	 * Enable autocomplete input
	 */
	enable() {

		if ( ! this.element.disabled ) {
			return;
		}

		this.element.disabled = false;

		this.update();

	}

	/**
	 * Disable autocomplete input
	 */
	disable() {

		if ( this.element.disabled ) {
			return;
		}

		this.element.disabled = true;

		this.abort();
		this.close();
		this.update();

	}

	/**
	 * Update input state
	 * Append or remove loader/clear button
	 */
	update() {

		const { disabled, value } = this.element;
		const { clearable, loader } = this.options;
		const canLoad = loader && ! disabled && this.loading === true;
		const canClear = clearable && ! canLoad && ! disabled && value.length > 0;

		this.components.Clear[ canClear ? 'append' : 'remove' ]();
		this.components.Loader[ canLoad ? 'append' : 'remove' ]();

	}

	/**
	 * Open autocomplete menu
	 * Expand and append menu component
	 */
	open() {

		if ( this.opened || ! this.items.length ) {
			return;
		}

		this.components.Message.set( 'open' );
		this.components.Input.expand();
		this.components.Menu.append();
		this.opened = true;

		this.emitEvent( 'onOpen' );

	}

	/**
	 * Close autocomplete menu
	 * Collapse and remove menu component
	 */
	close() {

		if ( ! this.opened ) {
			return;
		}

		this.components.Input.collapse();
		this.components.Menu.remove();
		this.opened = false;

		this.emitEvent( 'onClose' );

	}

	/**
	 * Clear autocomplete input
	 * Close menu component or trigger search if needed
	 */
	clear() {

		const { autoSearch, minLength } = this.options;
		const isActive = document.activeElement === this.element;

		if ( this.element.value === '' ) {
			return;
		}

		this.element.value = '';
		this.components.Message.set( 'clear' );
		this.emitEvent( 'onClear' );
		this.abort();

		// We need to search for all results in this case.
		if ( isActive && autoSearch && minLength < 1 ) {
			this.search();
		} else {
			this.depopulate();
		}
	}

	/**
	 * Select an item from opened menu
	 *
	 * @param {number} index - Item index to select.
	 */
	select( index = 0 ) {

		const item = this.items[ index ];

		if ( item && this.opened ) {

			this.element.value = item.value;

			this.highlight( index, false );
			this.emitEvent( 'onSelect', item );
			this.components.Message.set( 'select' );

		}

		this.close();
		this.update();

	}

	/**
	 * Search a value in source
	 *
	 * @param {string} value - Value to search for.
	 */
	search( value = '' ) {

		const { source, minLength } = this.options;
		const method = typeof source === 'function' ? 'load' : 'response';

		this.abort();

		// We trim left value to test against minLength.
		if ( value.replace( /^\s+/, '' ).length < minLength ) {

			this.depopulate();
			return;

		}

		this.loading = true;
		this.emitEvent( 'onSearch', value );
		this[ method ]( value, source );

	}

	/**
	 * Handle custom source callback
	 *
	 * @param {string} value - Value to search for.
	 */
	load( value = '' ) {

		this.depopulate();
		this.components.Message.set( 'loading' );
		this.emitEvent( 'source', value, this.response.bind( this, value ) );

	}

	/**
	 * Abort custom source callback
	 */
	abort() {

		if ( ! this.loading ) {
			return;
		}

		this.loading = false;
		this.emitEvent( 'onAbort' );

	}

	/**
	 * Handle response after a search
	 *
	 * @param {string} value - Value to search for.
	 * @param {(Object.<string, string>|string[])} data - Holds source data to search in.
	 */
	response( value, data ) {

		// To prevent issue with asynchronous response.
		if ( this.loading === false ) {
			return;
		}

		this.loading = false;
		this.populate( value, data );

		if ( this.items.length ) {
			this.open();
		} else {

			this.components.Message.set( 'noResults' );
			this.close();

		}

		this.update();

	}

	/**
	 * Populate list of suggestions
	 *
	 * @param {string} value - Value to search for.
	 * @param {(Object.<string, string>|string[])} data - Holds source data to search in.
	 */
	populate( value, data ) {

		this.index = this.options.autoFocus ? 0 : null;
		this.items = this.Data.parse( value, data );

		this.components.List.populate();
		this.components.List.focusItem();

	}

	/**
	 * Depopulate list of suggestions
	 */
	depopulate() {

		this.close();
		this.update();
		this.populate();

	}

	/**
	 * Highlight item in results list
	 *
	 * @param {number} index - Index of the item to highlight in the list.
	 * @param {boolean} scroll - Whether to scroll list to selected item.
	 */
	highlight( index = 0, scroll = true ) {

		if ( ! this.opened || index === this.index ) {
			return;
		}

		this.components.List.blurItem();
		this.index = modulo( index, this.items.length );
		this.components.List.focusItem();
		this.components.Input.setDescendant();
		scroll && this.components.Menu.scroll();

		this.emitEvent( 'onHighlight', this.items[ this.index ] );

	}

	/**
	 * Complete input value with first item in the list
	 */
	complete() {

		if ( ! this.items.length ) {
			return;
		}

		const { value } = this.element;
		const { label } = this.items[ 0 ];
		const newValue = value + label.substring( value.length - value.search( /\S/ ) );
		const stdLabel = this.Data.normalize( label );

		if ( this.Data.normalize( value ) !== stdLabel && this.Data.normalize( newValue ) === stdLabel ) {

			this.element.value = newValue;
			this.element.setSelectionRange( value.length, newValue.length );

		}
	}

	/**
	 * Replace input value with current selected item in the list
	 */
	replace() {

		if ( ! this.items.length ) {
			return;
		}

		this.element.value = this.items[ this.index ].label;
		this.update();

	}
}
