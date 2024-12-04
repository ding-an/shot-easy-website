import { createContext, useContext, useReducer } from 'react'
import { AudioContentFrom } from './controller/enums'

const initialState = {
  settings: null,
  contentFrom: AudioContentFrom.TEXT,
  formValues: {
    imageFile: null,
    content: '',
    voiceFile: null,
    voice: null,
  },
  generating: false,
  taskDetail: null
}

const TalkingPhotoContext = createContext(null)

export const TalkingPhotoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <TalkingPhotoContext.Provider value={[state, dispatch]}>
      {children}
    </TalkingPhotoContext.Provider>
  )
}

export const useStore = () => {
  const [state, dispatch] = useContext(TalkingPhotoContext)
  if (!state) {
    throw new Error('useStore must be used within TalkingPhotoProvider')
  }
  
  return {
    ...state,
    setSettings: (settings) => dispatch({ type: 'SET_SETTINGS', payload: settings }),
    setContentFrom: (contentFrom) => dispatch({ type: 'SET_CONTENT_FROM', payload: contentFrom }),
    setFormValue: (key, value) => dispatch({ type: 'SET_FORM_VALUE', payload: { key, value } }),
    setState: (key, value) => dispatch({ type: 'SET_STATE', payload: { key, value } }),
    setTaskDetail: (taskDetail) => dispatch({ type: 'SET_TASK_DETAIL', payload: taskDetail }),
    resetStore: () => dispatch({ type: 'RESET_STORE' })
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_SETTINGS':
      return { ...state, settings: action.payload }
    case 'SET_CONTENT_FROM':
      return { ...state, contentFrom: action.payload }
    case 'SET_FORM_VALUE':
      return {
        ...state,
        formValues: {
          ...state.formValues,
          [action.payload.key]: action.payload.value
        }
      }
    case 'SET_STATE':
      return { ...state, [action.payload.key]: action.payload.value }
    case 'SET_TASK_DETAIL':
      return { ...state, taskDetail: action.payload }
    case 'RESET_STORE':
      return initialState
    default:
      return state
  }
}
