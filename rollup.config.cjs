// rollup.config.cjs
const typescript = require("rollup-plugin-typescript2");
const pkg = require("./package.json");

const externals = Object.keys(pkg.peerDependencies || {});
const globals = {
  mitt: "mitt",
  react: "React",
  "@angular/core": "ng.core",
  "@angular/common": "ng.common",
};

module.exports = {
  input: "src/index.ts",
  external: externals,
  output: [
    { file: pkg.main, format: "cjs", sourcemap: true },
    { file: pkg.module, format: "es", sourcemap: true },
    {
      file: pkg.browser,
      format: "umd",
      name: "EventBus",
      globals,
      sourcemap: true,
    },
  ],
  plugins: [typescript({ tsconfig: "./tsconfig.json" })],
};
