const path = require('path');

module.exports = {
    entry: {
        main:  './src/index.js',
        demo:  './docs/demo.js',
        mario: './docs/mario.js'
    },
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, 'dist'),
    },
};