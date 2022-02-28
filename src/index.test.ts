import { minify } from '.'
import fs from 'fs'
import path from 'path'
import { minify as cssoMinify } from 'csso'
import postcss from 'postcss'
import cssNanoMin from 'cssnano'
import litePreset from 'cssnano-preset-lite'
import zlib from 'zlib'

const boarCSS = fs.readFileSync(
  path.join(__dirname, '__fixtures__', 'boar.css'),
  'utf8'
)
const edgeCaseCSS = fs.readFileSync(
  path.join(__dirname, '__fixtures__', 'edgecase.css'),
  'utf8'
)

test('benchmark', () => {
  const simpleStart = Date.now()
  const simple = minify(boarCSS)
  const simpleMinTime = Date.now() - simpleStart
  //
  const cssoStart = Date.now()
  const csso = cssoMinify(boarCSS).css
  const cssoMinTime = Date.now() - cssoStart
  //
  const cssnanoStart = Date.now()
  const cssnano = postcss([
    cssNanoMin({
      preset: litePreset()
    })
  ]).process(boarCSS).css
  const cssnanoMinTime = Date.now() - cssnanoStart
  //
  const simpleLenBr = zlib.brotliCompressSync(simple).toString().length
  const cssoLenBr = zlib.brotliCompressSync(csso).toString().length
  const cssnanoLenBr = zlib.brotliCompressSync(cssnano).toString().length
  //
  console.log({
    startLen: boarCSS.length,
    simpleMinTime,
    simpleLen: simple.length,
    simpleLenBr,
    cssoMinTime,
    cssoLen: csso.length,
    cssoLenBr,
    cssnanoMinTime,
    cssnanoLen: cssnano.length,
    cssnanoLenBr,
    inefficiency: (simpleLenBr - cssoLenBr) / cssoLenBr
  })
})

test('minify makes valid CSS smaller', () => {
  // sanity check
  const startLength = boarCSS.length
  const minified = minify(boarCSS)
  expect(minified.length).not.toBe(0)
  expect(minified.length).toBeLessThan(startLength)
})

// further minifications do not change the resulting
// stylesheet or result in a parsing error
test('minify is stable', () => {
  const onePass = minify(boarCSS)
  const twoPass = minify(onePass)
  expect(onePass).toBe(twoPass)
})

test('minify parses edge cases', () => {
  expect(() => minify(edgeCaseCSS)).not.toThrow()
})
