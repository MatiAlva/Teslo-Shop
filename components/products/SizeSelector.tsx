import { ISize } from "@/interfaces"
import { Box, Button } from "@mui/material"

interface Props {
    selectedSize?: ISize,
    sizes: ISize[]

    //Metodo
    onSelectedSize: (size: ISize) => void
}


const SizeSelector:React.FC<Props> = ({ selectedSize, sizes, onSelectedSize }) => {
  return (
    <Box>
        {
            sizes.map(size => (
                <Button 
                    key={size} 
                    size="small" 
                    color={selectedSize === size ? 'primary' : 'info'}
                    onClick={() => onSelectedSize(size)}
                >
                    {size}
                </Button>

            ))
        }
    </Box>
  )
}

export default SizeSelector