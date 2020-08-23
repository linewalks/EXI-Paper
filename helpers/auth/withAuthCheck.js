/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import nextCookie from 'next-cookies'
import _ from 'lodash'
import * as session from '@helpers/api/session'
import dynamic from 'next/dynamic'
import axios from 'axios'
import PropTypes from 'prop-types'
import { redirect, userCheck, getUserInfo } from './authUtil'

const Navi = dynamic(() => import('@components/Navi'))

const withAuthCheck = (WrapperComponent, type) => {
  const Wrapper = (props) => {
    const { cookieDataSource, jwt } = props
    const [dataSource, setDataSource] = useState(cookieDataSource)
    axios.defaults.headers.common.Authorization = `Bearer ${jwt}`

    return (
      <>
        <Navi setDataSource={setDataSource} dataSource={dataSource} />
        <WrapperComponent {...props} dataSource={dataSource} />
      </>
    )
  }

  Wrapper.getInitialProps = async (ctx) => {
    const { jwt } = await nextCookie(ctx)
    const cookieDataSource = await nextCookie(ctx).dataSource || 'amc'

    if (_.isEmpty(jwt)) {
      session.removeAllCookies()
      return redirect(ctx, '/signin')
    }

    const userRole = await getUserInfo(jwt, ctx)

    if (!userCheck(type, userRole)) {
      redirect(ctx, '/')
    }

    const componentProps = WrapperComponent.getInitialProps && (
      await WrapperComponent.getInitialProps(ctx))

    return {
      jwt,
      cookieDataSource,
      ...componentProps,
    }
  }

  Wrapper.propTypes = {
    jwt: PropTypes.string.isRequired,
    cookieDataSource: PropTypes.oneOf(['amc', 'cnuh', 'uuh', 'mimiccdm']).isRequired,
  }

  return Wrapper
}

export default withAuthCheck
