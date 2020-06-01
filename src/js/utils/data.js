/**
 * Parse data source
 *
 * @class Data
 */
export default class Data {

	/**
	 * Data Constructor
	 *
	 * @param {Object} options - Holds autocomplete options.
	 */
	constructor( options ) {

		this.options = options;

	}

	/**
	 * Parse data
	 *
	 * @param {string} string - String to check with data.
	 * @param {(Object[]|string[])} data - Holds data to parse.
	 * @return {Object[]} Parsed data
	 */
	parse( string = '', data = [] ) {

		this.string = string.trim();
		this.accent = this.hasAccent();
		this.regExp = this.getRegEx( this.string, this.options.regExp );

		this.filter( data );
		this.sort();
		this.slice();
		this.highlight();

		return this.data;

	}

	/**
	 * Check if searched string has accent
	 *
	 * @return {boolean} Whether it has accent or not
	 */
	hasAccent() {

		this.accent = false;

		return (
			this.options.smartAccent &&
			this.normalize( this.string ) !== this.string.toLowerCase()
		);

	}

	/**
	 * Process data
	 *
	 * @param {(Object[]|string[])} data - Data source to filter
	 */
	filter( data ) {

		this.data = data.reduce( ( arr, item ) => {

			item = this.toObject( item );
			this.exists( item ) && arr.push( item );

			return arr;

		}, [] );

	}

	/**
	 * Check if string exist in item label
	 *
	 * @param {string|Object[]} item - Holds item value(s)
	 * @return {Object} - Data object
	 */
	toObject( item ) {

		// Clone existing object.
		if ( typeof item === 'object' ) {
			return { ...item };
		}

		return {
			value: item,
			label: item,
		};

	}

	/**
	 * Check if string exist in item label/value
	 *
	 * @param {Object[]} item - Holds item value and label
	 * @return {boolean} - Whether string exists or not
	 */
	exists( item ) {

		const match = ! this.string || this.normalize( item.label ).match( this.regExp );
		const exists = this.options.filterResults.apply( this, [ !! match, item, this.string ] );

		if ( exists ) {

			item.index = match ? match.index : null;
			item.content = item.label;

		}

		return exists;

	}

	/**
	 * Sort data
	 */
	sort() {

		const { sortResults } = this.options;

		if ( ! this.string || ! ( typeof sortResults === 'function' ) ) {
			return;
		}

		this.data.sort( sortResults );

	}

	/**
	 * Shorten data list
	 */
	slice() {

		const { maxResults } = this.options;

		if ( maxResults > 0 ) {
			this.data = this.data.slice( 0, maxResults );
		}
	}

	/**
	 * highlight items in in data list
	 */
	highlight() {

		const { highlighter, matchAll } = this.options;
		const { length } = this.string;

		if ( ! highlighter || ! length ) {
			return;
		}

		const regExp = matchAll && this.getRegEx( this.string, '($1)', 'gi' );

		this.data.forEach( item => {

			if ( item.index === null ) {
				return;
			}

			const indexes = regExp ? this.matchAll( item.label, regExp ) : [ item.index ];
			const fragment = document.createDocumentFragment();

			item.content = this.wrapAll( item.label, indexes, length, fragment );

		} );
	}

	/**
	 * Match all expression in a string
	 *
	 * @param {string} string - The string against which to match the regular expression
	 * @param {Object} regExp - Regular expression object
	 * @return {number[]} Matched indexes
	 */
	matchAll( string, regExp ) {

		const indexes = [];
		let match;

		string = this.normalize( string );

		while ( ( match = regExp.exec( string ) ) !== null ) {
			indexes.push( match.index );
		}

		return indexes;

	}

	/**
	 * Replace matched substring
	 *
	 * @param {string} string - The string to wrap
	 * @param {number[]} indexes - Holds indexes to wrap/highlight
	 * @param {number} end - The zero-based index at which to end
	 * @param {DocumentFragment} frag - HTML fragment where to append
	 * @return {DocumentFragment} Item content
	 */
	wrapAll( string, indexes, end, frag ) {

		const index = indexes.shift();
		const left = string.slice( 0, index );
		const right = string.slice( index + end );
		const match = string.slice( index, index + end );

		left && frag.append( document.createTextNode( left ) );
		match && frag.append( this.wrapMatch( match ) );

		if ( ! indexes.length ) {
			frag.append( document.createTextNode( right ) );
		} else {
			this.wrapAll( right, indexes.map( i => i - ( index + end ) ), end, frag );
		}

		return frag;

	}

	/**
	 * Append matched string in highlight node
	 *
	 * @param {string} string - The string to wrap
	 * @return {HTMLElement} Highlighted text
	 */
	wrapMatch( string ) {

		const highlighter = this.options.highlighter.cloneNode( false );
		highlighter.textContent = string;

		return highlighter;

	}

	/**
	 * Get regex expression object
	 *
	 * @param {string} string - String used to generate the pattern
	 * @param {string} pattern - Pattern used for the regular expression
	 * @param {string} flags - String used to generate the pattern
	 * @return {Object} Regular expression object
	 */
	getRegEx( string, pattern, flags = 'i' ) {

		// Normalize and escape string.
		string = this.normalize( string );
		string = string.replace( /[-\\^$*+?.()|[\]{}]/g, '\\$&' );

		return new RegExp( pattern.replace( '$1', string ), flags );

	}

	/**
	 * Normalize string
	 *
	 * @param {string} string - String to normalize
	 * @return {string} Normalized string
	 */
	normalize( string ) {

		if ( ! this.accent && String.prototype.normalize ) {

			string = string.normalize( 'NFD' );
			string = string.replace( /[\u0300-\u036f]/g, '' );

		}

		return string.trim().toLowerCase();

	}
}
