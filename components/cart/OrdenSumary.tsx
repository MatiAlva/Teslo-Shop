import { CartContext } from "@/context"
import { currency } from "@/utils"
import { CardContent, Grid, Typography } from "@mui/material"
import { useContext } from "react"

const OrdenSumary = () => {

    const {numberOfItem, subTotal, total, tax} = useContext(CartContext)

  return (
    <Grid container>
        
        <Grid item xs={6}>
            <Typography>N°. Productos</Typography>
        </Grid>

        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{numberOfItem} {numberOfItem > 1 ? 'productos' : 'subTotal'}</Typography>
        </Grid>

        <Grid item xs={6}>
            <Typography>Subtotal: </Typography>
        </Grid>

        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{currency.Format(subTotal)}</Typography>
        </Grid>

        <Grid item xs={6}>
            <Typography>Impuestos {Number(process.env.NEXT_PUBLIC_TAXT_RATE) * 100} %</Typography>
        </Grid>

        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{currency.Format(tax)}</Typography>
        </Grid>

        <Grid item xs={6} sx={{ mt:2 }}>
            <Typography variant="subtitle1">Total: </Typography>
        </Grid>

        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography variant="subtitle1">{currency.Format(total)}</Typography>
        </Grid>

    </Grid>
  )
}

export default OrdenSumary