import React from 'react'
import dynamic from 'next/dynamic'
import { Heading, variables, Navbar, Button } from 'MDwalks-UI'

const { colorV1 } = variables


const Heatmap = dynamic(() => import('@components/Heatmap'))
const GNB = dynamic(() => import('@components/GNB'))


const HeatmapPage = () => {
  return (
    <div>
      <style global jsx>
        {`
          div#__next{
            background-color: ${colorV1.$grey01}
          }
        `}
      </style>
      <GNB />
      <header className="mt40 wrap_1200">
        <Heading size="32" style={{ color: colorV1.$grey10 }}>Attention Heatmap</Heading>
      </header>
      <section><Heatmap /></section>


    </div>
  )
}

export default HeatmapPage
