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
      <header className="wrap_1200">
        <Heading size="30" style={{ color: colorV1.$grey10 }}>
        Boosting Development Process of Deep Learning Model with Visual Analytics for Electronic Health Records
        </Heading>
        <h3>Assumptions: Medical experts would like to predict unplanned cardiovascular surgery.</h3>
      </header>
      <section>
        
        <CohortList />
        
        <Pathway />
        
        
        <Heatmap />
      </section>

    </div>
  )
}

export default PathwayPage