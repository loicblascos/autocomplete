const Extract = require( 'mini-css-extract-plugin' );
const script = {
	entry: './src/js/index.legacy.js',
	output: {
		filename: '../dist/js/autocomplete.js',
		library: 'AutoComplete',
		libraryTarget: 'umd',
		libraryExport: 'default',
		umdNamedDefine: true,
	},
	plugins: [
		new Extract(
			{
				filename: '../dist/css/autocomplete.css',
			},
		),
	],
};

module.exports = script;
