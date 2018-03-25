
import buble from 'rollup-plugin-buble'

export default {
  input: 'lib/index.js',
  output: {
    file: 'dist/lexy.js',
    format: 'umd',
    name: 'lexy',
    sourcemap: 'inline'
  },
  plugins: [
    buble()
  ]
}
