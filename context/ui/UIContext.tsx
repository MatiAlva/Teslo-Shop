import { createContext } from 'react'

interface ContextProps {
   isMenuOpen: boolean

   //Metodos
   toggleSideMenu: () => void
}

export const UIContext = createContext({} as ContextProps)