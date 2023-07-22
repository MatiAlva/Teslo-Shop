import { UIContext } from './UIContext'
import { ReactNode, useReducer } from 'react'
import {  UiReducer } from './uiReducer'

export interface  UIState {
     isMenuOpen: boolean
}

const  UI_INITIAL_STATE:  UIState = {
     isMenuOpen: false
}

interface Props {
     children : ReactNode
}

export const  UIProvider: React.FC<Props> = ({children}) => {

    const [state, dispatch] = useReducer( UiReducer,  UI_INITIAL_STATE)

    const toggleSideMenu = () => {
        dispatch({type: 'Ui - ToggleMenu' })
    }

    return (
        < UIContext.Provider value={{
             ...state,

             //Metodos
             toggleSideMenu,
        }}>
       {children}
       </ UIContext.Provider>
    )
}