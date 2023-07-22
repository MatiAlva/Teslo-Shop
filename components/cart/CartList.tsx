import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material"
import NextLink from 'next/link'
import ItemCounter from "../ui/ItemCounter"
import React, { useContext } from "react"
import { CartContext } from "@/context"
import { ICartProduct } from "@/interfaces"


interface Props {
    editable?: boolean
}

const CartList: React.FC<Props> = ({ editable = false}) => {

    const { cart, updatedCartQuantity, removeCartProduct } = useContext( CartContext)

    const onNewCartQuantityValue = (product: ICartProduct, newQuantityValue: number) => {
        product.quantity = newQuantityValue
        updatedCartQuantity(product)
    }

  return (
    <>
        {
            cart.map(product => {
                return (
                    <Grid container key={product.slug + product.size} spacing={2} sx={{ mb: 1 }}>
                        <Grid item xs={3}>
                            <NextLink href={`/product/${product.slug}`} passHref legacyBehavior>
                                <Link>
                                    <CardActionArea>
                                        <CardMedia
                                            image={`/products/${product.images}`}
                                            component='img'
                                            sx={{ borderRadius: '5px' }} />
                                    </CardActionArea>
                                </Link>
                            </NextLink>
                        </Grid>
                        <Grid item xs={7}>
                            <Box display='flex' flexDirection='column'>
                                <Typography variant="body1">{product.title}</Typography>
                                <Typography variant="body1">Talla: <strong>{product.size}</strong></Typography>

                                {editable
                                    ? (
                                        <ItemCounter 
                                            currentValue={product.quantity}
                                            maxValue={10}
                                            updatedQuantit={ (value) => onNewCartQuantityValue(product, value)}
                                        />
                                    )
                                    : (
                                        <Typography variant="h6">{product.quantity} {product.quantity > 1 ? 'productos' : 'producto'} </Typography>
                                    )
                                    }


                            </Box>
                        </Grid>
                        <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
                            <Typography variant="subtitle1">${product.price}</Typography>

                            {editable && (
                                <Button 
                                    variant="text" 
                                    color="secondary"
                                    onClick={() => removeCartProduct(product)}
                                >
                                    Remove
                                </Button>
                            )}


                        </Grid>
                    </Grid>
                )
            })
        }
    </>
  )
}

export default CartList