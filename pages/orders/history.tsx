import ShopLayouts from '@/components/layouts/ShopLayouts'
import { Chip, Grid, Typography, Link } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import NextLink from 'next/link'
import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import { dbOrders } from '@/database'
import { IOrder } from '@/interfaces'




const columns:  GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 100},
    {field: 'fullname', headerName: 'Nombre Completo', width: 300},

    {
        field: 'paid',
        headerName: 'Pagada',
        description: 'Muestra informacion si esta pagada o no',
        width:200,
        renderCell: (params: GridRenderCellParams) => {
            return (
                params.row.paid 
                    ? <Chip color='success' label='Pagada' variant='outlined'/>
                    : <Chip color='error' label='No Pagada' variant='outlined'/>
            )
        }
    },
    {
        field: 'orden',
        headerName: 'Ver Orden',
        width:200,
        sortable: false,
        renderCell: (params: GridRenderCellParams) => {
            return (
               <NextLink href={`/orders/${params.row.orderId}`} passHref legacyBehavior>
                    <Link underline='always'>
                        Ver Orden
                    </Link>
               </NextLink>
            )
        }
    }
]

interface Props {
    orders: IOrder[]
}


const HistoryPage:NextPage<Props> = ({ orders }) => {

    const rows = orders.map( (order, idx) => ({
        id: idx * 1,
        paid: order.isPaid,
        fullname: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
        orderId: order._id
    }))

  return (
    <ShopLayouts title='Historial de ordenes' pageDescription='Historial de ordenes del cliente'>
        <Typography variant='h1' component='h1'>Historial de ordenes</Typography>


        <Grid container className='fadeIn'>
            <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: { 
                          paginationModel: { pageSize: 5 } 
                        },
                      }}
                      pageSizeOptions={[5, 10, 25]}
                />

            </Grid>
        </Grid>
    </ShopLayouts>
  )
}



// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const session:any = await getSession({ req })

    if (!session){
        return {
            redirect: {
                destination: '/auth/login?p=/orders/history',
                permanent: false
            }
        }
    }

    const orders = await dbOrders.getOrdersByUser(session.user._id)

    return {
        props: {
            orders
        }
    }
}

export default HistoryPage