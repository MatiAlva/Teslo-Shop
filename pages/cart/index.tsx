import CartList from '@/components/cart/CartList'
import OrdenSumary from '@/components/cart/OrdenSumary'
import ShopLayouts from '@/components/layouts/ShopLayouts'
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import React from 'react'

const CartPage = () => {
  return (
    <ShopLayouts title='Carrito - 3' pageDescription='Carrito de compras de la tienda'>
        <Typography variant='h1' component='h1'>Carrito</Typography>

        <Grid container>
            <Grid item xs={12} sm={7}>
                <CartList editable/>
            </Grid>
            <Grid item xs={12} sm={5}>
                <Card className='sumary-card'>
                    <CardContent>
                        <Typography variant='h2'>Orden</Typography>
                        <Divider sx={{ ml:1 }}/>

                        <OrdenSumary />   

                        <Box sx={{ mt: 3 }}>
                            <Button color='secondary' className='circular-btn' fullWidth>
                                Checkout
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>

    </ShopLayouts>
  )
}

export default CartPage