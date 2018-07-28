const csvToJson = require('csvtojson')

module.exports = function (content) {
  const callback = this.async() // allows for async operations
  csvToJson().fromString(content)
    .then(res => {
      callback(null, 'module.exports=' + JSON.stringify(res))
    })
}
