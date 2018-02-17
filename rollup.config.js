
import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';

import path from 'path';

export default [{
  input: 'src/index.js',
  output: {
    file: 'dist/lexy.js',
    format: 'umd',
    name: 'lexy',
    sourcemap: 'inline'
  },
  plugins: [
    buble()
  ]
}, {
  input: 'src/index.js',
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
}, {
  input: 'test/index.js',
  output: {
    file: 'dist/lexy.tests.js',
    format: 'cjs'
  },
  external: [
    'chai', 
    path.resolve('./dist/*')
  ]
}];
