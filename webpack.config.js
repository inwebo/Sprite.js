const path = require('path');

module.exports = {
    entry: {
        sprites: './src/index.js',
        demo: './docs/docs.js'
    },
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, 'dist'),
    },
};