var devMode = (process.env.NODE_ENV !== "production");
if (devMode)
{
    const arg = process.argv[process.argv.length - 1];
    if (arg && arg.trim() === "-p")
    {
        devMode = false;
    }
}

const fs = require("fs");
const path = require("path");

const webpack = require("webpack");

// NOTE: All the paths defined in plugins are related to output.path.
const plugins = [
    new webpack.ProvidePlugin({
        "$": "jquery",
        "jQuery": "jquery",
        "mx": "mx6"
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        filename: "./vendor/vendor.js",
        minChunks: Infinity
    })
];


if (!devMode)
{
    plugins.push(function() {
        this.plugin("done", function(stats) {
            fs.writeFileSync(
                path.join(__dirname, "./assets/build.json"),
                JSON.stringify({
                    hash: stats.hash,
                    time: new Date().toString(),
                    timestamp: new Date() * 1
                })
            );
        });
    });
}


module.exports = {
    // This is the root of client source codes.
    context: path.join(__dirname, "./src"),
    entry: {
        vendor: [
            "jquery",
            "mx6"
        ],
        me: "./me"
    },
    output: {
        // webpack-dev-server will server output.path as output.publicPath
        path: path.join(__dirname, "./assets/"),
        publicPath: "/assets/",
        filename: "[name]/[name].js",
        chunkFilename: "[id]/[id].js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    plugins: plugins
};
