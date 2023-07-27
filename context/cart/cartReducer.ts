import { ICartProduct } from '@/interfaces'
import { CartState, ShippingAdress } from './CartProvider'
import { Product } from '@/models'



type CartActionType =
    |{type: 'Cart - LoadCart from cookie | storage', payload: ICartProduct[]}
    |{type: 'Cart - Update products in cart', payload: ICartProduct[]}
    |{type: 'Cart - Change cart quantity', payload: ICartProduct}
    |{type: 'Cart - Remove product in cart', payload: ICartProduct}
    |{type: 'Cart - LoadAddress from Cookies', payload: ShippingAdress}
    |{type: 'Cart - Update Address', payload: ShippingAdress}
    |{
        type: 'Cart - Update order sumary', 
        payload: {
            numberOfItem: number;
            subTotal: number;
            tax: number;
            total: number;
        }
    }

export const cartReducer = (state: CartState, action: CartActionType):CartState => {

    switch (action.type) {
        case 'Cart - LoadCart from cookie | storage':
            return {
                ...state,
                isLoaded: true,
                cart: [...action.payload]
        }

        case 'Cart - Update products in cart' :
            return {
                ...state,
                cart: [...action.payload]
        }

        case 'Cart - Change cart quantity' :
            return {
                ...state,
                cart: state.cart.map(product => {
                    if (product._id !== action.payload._id) return product
                    if (product.size !== action.payload.size) return product

                    return action.payload
                })
            }


            case 'Cart - Remove product in cart':
                return {
                    ...state,
                    cart: state.cart.filter(product => !(product._id === action.payload._id && product.size === action.payload.size))
                }

            case 'Cart - Update order sumary':
                return {
                    ...state,
                    ...action.payload
                }


            case 'Cart - LoadAddress from Cookies' :
            case 'Cart - Update Address' :
                return {
                    ...state,
                    shippingAdress: action.payload
                }

                default:
            return state
    }
}