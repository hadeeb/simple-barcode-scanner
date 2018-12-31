import typescript from "rollup-plugin-typescript";
import { uglify } from "rollup-plugin-uglify";

const name = "BarcodeScanner";

module.exports = {
  input: "src/index.ts",
  output: {
    name: name,
    file: `dist/${name}.js`,
    format: "umd"
  },
  plugins: [typescript(), uglify()]
};
