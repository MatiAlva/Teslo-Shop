import CartList from '@/components/cart/CartList'
import OrdenSumary from '@/components/cart/OrdenSumary'
import ShopLayouts from '@/components/layouts/ShopLayouts'
import { CartContext } from '@/context'
import { countries } from '@/utils'
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material'
import Cookies from 'js-cookie'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'

const SummaryPage = () => {

    const {shippingAdress, numberOfItem} = useContext(CartContext)
    const router = useRouter()


    useEffect(() => {
        if (!Cookies.get('firstName')) {
            router.push('/checkout/address')
        }
    }, [router])

    if (!shippingAdress) {
        return (<></>)
    }

    const {firstName, lastName, address, address2 = '', city, country, phone, zip} = shippingAdress

  return (
    <ShopLayouts title='Resumen de orden' pageDescription='Resumen de la orden'>
        <Typography variant='h1' component='h1'>Resumen de la orden</Typography>

        <Grid container>
            <Grid item xs={12} sm={7}>
                <CartList/>
            </Grid>
            <Grid item xs={12} sm={5}>
                <Card className='sumary-card'>
                    <CardContent>
                        <Typography variant='h2'>Resumen ({numberOfItem} {numberOfItem === 1 ? ' productos' : 'productos'}) </Typography>
                        <Divider sx={{ my:1 }}/>


                        <Box display='flex' justifyContent='space-between'>
                            <Typography variant='subtitle1'>Direccion de entrega</Typography>
                            <NextLink href='/checkout/address' passHref legacyBehavior>
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>

                        <Typography>{firstName} {lastName}</Typography>
                        <Typography>{address} {address2 ? `, ${address2}` : ''}</Typography>
                        <Typography>{city}, {zip}</Typography>
                        {/* <Typography>{ countries.find(c => c.code === country)?.name}</Typography> */}
                        <Typography>{country}</Typography>
                        <Typography>{phone}</Typography>

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
                            <Button color='secondary' className='circular-btn' fullWidth>
                                Confirmar Orden
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>

    </ShopLayouts>
  )
}

export default SummaryPage