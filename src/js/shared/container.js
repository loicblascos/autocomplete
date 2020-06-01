/**
 * Container that holds instances
 *
 * @class Container
 */
class Container {

	/**
	 * Instances counter
	 *
	 * @type {number}
	 */
	count = 0;

	/**
	 * Holds instances
	 *
	 * @type {Map<HTMLElement, object>}
	 */
	instances = new Map();

	/**
	 * Add element instance to container
	 *
	 * @param {HTMLElement} element - Element instantiated
	 * @param {Object} instance - Instance related to the element
	 */
	add( element, instance ) {

		! this.has( element ) && this.instances.set( element, { id: ++this.count, instance } );

	}

	/**
	 * Get instance of an element
	 *
	 * @param {HTMLElement} element - Element to search instance for
	 * @return {Object|boolean} Element instance
	 */
	get( element ) {

		return this.has( element ) && this.instances.get( element ).instance;

	}

	/**
	 * Get instance identifier
	 *
	 * @param {HTMLElement} element - Element to search instance for
	 * @return {number|boolean} Instance identifier
	 */
	id( element ) {

		return this.has( element ) && this.instances.get( element ).id;

	}

	/**
	 * Check if element is instantiated
	 *
	 * @param {HTMLElement} element - Element to search instance for
	 * @return {boolean} Whether instance exists or not
	 */
	has( element ) {

		return this.instances.has( element );

	}

	/**
	 * Remove instance from container
	 *
	 * @param {HTMLElement} element - Element to search instance for
	 */
	remove( element ) {

		this.instances.delete( element );

	}
}

export default new Container();
