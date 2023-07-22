import { ICartProduct } from '@/interfaces'
import { createContext } from 'react'

interface ContextProps {
   cart: ICartProduct[],
   numberOfItem: number;
   subTotal: number;
   tax: number;
   total: number;

   //Metodos
   addProductToCart: (product: ICartProduct) => void
   updatedCartQuantity: (product: ICartProduct) => void
   removeCartProduct: (product: ICartProduct) => void
}

export const CartContext = createContext({} as ContextProps)