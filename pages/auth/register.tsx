import { tesloApi } from "@/api"
import AuthLayout from "@/components/layouts/AuthLayout"
import { AuthContext } from "@/context"
import { validations } from "@/utils"
import { ErrorOutline } from "@mui/icons-material"
import { Box, Button, Grid, Link, TextField, Typography, Chip } from "@mui/material"
import NextLink from 'next/link'
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import { useForm } from "react-hook-form"

type FormData = {
    name: string
    email: string
    password: string
  }


function RegisterPage() {

    const { register, handleSubmit , formState: { errors }} = useForm<FormData>()
    const [showError, setShowError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const router = useRouter()
    const {registerUser} = useContext(AuthContext)

    const onRegisterForm = async({ name, email, password }: FormData) => {

        setShowError(false)
        const { hasError, message } = await registerUser(name, email, password)

        if (hasError) {
            setShowError(true)
            setErrorMessage(message!)
            setTimeout(() => setShowError(false),3000)
            return
        }

        router.replace('/')



        // try {
        //     const {data} = await tesloApi.post('/user/register', {email, password, name})
        //     const {token, user} = data
        //     console.log({token, user})

        // } catch (error) {
        //     console.log('Error en las credenciales')
        //     setShowError(true)

            
        //     setTimeout(() => {
        //         setShowError(false)
        //     }, 3000)
        // }
    }

  return (
    <AuthLayout title="Registrarse">
        <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
            <Box sx={{width: 500, padding: '30px 30px' }}>
                <Grid container spacing={2} sx={{ mt:7 }}>
                    <Grid item xs={12}>
                        <Typography variant="h1" component='h1'>Crear cuenta</Typography>
                        <Chip 
                            label='No reconocemos ese usuario/contraseña'
                            color='error'
                            icon={<ErrorOutline />}
                            className="fadeIn"
                            sx={{ display: showError ? 'flex' : 'none' }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            {
                                ...register('name', {
                                    required: 'Este campo es requerido',
                                    minLength: {value: 2, message: 'Minimo 2 caracteres'}
                                    
                            })}
                            error ={!!errors.name}
                            helperText= {errors.name?.message} 
                            label='Nombre completo' 
                            variant="filled" 
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            type='email' 
                            {
                                ...register('email', {
                                    required: 'Este campo es requerido',
                                    validate: validations.isEmail
                            })}
                            error ={!!errors.email}
                            helperText= {errors.email?.message}
                            label='Correo' 
                            variant="filled" 
                            fullWidth
                        />
                    </Grid>
                    
                    <Grid item xs={12}>
                        <TextField
                            {
                                ...register('password', {
                                    required: 'Este campo es requerido',
                                    minLength: {value: 6, message: 'Minimo 6 caracteres'}
                                })}
                                error ={!!errors.password}
                            helperText= {errors.password?.message}  
                            label='Contraseña' 
                            type="password" 
                            variant="filled" fullWidth
                        />
                    </Grid>

                    <Grid item xs={12}>
                    <Button 
                        color='secondary' 
                        className="circular-btn" 
                        size="large" 
                        fullWidth
                        type="submit"
                    >   Crear Cuenta
                    </Button>
                    </Grid>

                    <Grid item xs={12} display='flex' justifyContent='end'>
                        <NextLink href='/auth/login' passHref legacyBehavior>
                            <Link underline="always">
                                ¿Ya tienes cuenta?
                            </Link>
                        </NextLink>
                    </Grid>
                </Grid>
            </Box>
        </form>
    </AuthLayout>
  )
}

export default RegisterPage