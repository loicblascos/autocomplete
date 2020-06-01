/**
 * Get modulo
 *
 * @function
 * @param {number} index - Index position.
 * @param {number} length - Length to not exceed.
 * @return {number} New index
 */
export function modulo( index, length ) {

	return ( length + ( index % length ) ) % length;

}
