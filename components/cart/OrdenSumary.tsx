import { CartContext } from "@/context"
import { currency } from "@/utils"
import { CardContent, Grid, Typography } from "@mui/material"
import { useContext } from "react"

interface Props {
    orderValues?: {
        numberOfItem : number,
        subTotal : number, 
        total: number, 
        tax: number
    }
}


const OrdenSumary:React.FC<Props> = ({ orderValues }) => {

    const {numberOfItem, subTotal, total, tax} = useContext(CartContext)

    const summaryValues = orderValues ? orderValues : {numberOfItem, subTotal, total, tax} 



  return (
    <Grid container>
        
        <Grid item xs={6}>
            <Typography>N°. Productos</Typography>
        </Grid>

        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{summaryValues.numberOfItem} {summaryValues.numberOfItem > 1 ? 'productos' : 'producto'}</Typography>
        </Grid>

        <Grid item xs={6}>
            <Typography>Subtotal: </Typography>
        </Grid>

        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{currency.Format(summaryValues.subTotal)}</Typography>
        </Grid>

        <Grid item xs={6}>
            <Typography>Impuestos {Number(process.env.NEXT_PUBLIC_TAXT_RATE) * 100} %</Typography>
        </Grid>

        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{currency.Format(summaryValues.tax)}</Typography>
        </Grid>

        <Grid item xs={6} sx={{ mt:2 }}>
            <Typography variant="subtitle1">Total: </Typography>
        </Grid>

        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography variant="subtitle1">{currency.Format(summaryValues.total)}</Typography>
        </Grid>

    </Grid>
  )
}

export default OrdenSumary