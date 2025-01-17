import type { AppProps } from 'next/app'

import { Header } from '@/components/Header'
import { CartContextProvider } from '@/context/CartContext'
import { SidebarMenuProvider } from '@/context/SidebarMenuContext'
import { globalStyles } from '@/styles/global'
import { Container } from '@/styles/pages/app'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <SidebarMenuProvider>
        <Container>
          <Header />
          <Component {...pageProps} />
        </Container>
      </SidebarMenuProvider>
    </CartContextProvider>
  )
}
