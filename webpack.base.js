const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
	entry: path.join(__dirname, './src/main.js'),
	output: {
		path: path.join(__dirname, './dist'),
		filename: 'bundle.js',
	},
	plugins: [new VueLoaderPlugin()],
	resolve: {
		extensions: ['.js', '.jsx', '.json', '.css', '.vue'],
		alias: {
			'@': path.join(__dirname, './src'),
		},
	},
	module: {
		rules: [
			{ test: /\.css$/, use: ['style-loader', 'css-loader'] },
			{
				test: /\.less$/,
				use: [
					'style-loader',
					'css-loader',
					'postcss-loader',
					'less-loader',
				],
			},
			{
				test: /\.(png|gif|bmp|jpg|jpeg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							name: '[name].[hash:4].[ext]',
							outputPath: 'assets/img',
							limit: 5000,
						},
					},
				],
			},
			{
				test: /\.ttf|woff2?$/,
				use: ['url-loader'],
			},
			{
				test: /\.jsx?$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.vue$/,
				use: 'vue-loader',
			},
		],
	},
}
