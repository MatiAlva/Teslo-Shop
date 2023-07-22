import CartList from '@/components/cart/CartList'
import OrdenSumary from '@/components/cart/OrdenSumary'
import ShopLayouts from '@/components/layouts/ShopLayouts'
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material'
import { Box, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material'
import NextLink from 'next/link'

const OrderPage = () => {
  return (
    <ShopLayouts title='Resumen de la orden 23123' pageDescription='Resumen de la orden'>
        <Typography variant='h1' component='h1'>Orden: ABC123</Typography>

        <Chip
            sx={{ my:2 }}
            label='Pendiende de pago'
            variant='outlined'
            color= 'error'
            icon={<CreditCardOffOutlined />}
        />

        <Chip
            sx={{ my:2 }}
            label='Orden Pagada'
            variant='outlined'
            color= 'success'
            icon={<CreditScoreOutlined />}
        />

        <Grid container>
            <Grid item xs={12} sm={7}>
                <CartList/>
            </Grid>
            <Grid item xs={12} sm={5}>
                <Card className='sumary-card'>
                    <CardContent>
                        <Typography variant='h2'>Resumen (3 productos) </Typography>
                        <Divider sx={{ my:1 }}/>


                        <Box display='flex' justifyContent='space-between'>
                            <Typography variant='subtitle1'>Direccion de entrega</Typography>
                            <NextLink href='/checkout/address' passHref legacyBehavior>
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>

                        <Typography>Alvarez Matias</Typography>
                        <Typography>333 Agun lugar</Typography>
                        <Typography>Un dato</Typography>
                        <Typography>Otro dato</Typography>
                        <Typography>Argentina</Typography>
                        <Typography>+54 342434242</Typography>

                        <Divider sx={{ my:1 }}/>

                        <Box display='flex' justifyContent='end'>
                            <NextLink href='/cart' passHref legacyBehavior>
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>
                        
                        <OrdenSumary />   

                        <Box sx={{ mt: 3 }}>
                            <h1>Pagar</h1>

                            <Chip
                                sx={{ my:2 }}
                                label='Orden Pagada'
                                variant='outlined'
                                color= 'success'
                                icon={<CreditScoreOutlined />}
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>

    </ShopLayouts>
  )
}

export default OrderPage