import ShopLayouts from '@/components/layouts/ShopLayouts'
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React from 'react'

const AddressPage = () => {
  return (
    <ShopLayouts title='Direccion' pageDescription='Confirmar direccion del destino'>
        <Typography variant='h1'>Direccion</Typography>

        <Grid container spacing={2} sx={{mt:2 }}>

            <Grid item xs={12} sm={6}>
                <TextField label='Nombre' variant='filled' fullWidth/>
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField label='Apellido' variant='filled' fullWidth/>
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField label='Direccion' variant='filled' fullWidth/>
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField label='Direccion 2' variant='filled' fullWidth/>
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField label='Codigo Postal' variant='filled' fullWidth/>
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField label='Ciudad' variant='filled' fullWidth/>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Select
                  variant='filled'
                  label='País'
                  value={1}
                > 
                  <MenuItem value={1}>Costa Rica</MenuItem>
                  <MenuItem value={2}>Argentina</MenuItem>
                  <MenuItem value={3}>Mexico</MenuItem>
                  <MenuItem value={3}>Honduras</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
                <TextField label='Telefono' variant='filled' fullWidth />
            </Grid>

        </Grid>

        <Box sx={{ mt:3 }} display='flex' justifyContent='center'>
          <Button color='secondary' className='circular-btn' size='large'>
            Revisar Pedido
          </Button>
        </Box>
    </ShopLayouts>
  )
}

export default AddressPage 