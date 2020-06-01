module.exports = function( api ) {

	! api.env( 'test' ) && api.cache( true );

	return {
		plugins: [
			[ '@babel/plugin-proposal-class-properties' ],
			[
				'@babel/plugin-transform-runtime',
				{
					useESModules: true,
					version: '^7.9.0',
				},
			],
		],
		presets: [
			[
				'@babel/preset-env',
			],
		],
	};
};
