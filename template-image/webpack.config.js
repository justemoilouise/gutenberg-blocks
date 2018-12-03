let webpack = require( 'webpack' ),
	NODE_ENV = process.env.NODE_ENV || 'development',
	webpackConfig = {
		entry: './block.js',
		output: {
			path: __dirname,
			filename: 'block.build.js',
		},
		module: {
			rules: [
				{
					test: /.js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
					}
				},
			],
		},
		plugins: [
			new webpack.DefinePlugin( {
				'process.env.NODE_ENV': JSON.stringify( NODE_ENV ),
			} ),
		],
	};

module.exports = webpackConfig;