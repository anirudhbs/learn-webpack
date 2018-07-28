class HelloWorldPlugin {
  constructor (options) {
    this.options = options
  }

  apply (compiler) {
    // compiler.hooks.tapAsync('HelloWorldPlugin', function (compilation, callback) {
    // var filelist = 'in this build\n\n'
    console.log('\nhello world!\n')
    // })
  }
}

module.exports = HelloWorldPlugin
