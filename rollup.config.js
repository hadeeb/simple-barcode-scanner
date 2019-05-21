import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";

const name = "BarcodeScanner";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: `dist/index.js`,
        format: "cjs"
      },
      {
        file: `dist/index.module.js`,
        format: "es"
      }
    ],
    plugins: [
      typescript(),
      terser({
        toplevel: true,
        module: true
      })
    ]
  },
  {
    input: "src/index.ts",
    output: {
      name: name,
      file: `dist/${name}.js`,
      format: "umd"
    },
    plugins: [typescript(), terser()]
  }
];
