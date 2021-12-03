class WasmSandbox {
  constructor (sourceCode) {
    this.sourceCode = sourceCode
    this.module = undefined
    this.instance = undefined
  }

  async run () {
    const {instance, module} = await WebAssembly.instantiate(this.sourceCode)
    this.instance = instance
    this.module = module
  }
}