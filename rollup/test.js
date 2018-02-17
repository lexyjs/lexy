
import buble from 'rollup-plugin-buble';
import path from 'path';

export default {
  input: 'test/index.js',
  output: {
    file: 'dist/lexy.tests.js',
    format: 'cjs'
  },
  plugins: [
    buble()
  ],
  external: [
    'chai', 
    path.resolve('./dist/*')
  ]
};
