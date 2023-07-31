import { CartContext } from './CartContext'
import React, { ReactNode, useEffect, useReducer } from 'react'
import {  cartReducer } from './'
import { ICartProduct, IOrder, ShippingAdress } from '@/interfaces'
import Cookie from 'js-cookie'
import { tesloApi } from '@/api'
import axios from 'axios'

export interface  CartState {
     isLoaded: boolean;
     cart: ICartProduct[]
     numberOfItem: number;
     subTotal: number;
     tax: number;
     total: number;
     shippingAdress?: ShippingAdress
}

const  CART_INITIAL_STATE: CartState = {
     isLoaded: false,
     cart: [],
     numberOfItem: 0,
     subTotal: 0,
     tax: 0,
     total: 0,
     shippingAdress: undefined
}




interface Props {
    children?: ReactNode
}

export const CartProvider: React.FC<Props> = ({children}) => {

    const [state, dispatch] = useReducer( cartReducer,  CART_INITIAL_STATE)

    useEffect(() => {
          try {
               const cookiesProducs = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : []
               dispatch({ type: 'Cart - LoadCart from cookie | storage', payload: cookiesProducs })
          } catch (error) {
               dispatch({ type: 'Cart - LoadCart from cookie | storage', payload: [] })
          }
     }, [])



     useEffect(() => {

          if (Cookie.get('firstName')) {
               const shippingAddress = {
                    firstName: Cookie.get('firstName') || '',
                    lastName: Cookie.get('lastName') || '',
                    address: Cookie.get('address') || '',
                    address2: Cookie.get('address2') || '',
                    zip: Cookie.get('zip') || '',
                    city: Cookie.get('city') || '',
                    country: Cookie.get('country') || '',
                    phone: Cookie.get('phone') || ''
               }
                    
               dispatch({ type: 'Cart - LoadAddress from Cookies', payload: shippingAddress })
          }

     }, [])


     useEffect(() => {
          Cookie.set('cart', JSON.stringify(state.cart))
     }, [state.cart])



     useEffect(() => {

          const numberOfItem = state.cart.reduce((prev, current) => current.quantity + prev ,0)
          const subTotal = state.cart.reduce((prev, current) => (current.price * current.quantity) + prev ,0)
          const taxtRate = Number(process.env.NEXT_PUBLIC_TAXT_RATE || 0)


          const orderSumary = {
               numberOfItem,
               subTotal,
               tax: subTotal * taxtRate,
               total: subTotal * (taxtRate + 1)
          }    


          dispatch({ type: 'Cart - Update order sumary', payload: orderSumary })
     }, [state.cart])


    const addProductToCart = (product : ICartProduct) => {
     
     const productInCar = state.cart.some( p => p._id === product._id)
     if (!productInCar) return dispatch({ type: 'Cart - Update products in cart', payload: [...state.cart, product] })

     const productInCartDiferentSize = state.cart.some(p => p._id === product._id && p.size === product.size)
     if (!productInCartDiferentSize) return dispatch({ type: 'Cart - Update products in cart', payload: [...state.cart, product] })
     

     //Acumular
     const updatedProducts = state.cart.map( p => {
          if (p._id !== product._id) return p
          if (p.size !== product.size) return p

          //Actualizar la cantidad
          p.quantity += product.quantity
          return p
     })

     dispatch({ type: 'Cart - Update products in cart', payload: updatedProducts })
    }


    const updatedCartQuantity = (product: ICartProduct) => {
          dispatch({ type: 'Cart - Change cart quantity', payload: product })
    }

    const removeCartProduct = (product: ICartProduct) => {
     dispatch({ type: 'Cart - Remove product in cart', payload: product })
    }


    const updateAddress = (address: ShippingAdress) => {
     Cookie.set('firstName', address.firstName)
     Cookie.set('lastName', address.lastName)
     Cookie.set('address', address.address)
     Cookie.set('address2', address.address2 || '')
     Cookie.set('zip', address.zip)
     Cookie.set('city', address.city)
     Cookie.set('country', address.country)
     Cookie.set('phone', address.phone)
     dispatch({ type: 'Cart - Update Address', payload: address })
    }


    const createOrder = async():Promise<{hasError: boolean, message: string}> => {

     if (!state.shippingAdress) {
          throw new Error('No hay direccion de entrega')
     }

     const body:IOrder = {
          orderItems: state.cart.map(p =>({
               ...p,
               image: p.images!,
               size: p.size!
          })),
          shippingAddress: state.shippingAdress,
          numberOfItems: state.numberOfItem,
          subTotal: state.subTotal,
          tax: state.tax,
          total: state.total,
          isPaid: false
     }

     try {
          const { data } = await tesloApi.post<IOrder>('/orders', body)

          dispatch({ type: 'Cart - Order complete' })

          return {
               hasError: false,
               message: data._id!
          }


     } catch (error) {
          if (axios.isAxiosError(error)) {
               return {
                    hasError: true,
                    message: error.response?.data.message
               }
          }

          return {
               hasError: true,
               message: 'Error no controlado, hable con el administrador'
          }
     }

    }


    return (
        < CartContext.Provider value={{
             ...state,


             //Metodo
             addProductToCart,
             updatedCartQuantity,
             removeCartProduct,
             updateAddress,

             //Orders
             createOrder
        }}>
       {children}
       </ CartContext.Provider>
    )
}