import ShopLayouts from "@/components/layouts/ShopLayouts"
import ProductList from "@/components/products/ProductList"
import { dbProducts } from "@/database"
import { IProduct } from "@/interfaces"
import {Box, Typography } from "@mui/material"
import { NextPage } from "next"
import { GetServerSideProps } from 'next'


interface Props {
    products: IProduct[],
    foundProducts: boolean
    query: string
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {


  return (
    <ShopLayouts title={'Teslo-Shop - Search'} pageDescription={'Encuentra los mejores productos de Teslo aqui'}>
      <Typography variant="h1" component='h1'>Buscar producto</Typography>

        {
            foundProducts 
                ? <Typography variant="h2" sx={{mb: 1}} textTransform='capitalize'>Termino: {query}</Typography>
                : (
                    <Box display='flex'> 
                        <Typography variant="h2" sx={{mb: 1}}>No encontramos ningun producto con el termino</Typography>
                        <Typography variant="h2" sx={{ml: 1}} color='secondary'  textTransform='capitalize'>{query}</Typography>
                    </Box>
                ) 

        }


       <ProductList products={products} />
      
    </ShopLayouts>
  )
}



// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    
    const { query } = params as { query: string }

    if (query.length === 0) {
        return {
            redirect: {
                destination: '',
                permanent: true
            }
        }
    }


    let products = await dbProducts.getProductsByTerm(query)
    const foundProducts = products.length > 0
    //Retornar otros productos

    if ( !foundProducts ){
        products = await dbProducts.getProductsByTerm('shirts')

    }

    return {
        props: {
            products,
            foundProducts,
            query
        }
    }
}


export default SearchPage
