const config = require( './config' );

module.exports = [ 'dist', 'docs' ].map( name => ( { ...config, ...require( `./${ name }` ) } ) );
