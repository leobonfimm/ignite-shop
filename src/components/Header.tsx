import { CartContext } from '@/context/CartContext'
import { CartButton, HeaderContainer } from '@/styles/components/header'
import Image from 'next/image'
import { Bag } from 'phosphor-react'
import { useContext } from 'react'

import { SidebarMenuContext } from '@/context/SidebarMenuContext'
import { useRouter } from 'next/router'
import logoImg from '../assets/logo.svg'
import { SidebarMenu } from './SidebarMenu'

export function Header() {
  const { products } = useContext(CartContext)
  const { isDrawerSidebarMenu, drawerSidebarMenu } =
    useContext(SidebarMenuContext)
  const { pathname } = useRouter()

  if (!products) {
    return <h1>Loading...</h1>
  }

  const totalProducts = products.reduce((acc, item) => {
    return acc + item.qtd
  }, 0)

  return (
    <>
      <HeaderContainer>
        <Image src={logoImg} alt="" />

        {pathname !== '/success' && (
          <CartButton
            disabled={products.length === 0}
            onClick={drawerSidebarMenu}
          >
            <Bag size={24} />
            {products.length > 0 && (
              <span>{totalProducts > 9 ? '9+' : totalProducts}</span>
            )}
          </CartButton>
        )}
      </HeaderContainer>

      {isDrawerSidebarMenu && <SidebarMenu />}
    </>
  )
}
