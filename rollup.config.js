import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

const name = "BarcodeScanner";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: pkg.main,
        format: "cjs"
      },
      {
        file: pkg.module,
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
      file: pkg.unpkg,
      format: "umd"
    },
    plugins: [typescript(), terser()]
  }
];
