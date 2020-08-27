import React, { useState, createContext } from 'react'

export const AppContext = createContext()

const AppProvider = ({ children }) => {
  const [threshold, setThreshold] = useState(null)

  const state = {
    threshold,
  }

  const action = {
    setThreshold,
  }

  const store = {
    state,
    action,
  }

  return (
    <AppContext.Provider value={store}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
