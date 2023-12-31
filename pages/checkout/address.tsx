import ShopLayouts from '@/components/layouts/ShopLayouts'
import { CartContext } from '@/context'
import { countries } from '@/utils'
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import Cookies from 'js-cookie'
import { cookies } from 'next/dist/client/components/headers'
import { useRouter } from 'next/router'
import React, { useCallback, useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'


type FormData ={
  firstName: string
  lastName: string
  address: string
  address2?: string
  zip: string
  city: string
  country: string,
  phone: string
}


const getAdrressFromCookies = ():FormData => {
  return {
    firstName: Cookies.get('firstName') || '',
    lastName: Cookies.get('lastName') || '',
    address: Cookies.get('address') || '',
    address2: Cookies.get('address2') || '',
    zip: Cookies.get('zip') || '',
    city: Cookies.get('city') || '',
    country: Cookies.get('country') || '',
    phone: Cookies.get('phone') || ''
  }
}

const AddressPage = () => {

  const router = useRouter()
  const {updateAddress} = useContext(CartContext)
  const { register, handleSubmit , formState: { errors }, reset} = useForm<FormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      address: '',
      address2: '',
      zip: '',
      city: '',
      country: countries[0].code,
      phone: '',
    }
  })

  useEffect(() => {
    reset(getAdrressFromCookies())
  }, [reset])

  const onAddress = (data: FormData) => {
    updateAddress(data)
    router.push('/checkout/summary')
  }


  return (
    <ShopLayouts title='Direccion' pageDescription='Confirmar direccion del destino'>

      <form onSubmit={handleSubmit(onAddress)} noValidate>
        <Typography variant='h1'>Direccion</Typography>

        <Grid container spacing={2} sx={{mt:2 }}>

            <Grid item xs={12} sm={6}>
                <TextField 
                  label='Nombre' 
                  variant='filled' 
                  fullWidth
                  {
                    ...register('firstName', {
                        required: 'Este campo es requerido',
                        minLength: {value: 3, message: 'Minimo 3 caracteres'}
                      })
                  }
                  error ={!!errors.firstName}
                  helperText= {errors.firstName?.message}
                />
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField 
                  label='Apellido' 
                  variant='filled' 
                  fullWidth
                  {
                    ...register('lastName', {
                      required: 'Este campo es requerido',
                      minLength: {value: 3, message: 'Minimo 3 caracteres'}
                })}
                error ={!!errors.lastName}
                helperText= {errors.lastName?.message}
                />
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField 
                  label='Direccion' 
                  variant='filled' 
                  fullWidth
                  {
                    ...register('address', {
                      required: 'Este campo es requerido',
                        minLength: {value: 3, message: 'Minimo 3 caracteres'}
                      })}
                      error ={!!errors.address}
                      helperText= {errors.address?.message}
                      />
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField 
                  label='Direccion 2' 
                  variant='filled' 
                  fullWidth
                  {
                    ...register('address2', {
                      minLength: {value: 3, message: 'Minimo 3 caracteres'}
                    })}
                />
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField 
                  label='Codigo Postal' 
                  variant='filled' 
                  fullWidth
                  {
                    ...register('zip', {
                      required: 'Este campo es requerido',
                        minLength: {value: 3, message: 'Minimo 3 caracteres'}
                      })}
                      error ={!!errors.zip}
                      helperText= {errors.zip?.message}
                      />
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField 
                  label='Ciudad' 
                  variant='filled' 
                  fullWidth
                  {
                    ...register('city', {
                      required: 'Este campo es requerido',
                        minLength: {value: 3, message: 'Minimo 3 caracteres'}
                      })}
                      error ={!!errors.city}
                      helperText= {errors.city?.message}
                />
            </Grid>

            <Grid item xs={12} sm={6}>
              {/* <FormControl fullWidth> */}
                <TextField
                  // select
                  variant='filled'
                  label='País'
                  fullWidth
                  // defaultValue={Cookies.get('country') || countries[0].code}
                  {
                    ...register('country', {
                        required: 'Este campo es requerido',
                })}
                error ={!!errors.country}
                helperText= {errors.country?.message}
                > 
                </TextField>
              {/* </FormControl> */}
            </Grid>
            
            <Grid item xs={12} sm={6}>
                <TextField
                type='number' 
                  label='Telefono' 
                  variant='filled' 
                  fullWidth
                  {
                    ...register('phone', {
                        required: 'Este campo es requerido',
                        minLength: {value: 3, message: 'Minimo 3 caracteres'}
                      })}
                      error ={!!errors.phone}
                      helperText= {errors.phone?.message}
                />
            </Grid>

        </Grid>

        <Box sx={{ mt:3 }} display='flex' justifyContent='center'>
          <Button
            type='submit' 
            color='secondary' 
            className='circular-btn' 
            size='large'
            >
            Revisar Pedido
          </Button>
        </Box>
      </form>
    </ShopLayouts>
  )
}






export default AddressPage 