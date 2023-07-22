import ShopLayouts from "@/components/layouts/ShopLayouts"
import { FullScreenLoading } from "@/components/products"
import ProductList from "@/components/products/ProductList"
import { useProducts } from "@/hooks"
import {Typography } from "@mui/material"
import { NextPage } from "next"


const HomePage: NextPage = () => {

  const {products, isLoading} = useProducts('products')

  return (
    <ShopLayouts title={'Teslo-Shop - Home'} pageDescription={'Encuentra los mejores productos de Teslo aqui'}>
      <Typography variant="h1" component='h1'>Tienda</Typography>
      <Typography variant="h2" sx={{mb: 1}}>Todos los productos</Typography>

      {
        isLoading 
          ? <FullScreenLoading />
          : <ProductList products={products} />
      }

      
    </ShopLayouts>
  )
}


export default HomePage
