
module.exports = {
	entry: './app/js/main.js',
	output: {
		filename: './dist/js/bundle.js'
	},   
	resolve: {
        alias: {
            jquery: "jquery/dist/jquery.min"
        },
    },
	module: {
		rules: [
		    {
			    test: /\.js$/,
			    exclude: /(node_modules|bower_components)/,
			    use: {
			        loader: 'babel-loader',
			        options: {
			        	presets: ['@babel/preset-env']
			        }
			    }
		    }/*,
		    {
		        test: /\.css$/,
		        use: ExtractTextPlugin.extract({
		          fallback: "style-loader",
		          use: "css-loader"
		        })
		      }*/
		]
	}/*,
	plugins: [
		new ExtractTextPlugin("bundle.css"),
	]*/

};
