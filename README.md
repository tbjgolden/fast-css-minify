# `fast-css-minify`

[![npm version](https://img.shields.io/npm/v/fast-css-minify.svg?style=flat-square)](https://www.npmjs.com/package/fast-css-minify)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/fast-css-minify?style=flat-square)
[![test coverage](https://img.shields.io/badge/dynamic/json?style=flat-square&color=brightgreen&label=coverage&query=%24.total.branches.pct&suffix=%25&url=https%3A%2F%2Funpkg.com%2Ffast-css-minify%2Fcoverage%2Fcoverage-summary.json)](https://www.npmjs.com/package/fast-css-minify)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/tbjgolden/fast-css-minify/Release?style=flat-square)](https://github.com/tbjgolden/fast-css-minify/actions?query=workflow%3ARelease)

A minifier for people who don't use SASS / PostCSS.

- [x] fastest afaik (faster than csso, cssnano)
- [x] fully spec compliant, not just a cheeky regex
- [x] far more readable than pure minified
- [x] after gzip/brotli only 3% larger than csso

## Quickfire examples

```js
const { minify } = require('fast-css-minify')

minify(`
.popover {
  position: absolute;
  top: 0;
  left: 0 /* rtl:ignore */;
  z-index: 1070;
  display: block;
  max-width: 276px;
  font-family: var(--bs-font-sans-serif);
}
`)
// " .popover { position: absolute; top: 0; left: 0 ; z-index: 1070; display: block; max-width: 276px; font-family: var(--bs-font-sans-serif); }\n "
```

## Installation

Note: not yet published

```sh
npm install fast-css-minify --save
# yarn add fast-css-minify
```

## License

MIT

<!-- Original starter readme: https://github.com/tbjgolden/create-typescript-react-library -->
