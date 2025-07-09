// rollup.config.cjs
const typescript = require("rollup-plugin-typescript2");
const pkg = require("./package.json");
const peers = Object.keys(pkg.peerDependencies || {});

module.exports = [
  // 1) Multi-entry para CJS e ES (code splitting)
  {
    input: {
      index: "src/index.ts",
      angular: "src/angular/index.ts",
      react: "src/react/index.ts",
    },
    external: peers,
    output: [
      {
        dir: "dist",
        entryFileNames: "[name]/index.cjs.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        dir: "dist",
        entryFileNames: "[name]/index.esm.js",
        format: "es",
        sourcemap: true,
      },
    ],
    plugins: [typescript({ tsconfig: "./tsconfig.json" })],
  },

  // 2) Single-entry para UMD (apenas root)
  {
    input: "src/index.ts",
    external: peers,
    output: {
      file: "dist/index.umd.js",
      format: "umd",
      name: "EventBus",
      globals: {
        mitt: "mitt",
        react: "React",
        "@angular/core": "ng.core",
        "@angular/common": "ng.common",
      },
      sourcemap: true,
    },
    plugins: [typescript({ tsconfig: "./tsconfig.json" })],
  },
];
