const path = require('path');

module.exports = {
    entry: {
        main: './src/index.js',
        demo:    './docs/demo.js',
        mario:   './docs/mario.js'
    },
    output: {
        filename: (pathData) => {
            return (pathData.chunk.name === 'mario' || pathData.chunk.name === 'demo') ? 'docs/[name].min.js' : 'dist/[name].min.js';
        },
        path: path.resolve(__dirname, '.'),
    },
};