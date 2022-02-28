import srcConfig from './config.src'

module.exports = {
  ...srcConfig,
  collectCoverage: false,
  moduleNameMapper: {
    '^../src$': `<rootDir>/dist/fast-css-minify.esm.js`
  }
}
