const { minify } = require('../dist/index')
const fs = require('fs')
const path = require('path')
const zlib = require('zlib')
const csso = require('csso')

const brLen = (str) => zlib.brotliCompressSync(str).toString().length

const bootstrap = fs.readFileSync(
  path.join(__dirname, '../src/__fixtures__/bootstrap.css'),
  'utf8'
)
const boar = fs.readFileSync(
  path.join(__dirname, '../src/__fixtures__/boar.css'),
  'utf8'
)

console.log(minify(bootstrap))
console.log(
  'bootstrap',
  bootstrap.length,
  brLen(minify(bootstrap)),
  'vs',
  brLen(csso.minify(bootstrap).css)
)
console.log(
  'boar',
  boar.length,
  brLen(minify(boar)),
  'vs',
  brLen(csso.minify(boar).css)
)
