'use strict';

module.exports = {
    entry: {
        helloworld: './hello-world/index.jsx',
        todolist: './todo-list/index.jsx',
        lifecycle: './life-cycle/index.jsx'
    },
    output: {
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: [
                'react-hot',
                'babel?{presets:["es2015","stage-0","react"],plugins:["transform-decorators-legacy","add-module-exports"]}'
            ],
            exclude: /node_modules/
        }]
    }
};
