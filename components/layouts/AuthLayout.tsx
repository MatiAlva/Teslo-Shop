import { Box } from "@mui/material"
import Head from "next/head"
import { ReactNode } from "react"

interface Props {
    title: string,
    children: ReactNode
}


const AuthLayout:React.FC<Props> = ({ children, title }) => {
  return (
    <>
        <Head>
            <title>{title}</title>
        </Head>

        <main>
            <Box display='flex' justifyContent='center' alignItems='center' height='calc(100vh - 200px)'>
                {children}
            </Box>
        </main>
    </>
  )
}

export default AuthLayout