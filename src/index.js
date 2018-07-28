// import moduleA from './moduleA'
// import CSVData from './sample-data.csv'
import React from 'react'
import ReactDOM from 'react-dom'

console.log('hello world!')
console.log('imported moduleA', moduleA)
// console.log('CSV data', CSVData)

console.log(ReactDOM)

import('./moduleA')
  .then(res => {
    console.log('imported module A', moduleA)
  })
  .catch(err => {
    console.error('error', err)
  })
