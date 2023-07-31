import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"
import { ChangeEvent, useContext, useState } from "react"
import { UIContext } from "@/context/ui"
import { useRouter } from "next/router"
import { AuthContext } from "@/context"


const SideMenu = () => {

    const {isMenuOpen, toggleSideMenu} = useContext(UIContext)
    const [searchTerm, setSharchTerm] = useState('')
    const router = useRouter()
    const { user, isLoggedIn, logout} = useContext(AuthContext)


    const onSearchTerm = () => {
        if(searchTerm.length === 0) return

        navigateTo(`search/${searchTerm}`)
    }


    const navigateTo = (url:string) => {
        toggleSideMenu()
        router.push(url)
    }

    const handleValue = (e: ChangeEvent<HTMLInputElement>) => {
        setSharchTerm(e.target.value)
    }


  return (
    <Drawer
        open={ isMenuOpen }
        anchor='right'
        sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
        onClose={toggleSideMenu}
    >
        <Box sx={{ width: 250, paddingTop: 5 }}>
            
            <List>

                <ListItem>
                    <Input
                        autoFocus
                        value={searchTerm}
                        onChange={handleValue}
                        onKeyPress={(e) => e.key === 'Enter' ? onSearchTerm() : null}
                        type='text'
                        placeholder="Buscar..."
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={onSearchTerm}
                                >
                                 <SearchOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </ListItem>

                {
                        isLoggedIn && (
                            <>
                                <ListItem button>
                                    <ListItemIcon>
                                        <AccountCircleOutlined/>
                                    </ListItemIcon>
                                    <ListItemText primary={'Perfil'} />
                                </ListItem>

                                <ListItem 
                                    button 
                                    onClick={() => navigateTo('/orders/history')}
                                >
                                    <ListItemIcon>
                                        <ConfirmationNumberOutlined/>
                                    </ListItemIcon>
                                    <ListItemText primary={'Mis Ordenes'} />
                                </ListItem>
                            </>
                        )
                }


                <ListItem button
                    sx={{ display: { xs: '', sm: 'none' } }}
                    onClick={() => navigateTo('/category/men')}
                >
                    <ListItemIcon>
                        <MaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Hombres'} />
                </ListItem>

                <ListItem button
                    sx={{ display: { xs: '', sm: 'none' } }}
                    onClick={() => navigateTo('/category/women')}
                >
                    <ListItemIcon>
                        <FemaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Mujeres'} />
                </ListItem>

                <ListItem button
                    sx={{ display: { xs: '', sm: 'none' } }}
                    onClick={() => navigateTo('/category/kid')}
                >
                    <ListItemIcon>
                        <EscalatorWarningOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Niños'} />
                </ListItem>


                {
                    isLoggedIn 
                    ? (
                        <ListItem button onClick={logout}>
                            <ListItemIcon>
                                <LoginOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Salir'} />
                        </ListItem>
                    )
                    : (
                        <ListItem button>
                            <ListItemIcon
                                sx={{ cursor: 'poiter' }}
                                onClick={ () => navigateTo(`/auth/login?p=${router.asPath}`)}
                            >
                                <VpnKeyOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Ingresar'} />
                        </ListItem>
                    )
                }

                {/* Admin */}
                {
                    user?.role === 'admin' 
                    && (
                        <>
                            <Divider />
                            <ListSubheader>Admin Panel</ListSubheader>

                            <ListItem button>
                                <ListItemIcon>
                                    <CategoryOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Productos'} />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Ordenes'} />
                            </ListItem>
            
                            <ListItem button>
                                <ListItemIcon>
                                    <AdminPanelSettings/>
                                </ListItemIcon>
                                <ListItemText primary={'Usuarios'} />
                            </ListItem>
                        </>
                    )
                }
               
            </List>
        </Box>
    </Drawer>
  )
}


export default SideMenu