import AuthLayout from "@/components/layouts/AuthLayout"
import { validations } from "@/utils"
import { ErrorOutline, NoSimOutlined } from "@mui/icons-material"
import { Box, Button, Chip, Divider, Grid, Link, TextField, Typography } from "@mui/material"
import { getSession, signIn, getProviders } from "next-auth/react"
import NextLink from 'next/link'
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { GetServerSideProps } from 'next'

type FormData = {
    email: string
    password: string
  }


function LoginPage() {

    const { register, handleSubmit , formState: { errors }} = useForm<FormData>()
    const [showError, setShowError] = useState(false)
    const router = useRouter()
    const [providers, setProviders] = useState<any>({})


    useEffect(() => {
        getProviders().then(prov => {
            setProviders(prov)
        })
    }, [])


    const onLoginUser = async( { email, password }: FormData) => {

        setShowError(false)
        await signIn('credentials', { email, password })



        // const isValidUser = await loginUser(email,password)

        // if (!isValidUser) {
        //     setShowError(true)
        //     setTimeout(() => setShowError(false), 3000)
        //     return
        // }

        // const destination = router.query.p?.toString() || '/'
        // router.replace(destination)

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
                        <NextLink 
                            href={ router.query.p ? `/auth/register?p=${router.query.p}` : '/auth/register'}
                            passHref 
                            legacyBehavior
                        >
                            <Link underline="always">
                                ¿No tienes cuenta?
                            </Link>
                        </NextLink>
                    </Grid>

                    <Grid item xs={12} display='flex' flexDirection='column' justifyContent='end'>
                        <Divider sx={{width: '100%' , mb:2 }}/>
                        {
                            Object.values(providers).map((provider:any) => {

                                if(provider.id === 'credentials') return (<div key='credentials'></div>)

                                return (
                                    <Button
                                        key={provider.id}
                                        variant="outlined"
                                        fullWidth
                                        color='primary'
                                        sx={{ mb:1 }}
                                        onClick={() => signIn(provider.id)}
                                    >
                                        {provider.name}
                                    </Button>
                                )
                            })
                        }
                    </Grid>
                    
                </Grid>
            </Box>
        </form>
    </AuthLayout>
  )
}



// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({req, query}) => {
    
    const session = await getSession({req})
    const {p = '/'} = query


    if (session) {
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }
    }

    return {
        props: {
            
        }
    }
}


export default LoginPage