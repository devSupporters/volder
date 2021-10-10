import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import pkg from "./package.json";

const banner = `
/**
 * @license
 * author: ${pkg.author}
 * ${pkg.moduleName}.js v${pkg.version}
 * Released under the ${pkg.license} license.
 */
`;
export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.cjs.js',
    format: 'cjs',
    exports: 'default',
    banner
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled'
    }),
    nodeResolve(),
    commonjs(),
    terser()
  ]
};
