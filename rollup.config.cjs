const typescript = require("rollup-plugin-typescript2");
const pkg = require("./package.json");
module.exports = {
  input: "src/index.ts",
  external: ["mitt"],
  output: [
    { file: pkg.main, format: "cjs", sourcemap: true },
    { file: pkg.module, format: "es", sourcemap: true },
  ],
  plugins: [typescript({ tsconfig: "./tsconfig.json" })],
};
