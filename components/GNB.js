import React, { Component } from 'react';
import { Navbar, Button } from 'MDwalks-UI'
import _ from 'lodash'
import Link from 'next/link'


class GNB extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <Navbar>
        <Link href="/paper1"><a><Button variant="primary">Pathway Patterns</Button></a></Link>
        <Link href="/paper2"><a><Button variant="primary">Attention</Button></a></Link>
      </Navbar>
    )
  }
}


export default GNB
