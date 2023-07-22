import ShopLayouts from "@/components/layouts/ShopLayouts"
import { FullScreenLoading } from "@/components/products"
import ProductList from "@/components/products/ProductList"
import { useProducts } from "@/hooks"
import {Typography } from "@mui/material"
import { NextPage } from "next"


const WomenPage: NextPage = () => {

  const {products, isLoading} = useProducts('/products?gender=women')

  return (
    <ShopLayouts title={'Teslo-Shop - Womens'} pageDescription={'Encuentra los mejores productos de Teslo para Mujeres'}>
      <Typography variant="h1" component='h1'>Mujeres</Typography>
      <Typography variant="h2" sx={{mb: 1}}>Productos para Mujeres</Typography>

      {
        isLoading 
          ? <FullScreenLoading />
          : <ProductList products={products} />
      }

      
    </ShopLayouts>
  )
}


export default WomenPage
