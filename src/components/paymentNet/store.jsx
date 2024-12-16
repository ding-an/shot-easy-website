import React, { createContext, useContext, useReducer } from 'react'

import reducer, { initialState } from './reducer'

const StateContext = createContext()
const DispatchContext = createContext()

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  )
}

export function useStore() {
  return useContext(StateContext)
}

export function useDispatch() {
  return useContext(DispatchContext)
}
