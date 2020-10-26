import React from 'react';

import dynamic from 'next/dynamic'
import { Heading, variables } from 'MDwalks-UI'

const { colorV1 } = variables


const Pathway = dynamic(() => import('@components/Pathway'))
const CohortList = dynamic(() => import('@components/CohortList'))
const Heatmap = dynamic(() => import('@components/Heatmap'))
const Treemap = dynamic(() => import('@components/Treemap'))

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
        <h2>Abstract</h2>
        <h3>Electronic health record (EHR) data is widely used to predict early diagnosis and make a treatment plan, which are key areas of research. We aimed to increase the efficiency of iteratively applying data-intensive technology and verifying the results for complex and big EHR data. We used a system of sequence mining, interpretable deep learning models, and visualization on data extracted from the MIMIC-III database for a group of patients diagnosed with heart disease. The results of sequence mining corresponded to specific pathways of interest to medical staff and were used to select patient groups that went through these pathways. An interactive Sankey diagram representing these pathways and a heatmap visually representing the weight of each variable were developed for temporal and quantitative illustration. We applied the proposed system to predict unplanned cardiac surgery, using clinical pathways determined by sequence pattern mining to select cardiac surgery from complex EHRs to label subject groups and deep learning models. The proposed system aids in the selection of pathway-based patient groups, simplification of labelling, and exploratory interpretation of modelling results. The proposed system can help medical staff explore various pathways that patients have gone through and further facilitate the testing of various clinical hypotheses using big data in the medical domain.</h3>
      </header>
      <section>
        
        <CohortList />
        
        <Pathway />
        
        
        <Heatmap />

        <Treemap />
      </section>

    </div>
  )
}

export default PathwayPage
