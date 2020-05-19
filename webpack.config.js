const path = require('path');

module.exports = {
    entry: {
        main: './src/index.js',
        demo: './docs/assets/js/demo.js',
        mario:'./docs/assets/js/mario.js'
    },
    output: {
        filename: (pathData) => {
            return (pathData.chunk.name === 'mario' || pathData.chunk.name === 'demo') ? 'docs/assets/js/[name].min.js' : 'dist/[name].min.js';
        },
        path: path.resolve(__dirname, '.'),
    },
};