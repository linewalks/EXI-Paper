import React from 'react';

import dynamic from 'next/dynamic'
import { Heading, variables, Navbar, Button } from 'MDwalks-UI'

const { colorV1 } = variables


const Pathway = dynamic(() => import('@components/Pathway'))
const CohortList = dynamic(() => import('@components/CohortList'))
const GNB = dynamic(() => import('@components/GNB'))

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
      <GNB/>
      <header className="mt40 wrap_1200">
        <Heading size="32" style={{ color: colorV1.$grey10 }}>Pathway Patterns</Heading>
      </header>
      <section>
        <CohortList/>
        <Pathway/>
        
      </section>
      
    </div>
  )
}

export default PathwayPage
