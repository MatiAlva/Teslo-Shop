import ShopLayouts from '@/components/layouts/ShopLayouts'
import { Chip, Grid, Typography, Link } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import NextLink from 'next/link'



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
               <NextLink href={`/orders/${params.row.id}`} passHref legacyBehavior>
                    <Link underline='always'>
                        Ver Orden
                    </Link>
               </NextLink>
            )
        }
    }
]

const rows = [
    {id: 1, paid: true, fullname: 'Avarez Matias'},
    {id: 2, paid: false, fullname: 'Melisa Flores'},
    {id: 3, paid: true, fullname: 'Hernandeo Vallejo'},
    {id: 4, paid: false, fullname: 'Eduardo Rios'},
    {id: 5, paid: true, fullname: 'Emin Reyes'},
    {id: 6, paid: false, fullname: 'Avarez Manuel'},
]


const HistoryPage = () => {
  return (
    <ShopLayouts title='Historial de ordenes' pageDescription='Historial de ordenes del cliente'>
        <Typography variant='h1' component='h1'>Historial de ordenes</Typography>


        <Grid container>
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

export default HistoryPage