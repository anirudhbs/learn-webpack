module.exports = function (content) {
  var res = content.replace(/\/\/.*\n/g, '') // remove comments
  this.callback(null, res)
}
