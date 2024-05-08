import { CartContext } from '@/context/CartContext'
import { SidebarMenuContext } from '@/context/SidebarMenuContext'
import {
  ListProductContainer,
  ProductContent,
  ProductDetails,
  PurchaseDetails,
  SidebarContainer,
  SidebarMenuContent,
  SummaryPurchase,
  TotalPurchaseContainer,
} from '@/styles/components/sidebar-menu'
import axios from 'axios'
import Image from 'next/image'
import { X } from 'phosphor-react'
import { useContext, useState } from 'react'

export function SidebarMenu() {
  const { drawerSidebarMenu } = useContext(SidebarMenuContext)
  const { products, removeProductFromCart } = useContext(CartContext)
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  const totalPrice = products.reduce((acc, item) => {
    return acc + item.priceInCents * item.qtd
  }, 0)

  const totalProducts = products
    .reduce((acc, item) => {
      return acc + item.qtd
    }, 0)
    .toString()

  const totalPriceFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(totalPrice / 100)

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)
      const response = await axios.post(`/api/checkout`, {
        products,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (err) {
      alert('Falha ao redirecionar ao checkout!')
    } finally {
      setIsCreatingCheckoutSession(false)
    }
  }

  return (
    <SidebarContainer>
      <SidebarMenuContent>
        <button type="button" onClick={drawerSidebarMenu}>
          <X size={24} />
        </button>

        <PurchaseDetails>
          <h1>Sacola de Compras</h1>

          <ListProductContainer>
            {products.map((product) => (
              <ProductDetails key={product.id}>
                <Image
                  src={product.imageUrl}
                  width={100}
                  height={93}
                  alt={product.name}
                  priority
                />

                <ProductContent>
                  <h3>
                    {product.qtd}x {product.name}
                  </h3>
                  <strong>{product.price}</strong>

                  <button onClick={() => removeProductFromCart(product.id)}>
                    Remover
                  </button>
                </ProductContent>
              </ProductDetails>
            ))}
          </ListProductContainer>
        </PurchaseDetails>

        <TotalPurchaseContainer>
          <SummaryPurchase>
            <span>Quantidade</span>
            <span className="qtd-products">{`${totalProducts} itens`}</span>
          </SummaryPurchase>
          <SummaryPurchase>
            <strong>Preço</strong>
            <strong className="total-price">{totalPriceFormatted}</strong>
          </SummaryPurchase>

          <button
            onClick={handleBuyProduct}
            disabled={products.length === 0 || isCreatingCheckoutSession}
          >
            Finalizar Compra
          </button>
        </TotalPurchaseContainer>
      </SidebarMenuContent>
    </SidebarContainer>
  )
}
