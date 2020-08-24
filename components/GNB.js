import React, { Component } from 'react';
import { Navbar, Button } from 'MDwalks-UI'
import _ from 'lodash'


class GNB extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    function handleClick(path) {
      console.log('move to', path)
    }
    return (
      

      <Navbar>

        <Button onClick={() => handleClick('/paper1')}>Pathway</Button>
        <Button onClick={() => handleClick('/paper2')}>Attention</Button>
      </Navbar>
    )
  }
}


export default GNB
