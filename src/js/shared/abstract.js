import Container from './container';

/**
 * All plugin components inherit from this class.
 *
 * @abstract
 * @class Abstract
 */
export default class Abstract {

	/**
	 * Identifier prefix
	 *
	 * @type {string}
	 */
	prefix = '_acplt';

	/**
	 * Abstract constructor
	 *
	 * @param {Object} instance - AutoComplete instance
	 * @param {HTMLElement} instance.element - AutoComplete element
	 */
	constructor( { element } ) {

		this.input = element;
		this.suffix = Container.id( element );

	}

	/**
	 * Get instance from container
	 *
	 * @return {Object} Autocomplete instance
	 */
	get instance() {

		return Container.get( this.input );

	}

	/**
	 * Get component from instance
	 *
	 * @return {Object} Component
	 */
	get components() {

		return this.instance.components;

	}

	/**
	 * Get instance option
	 *
	 * @return {Object} Instance options
	 */
	get options() {

		return this.instance.options;

	}

	/**
	 * Get class name of component
	 *
	 * @return {string[]} Instance classes
	 */
	get classes() {

		return this.options.classes;

	}

	/**
	 * Get unique identifier from instance ID
	 *
	 * @return {string} Instance unique identifier attribute
	 */
	get id() {

		return this.prefix + this.suffix;

	}

	/**
	 * Get items from source
	 *
	 * @return {Object[]} Items
	 */
	get items() {

		return this.instance.items || [];

	}

	/**
	 * Get current item from source
	 *
	 * @return {string[]} Item
	 */
	get item() {

		return this.items[ this.index ] || {};

	}

	/**
	 * Get focused item index in the list
	 *
	 * @return {number} Items
	 */
	get index() {

		return this.instance.index;

	}
}
