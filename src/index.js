//render React
import React, { Component } from 'react'
import { render } from 'react-dom'

export default class App extends Component {

  render () {
    return <hr />
  }
};

const root = document.getElementById('root');
render(<App />, root);