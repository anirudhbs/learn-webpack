import React from 'react'
import ReactDOM from 'react-dom'
import x from './moduleA'

ReactDOM.render(x, document.getElementById('root'))

if (module.hot) { // for HMR
  module.hot.accept()
}
