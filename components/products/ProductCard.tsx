import { IProduct } from "@/interfaces"
import { Grid, Card, CardActionArea, CardMedia, Box, Typography, Link, Chip } from "@mui/material"
import { useMemo, useState } from "react"
import NextLink from 'next/link'

interface Props {
    product: IProduct
}

const ProductCard: React.FC<Props> = ({ product}) => {

    const [isHovered, setIsHovered] = useState(false)
    const [isImageLoader, setIsImageLoader] = useState(false)

    const productImage = useMemo(() => {
        return isHovered 
        ? `/products/${product.images[1]}`
        : `/products/${product.images[0]}`
    },[isHovered, product.images])

  return (
    <Grid 
        item 
        xs={6} 
        sm={4}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
        <Card>
            <NextLink href={`/product/${product.slug}`}passHref legacyBehavior prefetch={false}>
                <Link>
                    <CardActionArea>
                        {
                            product.inStock === 0 && (
                                <Chip 
                                    color="primary" 
                                    label='No hay disponible'
                                    sx={{ position: "absolute", zIndex: 99, top: '10px', left: '10px' }}
                                />
                            )
                        }
                      
                        <CardMedia
                            className="fadeIn" 
                            component='img'
                            image={productImage}
                            alt={product.title}
                            onLoad={ () => setIsImageLoader(true)}
                        />
                    </CardActionArea>
                </Link>
            </NextLink>

        </Card>

        <Box sx={{ mt: 1, display: isImageLoader ? 'block' : 'none' }} className='fadeIn'>
            <Typography fontWeight={700}>{product.title}</Typography>
            <Typography fontWeight={500}>${ product.price}</Typography>
        </Box>
  </Grid>
  )
}


export default ProductCard
