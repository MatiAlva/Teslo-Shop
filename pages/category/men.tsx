import ShopLayouts from "@/components/layouts/ShopLayouts"
import { FullScreenLoading } from "@/components/products"
import ProductList from "@/components/products/ProductList"
import { useProducts } from "@/hooks"
import {Typography } from "@mui/material"
import { NextPage } from "next"


const MenPage: NextPage = () => {

  const {products, isLoading} = useProducts('/products?gender=men')

  return (
    <ShopLayouts title={'Teslo-Shop - Mens'} pageDescription={'Encuentra los mejores productos de Teslo para Hombres'}>
      <Typography variant="h1" component='h1'>Hombres</Typography>
      <Typography variant="h2" sx={{mb: 1}}>Productos para Hombres</Typography>

      {
        isLoading 
          ? <FullScreenLoading />
          : <ProductList products={products} />
      }

      
    </ShopLayouts>
  )
}


export default MenPage
