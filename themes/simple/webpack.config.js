const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: './src/entry.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
}