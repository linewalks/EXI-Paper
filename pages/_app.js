/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import '@public/styles/global.sass'
import '@public/styles/SpoqaHanSans.css'
import Head from 'next/head'
import { Footer } from 'MDwalks-UI'
import AppProvider from '@contexts/AppProvider'
import PropTypes from 'prop-types'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
        <title>EXI Paper</title>
      </Head>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
      <Footer />
    </>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default MyApp
