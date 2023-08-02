import { AuthProvider, CartProvider ,UIProvider } from '@/context'
import '@/styles/globals.css'
import { lightTheme } from '@/themes'
import { CssBaseline, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { SessionProvider } from "next-auth/react"
import { PayPalScriptProvider } from "@paypal/react-paypal-js";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT || ''}}>
          <SWRConfig 
            value={{
              // refreshInterval: 3000,
              fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
            }}
            >
            <AuthProvider>
              <CartProvider>
                <UIProvider>
                  <ThemeProvider theme={lightTheme}>
                    <CssBaseline />
                    <Component {...pageProps} />
                  </ThemeProvider>
                </UIProvider>
              </CartProvider>
            </AuthProvider>
          </SWRConfig>
        </PayPalScriptProvider>
    </SessionProvider>
  )
}
