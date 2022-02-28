import srcConfig from './config.src'

export default {
  ...srcConfig,
  collectCoverage: false,
  moduleNameMapper: {
    '^../src$': `<rootDir>/dist/fast-css-minify.umd.js`
  }
}
