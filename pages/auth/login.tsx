import { tesloApi } from "@/api"
import AuthLayout from "@/components/layouts/AuthLayout"
import { AuthContext } from "@/context"
import { validations } from "@/utils"
import { ErrorOutline, NoSimOutlined } from "@mui/icons-material"
import { Box, Button, Chip, Grid, Link, TextField, Typography } from "@mui/material"
import NextLink from 'next/link'
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import { useForm } from "react-hook-form"

type FormData = {
    email: string
    password: string
  }


function LoginPage() {

    const { register, handleSubmit , formState: { errors }} = useForm<FormData>()
    const [showError, setShowError] = useState(false)
    const {loginUser} =useContext(AuthContext)
    const router = useRouter()

    const onLoginUser = async( { email, password }: FormData) => {

        setShowError(false)

        const isValidUser = await loginUser(email,password)

        if (!isValidUser) {
            setShowError(true)
            setTimeout(() => setShowError(false), 3000)
            return
        }


        router.replace('/')

        // try {
        //     const {data} = await tesloApi.post('/user/login', {email, password})
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
    <AuthLayout title="Ingresar">
        <form onSubmit={handleSubmit(onLoginUser)} noValidate>
            <Box sx={{width: 350, padding: '10px 30px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h1" component='h1'>Iniciar Sesion</Typography>

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
                            type="email"
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
                            variant="filled" 
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12}>
                    <Button 
                        type="submit"
                        color='secondary' 
                        className="circular-btn" 
                        size="large" 
                        fullWidth
                        
                        
                    >   Ingresar
                    </Button>

                    </Grid>

                    <Grid item xs={12} display='flex' justifyContent='end'>
                        <NextLink href='/auth/register' passHref legacyBehavior>
                            <Link underline="always">
                                ¿No tienes cuenta?
                            </Link>
                        </NextLink>
                    </Grid>
                </Grid>
            </Box>
        </form>
    </AuthLayout>
  )
}

export default LoginPage