const Optimize = require( 'optimize-css-assets-webpack-plugin' );
const Extract = require( 'mini-css-extract-plugin' );
const Terser = require( 'terser-webpack-plugin' );
const Prefixer = require( 'autoprefixer' );
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
				test: /\.ejs$/,
				use: 'ejs-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.s?css$/,
				use: [
					{
						loader: Extract.loader,
						options: {
							minimize: true,
						},
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
							plugins: [ new Prefixer( { grid: true } ) ],
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
			new Optimize(),
			new webpack.BannerPlugin(
				{
					banner: [
						'AutoComplete',
						'',
						'@package   AutoComplete',
						'@author    Loïc Blascos',
						'@link      https://loicblascos.github.io/autocomplete/',
						'@copyright 2020 Loïc Blascos',
					].join( '\n' ),
				},
			),

		],
	},
};

module.exports = config;
