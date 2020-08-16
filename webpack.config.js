const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: ['@babel/polyfill', path.resolve(__dirname, 'themes/simple/javascript/react/index.js')],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'themes/simple/javascript')
	},
	mode: 'development',
	module: {
		rules: [
			{
				use: {
					loader: 'babel-loader'
				}
			}
		]
	}
}