import { IProduct } from "@/interfaces"
import { Grid } from "@mui/material"
import ProductCard from "./ProductCard"

interface Props {
  products: IProduct[]
}

const ProductList:React.FC<Props> = ({ products }) => {
  return (
    <Grid container spacing={4}>
      {
        products.map(product => (
          <ProductCard product={product} key={product.slug}/>
        ))
      }
    </Grid>
  )
}


export default ProductList
