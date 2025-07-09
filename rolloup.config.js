import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

export default {
  input: "src/index.ts",
  output: [
    { file: pkg.main, format: "cjs", sourcemap: true },
    { file: pkg.module, format: "es", sourcemap: true },
    { file: pkg.browser, format: "umd", name: "MfeEventBus", sourcemap: true },
  ],
  external: ["mitt"],
  plugins: [typescript({ tsconfig: "./tsconfig.json" })],
};
