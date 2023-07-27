import { ICartProduct } from '@/interfaces'
import { createContext } from 'react'
import { ShippingAdress } from './CartProvider';

interface ContextProps {
   isLoaded: boolean
   cart: ICartProduct[],
   numberOfItem: number;
   subTotal: number;
   tax: number;
   total: number;

   shippingAdress?: ShippingAdress

   //Metodos
   addProductToCart: (product: ICartProduct) => void
   updatedCartQuantity: (product: ICartProduct) => void
   removeCartProduct: (product: ICartProduct) => void
   updateAddress: (address: ShippingAdress) => void
}

export const CartContext = createContext({} as ContextProps)