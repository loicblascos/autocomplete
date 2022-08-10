const Extract = require( 'mini-css-extract-plugin' );
const Terser = require( 'terser-webpack-plugin' );
const webpack = require( 'webpack' );
const path = require( 'path' );
const isDev = process.argv.includes( '--watch' );
const config = {
	mode: isDev ? 'development' : 'production',
	context: path.resolve( __dirname, '..' ),
	devtool: isDev && 'source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.ejs$/i,
				use: [ 'html-loader', 'template-ejs-loader' ],
			},
			{
				test: /\.s?css$/,
				use: [
					{
						loader: Extract.loader,
					},
					{
						loader: 'css-loader',
						options: {
							url: false,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							postcssOptions: {
								plugins: [
									require( 'autoprefixer' ),
								],
							},
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},

				],
				exclude: /node_modules/,
			},
		],
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
			new webpack.BannerPlugin(
				{
					banner: [
						'AutoComplete',
						'',
						'@package   AutoComplete',
						'@author    Loïc Blascos',
						'@link      https://loicblascos.github.io/autocomplete/',
						'@copyright 2022 Loïc Blascos',
					].join( '\n' ),
				},
			),
		],
	},
};

module.exports = config;
