import ShopLayouts from "@/components/layouts/ShopLayouts"
import { FullScreenLoading } from "@/components/products"
import ProductList from "@/components/products/ProductList"
import { useProducts } from "@/hooks"
import {Typography } from "@mui/material"
import { NextPage } from "next"


const KidPage: NextPage = () => {

  const {products, isLoading} = useProducts('/products?gender=kid')

  return (
    <ShopLayouts title={'Teslo-Shop - Kid'} pageDescription={'Encuentra los mejores productos de Teslo para Niños'}>
      <Typography variant="h1" component='h1'>Niños</Typography>
      <Typography variant="h2" sx={{mb: 1}}>Productos para Niños</Typography>

      {
        isLoading 
          ? <FullScreenLoading />
          : <ProductList products={products} />
      }

      
    </ShopLayouts>
  )
}


export default KidPage
