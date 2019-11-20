const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: path.resolve(__dirname, 'themes/simple/javascript/react/index.js'),
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'themes/simple/javascript')
	},
	mode: 'development'
}