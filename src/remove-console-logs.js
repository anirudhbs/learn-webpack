module.exports = function (content) {
  const res = content.replace(/console\.log\n/g, '')
  this.callback(null, res)
}
