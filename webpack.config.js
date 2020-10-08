const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: [
		'@babel/polyfill',
		path.resolve(__dirname, 'themes/simple/javascript/react/index.jsx'),
		path.resolve(__dirname, 'themes/simple/sass/custom.scss')
	],
	output: {
		filename: 'javascript/bundle.js',
		path: path.resolve(__dirname, 'themes/simple')
	},
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.jsx$/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'file-loader',
						options: {
							name: 'css/[name].css'
						}
					},
					{
						loader: 'extract-loader'
					},
					{
						loader: 'css-loader?-url'
					},
					{
						loader: 'sass-loader'
					},
				]
			}
		]
	}
}