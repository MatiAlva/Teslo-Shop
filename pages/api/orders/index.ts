import { db } from '@/database'
import { IOrder } from '@/interfaces'
import { Product } from '@/models'
import Order from '@/models/Order'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

type Data = 
    |{ message: string}
    |IOrder

export default function handle(req: NextApiRequest, res: NextApiResponse<Data>) {


    switch(req.method) {
        case 'POST':
            return createOrder(req, res)


        default:
            return res.status(400).json({ message: 'Bad Request' })
        }
    }



const createOrder = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { orderItems, total } = req.body as IOrder

    //Verificar que tengamos un usuario
    const session: any = await getSession({ req })

    if (!session) {
        return res.status(401).json({
            message: 'Debe de estar autenticado para hacer esto'
        })
    }

    //Crear un arreglo con los productos que la persona quiere
    const productsIds = orderItems.map(producto => producto._id)
    await db.connect()

    const dbProducts = await Product.find({ _id: { $in: productsIds } })

    try {
        
        const subTotal = orderItems.reduce((prev, current) => {
            const currentPrice = dbProducts.find(prod =>  prod.id === current._id)?.price
            if (!currentPrice) {
                throw new Error('Verificar el carrito de nuevo, producto no existe')
            }

            return (currentPrice * current.quantity) + prev
        } ,0)

        const taxtRate = Number(process.env.NEXT_PUBLIC_TAXT_RATE || 0)
        const backendTotal = subTotal * (taxtRate + 1)

        if (total !== backendTotal) {
            throw new Error('El total no cuadra con el monto')
        }


        //Todo bien hasta este punto
        const userId = session.user._id
        const newOrder = new Order({...req.body, isPaid: false, user: userId})
        newOrder.total = Math.round( newOrder.total * 100 ) / 100
        await newOrder.save()
        await db.disconnect()
        
        res.status(201).json(newOrder)


    } catch (error: any) {
        await db.disconnect()
        console.log(error)
        res.status(400).json({
            message: error.message || 'Revise logs del servidor'
        })
    }

    // res.status(201).json(req.body)
}
    