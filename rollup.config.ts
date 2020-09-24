import commonjs from "rollup-plugin-commonjs"
import sourceMaps from "rollup-plugin-sourcemaps"
import typescript from "rollup-plugin-typescript2"
import { terser } from "rollup-plugin-terser";

const pkg = require("./package.json")

export default {
    input: `src/index.ts`,
    external: ["vue"],
    output: [
        {file: pkg.main, format: "cjs", sourcemap: true},
        {file: pkg.module, format: "esm", sourcemap: true},
        {file: pkg.browser, name: "EchoLink", format: "umd", sourcemap: true},
    ],
    watch: {
        include: 'src/**',
    },
    plugins: [
        // Compile TypeScript files
        typescript({useTsconfigDeclarationDir: true}),

        // Allow bundling cjs modules
        commonjs(),

        // Resolve source maps to the original source
        sourceMaps(),

        // Minify the bundle
        terser()
    ],
}