const ava = require('ava')
const {join} = require('path')
const SimpleWasmConfineRuntime = require('../index.js')

ava('Fizzbuzz', async t => {
  const runtime = new SimpleWasmConfineRuntime(join(__dirname, 'programs', 'fizzbuzz.wasm'))
  await runtime.init()
  await runtime.run()
  t.pass()
})