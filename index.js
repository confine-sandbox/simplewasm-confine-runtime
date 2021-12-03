const fs = require('fs').promises
const util = require('util')
const AbstractConfineRuntime = require('abstract-confine-runtime')

module.exports = class SimpleWasmConfineRuntime extends AbstractConfineRuntime {
  constructor (sourcePath, opts) {
    super(sourcePath, opts)
    this.scriptSource = undefined
    this.module = undefined
    this.instance = undefined
  }

  async init () {
    this.scriptSource = await fs.readFile(this.sourcePath)
    const memory = new WebAssembly.Memory({initial: 1})
    const res = await WebAssembly.instantiate(this.scriptSource, {
      js: {
        memory,
        println: (offset, length) => {
          const string = decodeWasmString(memory, offset, length)
          console.log(string)
        }
      }
    })
    this.module = res.module
    this.instance = res.instance
  }

  async run () {
    this.instance.exports.main(16)
  }

  async close () {
  }
}

function decodeWasmString (memory, offset, length) {
  const bytes = new Uint8Array(memory.buffer, offset, length)
  return new util.TextDecoder("utf-8").decode(bytes)
}