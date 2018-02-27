const fs = require("fs");
const path = require( "path" );
const webpack = require( "webpack" );
const ExtractTextPlugin = require( "extract-text-webpack-plugin" );
const Pug = require( "pug" );
const appPath = path.join( __dirname, "app" );
const buildPath = path.join( __dirname, "build" );

console.log( "starting" );

function PugBuildPlugin( callback ) {
    console.log( "making pugin" );
    this.callback = callback;
};
PugBuildPlugin.prototype.apply = function(  compiler ) {
    let self = this;
    compiler.plugin( "done", function() {
        var fn = Pug.compileFile( path.join( appPath, "views", "index.pug" ) );
        var schemsData = fs.readFile( "./data.json", ( error, data ) => {
            let parsed = {};
            if( !error ) {
                try {
                    parsed = JSON.parse( data );
                }
                catch( error ) {
                    console.log( "Error:" );
                    console.log( error );
                    parsed = {};
                }
            }
            else {
                console.log( "Error:" );
                console.log( error );
            }
            var html = fn( parsed );
            fs.writeFileSync( path.join( buildPath, "/index.html" ), html );
            console.log( "writing file" );
            self.callback( "Its done" );
        });
    });
};

let webpackConfig = {
    context: path.join( __dirname, "/app" ),
    entry: {
        index: "./scripts/index.js"
    },
    output: {
        filename: "js/[name].bundle.js",
        path: buildPath,
        publicPath: path.join( buildPath, "../" )
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            use: [{
                loader: "babel-loader",
                options: {
                    presets: ["es2015"]
                }
            }],
            exclude: /node_modules/
        }, {
            test: /\.s?css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader?sourceMap", "sass-loader?sourceMap"],
                publicPath: "../"
            })
        }, {
            test: /\.(gif|jpg|jpeg|png|svg)$/,
            loader: `file-loader?name=img/[name].[ext]`,
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            loader: `file-loader?name=fonts/[name].[ext]`,
        }, {
            test: /\.pug?$/,
            loader: "text-loader"
        }]
    },
    plugins: [
        new ExtractTextPlugin( "./css/[name].bundle.css" ),
        new PugBuildPlugin(function( message ) {
            console.log( message );
            console.log( "this is happening" );
        })
    ]
};

module.exports = webpackConfig;
