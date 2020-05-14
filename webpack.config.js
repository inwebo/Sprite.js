const path = require('path');

module.exports = {
    entry: {
        sprites: './src/index.js',
        demo: './demo/demo.js'
    },
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, 'dist'),
    },
};