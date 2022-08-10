module.exports = function( api ) {

	const config = {
		plugins: [
			[ '@babel/plugin-proposal-class-properties' ],
		],
		presets: [
			[
				'@babel/preset-env',
			],
		],
	};

	if ( ! api.env( 'test' ) ) {

		api.cache( true );
		config.plugins.push(
			[
				'@babel/plugin-transform-runtime',
				{
					useESModules: true,
					version: '^7.9.0',
				},
			],
		);
	}

	return config;
};
