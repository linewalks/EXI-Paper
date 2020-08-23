import React from 'react';

import dynamic from 'next/dynamic'
import { Heading, variables, Navbar, Button } from 'MDwalks-UI'

const { colorV1 } = variables


const Pathway = dynamic(() => import('@components/Pathway'))
const CohortList = dynamic(() => import('@components/CohortList'))


const PathwayPage = () => {

  return (
    <div>
      <style global jsx>
        {`
          div#__next{
            background-color: ${colorV1.$grey01}
          }
        `}
      </style>
      <Navbar>
        <Button variant="primary" onClick={() => console.log('Clicked button1.')}>Pathway</Button>
        <Button onClick={() => console.log('Clicked button2.')}>Attention</Button>
      </Navbar>
      <header className="mt40 wrap_1200">
        <Heading size="32" style={{ color: colorV1.$grey10 }}>Cohort Pathway</Heading>
      </header>
      <section>
        <CohortList/>
        <Pathway/>
        
      </section>
      
    </div>
  )
}

export default PathwayPage
