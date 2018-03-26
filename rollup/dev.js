
import babel from 'rollup-plugin-babel'

export default {
  input: 'src/index.js',
  output: {
    file: 'lib/lexy.js',
    format: 'umd',
    name: 'lexy',
    sourcemap: 'inline'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
}
