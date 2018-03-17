
import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';

export default {
  input: 'lib/index.js',
  output: {
    file: 'dist/lexy.min.js',
    format: 'umd',
    name: 'lexy',
    sourcemap: true
  },
  plugins: [
    buble(),
    uglify()
  ]
};
