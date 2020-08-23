import cookie from 'js-cookie'
import _ from 'lodash'

const isBrowser = typeof window !== 'undefined'

export const setCookie = (key, value) => {
  if (isBrowser) {
    cookie.set(key, value, {
      expires: 1,
      path: '/',
    })
  }
}

export const getCookie = (key, req) => {
  if (isBrowser) {
    return cookie.get(key)
  }

  // get cookie from server req obj.
  if (!req.headers.cookie) {
    return undefined
  }
  const rawCookie = req.headers.cookie
    .split(';')
    .find((c) => c.trim().startsWith(`${key}=`))
  if (!rawCookie) {
    return undefined
  }
  return rawCookie.split('=')[1]
}

export const hasSession = () => getCookie('jwt') !== undefined

export const removeSession = () => {
  cookie.remove('jwt')
}

export const removeAllCookies = () => (
   _.keys(cookie.get()).forEach((cookieName) => cookie.remove(cookieName))
)
