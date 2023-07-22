import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"

interface Props {
  currentValue: number,
  maxValue: number

  //Metodo
  updatedQuantit: (newValue : number) => void
}

const ItemCounter:React.FC<Props> = ({ currentValue, maxValue, updatedQuantit }) => {

  const addOnRemove = (value : number) => {
    if (value === -1) {
      if( currentValue === 1) return

      return updatedQuantit(currentValue - 1)
    }


    if(currentValue >= maxValue) return

    updatedQuantit(currentValue + 1)
  }


  return (
    <Box display='flex' alignItems='center'>
        <IconButton onClick={() => addOnRemove(-1)}>
            <RemoveCircleOutline />
        </IconButton>
        <Typography sx={{width:40, textAlign:'center'}}>{currentValue}</Typography>
        <IconButton onClick={() => addOnRemove(+1)}>
            <AddCircleOutline />
        </IconButton>
    </Box>
  )
}

export default ItemCounter
