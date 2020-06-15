const Extract = require( 'mini-css-extract-plugin' );
const Terser = require( 'terser-webpack-plugin' );
const config = require( './config' );
const lib = {
	entry: './src/js/index.js',
	output: {
		filename: '../lib/index.js',
		library: 'AutoComplete',
		libraryTarget: 'umd',
		libraryExport: 'default',
		umdNamedDefine: true,
	},
	plugins: [
		new Extract(
			{
				filename: '../lib/style.css',
			},
		),
	],
};

const polyfills = {
	entry: './src/js/polyfills/index.js',
	output: {
		filename: '../lib/polyfills.js',
	},
	optimization: {
		minimizer: [
			new Terser(
				{
					extractComments: false,
					terserOptions: {
						output: {
							comments: false,
						},
					},
				},
			),
		],
	},
};

module.exports = [
	{ ...config, ...polyfills },
	{ ...config, ...lib },
];
