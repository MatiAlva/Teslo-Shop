import { CartContext, UIContext } from "@/context"
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material"
import { AppBar, Toolbar,Link, Typography, Box, Button, IconButton, Badge, Input, InputAdornment } from "@mui/material"
import NextLink from 'next/link'
import  { useRouter } from "next/router"
import { ChangeEvent, useContext, useState } from "react"

const Navbar = () => {

    const {asPath} = useRouter()
    const {toggleSideMenu} = useContext(UIContext)
    const {numberOfItem} = useContext(CartContext)
    const [searchTerm, setSharchTerm] = useState('')
    const [isSearchVisible, setIsSearchVisible] = useState(false)
    
    const router = useRouter()


    const onSearchTerm = () => {
        if(searchTerm.length === 0) return
        router.push(`/search/${searchTerm}`)
    }

    const handleValue = (e: ChangeEvent<HTMLInputElement>) => {
        setSharchTerm(e.target.value)
    }


  return (
    <AppBar>
        <Toolbar>
            <NextLink href='/' passHref legacyBehavior>
                <Link display='flex' alignItems='center'>
                    <Typography variant="h6">Teslo |</Typography>
                    <Typography sx={{ml: 0.5}}>Shop</Typography>
                </Link>
            </NextLink>

            <Box flex={1}/>

            <Box sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }} className='fadeIn'>
            <NextLink href='/category/men' passHref legacyBehavior>
                    <Link>
                        <Button color={ asPath === '/category/men' ? 'primary' : 'info'}>Hombre</Button>
                    </Link>
                </NextLink>
                <NextLink href='/category/women' passHref legacyBehavior>
                    <Link>
                        <Button  color={ asPath === '/category/women' ? 'primary' : 'info'}>Mujeres</Button>
                    </Link>
                </NextLink>
                <NextLink href='/category/kid' passHref legacyBehavior>
                    <Link>
                        <Button  color={ asPath === '/category/kid' ? 'primary' : 'info'}>Niños</Button>
                    </Link>
                </NextLink>
            </Box>

            <Box flex={1}/>

            {/* Pantallas Grandes */}

             {
                isSearchVisible 
                    ? (
                        <Input
                            sx={{ display: { xs: 'none', sm: 'flex' } }}
                            className="fadeIn"
                            autoFocus
                            value={searchTerm}
                            onChange={handleValue}
                            onKeyPress={(e) => e.key === 'Enter' ? onSearchTerm() : null}
                            type='text'
                            placeholder="Buscar..."
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                         onClick={() => setIsSearchVisible(false)}
                                    >
                                    <ClearOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    )
                    : (
                        <IconButton
                            onClick={() => setIsSearchVisible(true)}
                            sx={{ display: {xs: 'none', sm: 'flex'} }}
                            className="fadeIn"
                        >
                            <SearchOutlined />
                        </IconButton>  
                    )
             }

            {/* Pantallas Pequeñas */}
            <IconButton
                sx={{ display: {xs: 'flex', sm: 'none'} }}
                onClick={toggleSideMenu}
            >
                <SearchOutlined />
            </IconButton>

            <NextLink href='/cart' passHref legacyBehavior>
                <Link>
                <IconButton>
                    <Badge badgeContent={numberOfItem > 9 ? '+9' : numberOfItem} color="secondary">
                        <ShoppingCartOutlined />
                    </Badge>
                </IconButton>
                </Link>
            </NextLink>

            <Button onClick={toggleSideMenu}>Menu</Button>

        </Toolbar>
    </AppBar>
  )
}

export default Navbar
