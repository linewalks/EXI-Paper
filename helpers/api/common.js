import Router from 'next/router'

const confirmMessageWrapper = (message, confirmCallback, cancelCallback) => {
  const isConfirm = window.confirm(message)
  if (isConfirm) {
    return confirmCallback()
  }
  if (cancelCallback) return cancelCallback()
}

const redirectTo = (redirectUrl, ctx) => {
  const { res } = ctx
  if (res) {
    // Server에서 Redirect면,
    res.writeHead(302, {
      Location: redirectUrl,
    })
    res.end()
    res.finished = true
  } else {
    Router.replace(redirectUrl)
  }
}
export { confirmMessageWrapper, redirectTo }
