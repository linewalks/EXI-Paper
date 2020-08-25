import React from 'react';

import dynamic from 'next/dynamic'
import { Heading, variables } from 'MDwalks-UI'

const { colorV1 } = variables


const Pathway = dynamic(() => import('@components/Pathway'))
const CohortList = dynamic(() => import('@components/CohortList'))
const Heatmap = dynamic(() => import('@components/Heatmap'))

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
      <header className="mt40 wrap_1200">
        <Heading size="32" style={{ color: colorV1.$grey10 }}>Patient Identification using Clinical Pathway</Heading>
      </header>
      <section>
        <header className="mt40 wrap_1200">
          <Heading size="25" style={{ color: colorV1.$grey10 }}>Step 1. Find Patterns</Heading>
        </header>
        <CohortList />
        <header className="mt40 wrap_1200">
          <Heading size="25" style={{ color: colorV1.$grey10 }}>Step 2. Merge Patterns</Heading>
        </header>
        <Pathway />
        
        <header className="mt40 wrap_1200">
          <Heading size="25" style={{ color: colorV1.$grey10 }}>Step 5. Exploration Model Attention</Heading>
        </header>
        <Heatmap />
      </section>

    </div>
  )
}

export default PathwayPage
