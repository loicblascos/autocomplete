const Extract = require( 'mini-css-extract-plugin' );
const HTML = require( 'html-webpack-plugin' );
const path = require( 'path' );
const docs = {
	entry: './docs/src/js/index.js',
	resolve: {
		alias: {
			'@loicblascos/autocomplete/lib/polyfills': path.resolve( __dirname, '../src/js/polyfills/' ),
			'@loicblascos/autocomplete/lib/style.css': path.resolve( __dirname, '../src/scss/style.scss' ),
			'@loicblascos/autocomplete': path.resolve( __dirname, '../src/js/' ),
		},
	},
	output: {
		filename: '../docs/dist/js/docs.js',
	},
	plugins: [
		new Extract(
			{
				filename: '../docs/dist/css/docs.css',
			},
		),
		new HTML(
			{
				template: './docs/src/ejs/index.ejs',
				filename: '../docs/index.html',
				inject: false,
				minify: {
					removeComments: true,
					collapseWhitespace: true,
				},
			},
		),
	],
};

module.exports = docs;
