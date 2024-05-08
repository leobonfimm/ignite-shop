import { ReactNode, createContext, useState } from 'react'

export interface Product {
  id: string
  name: string
  imageUrl: string
  price: string
  priceInCents: number
  qtd: number
  defaultPriceId: string
}

interface CartContextType {
  products: Product[]
  addProductToCart: (product: Product) => void
  removeProductFromCart: (productId: string) => void
}

export const CartContext = createContext({} as CartContextType)

interface CartContextProviderProps {
  children: ReactNode
}

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [products, setProducts] = useState<Product[]>([])

  function addProductToCart(product: Product) {
    const productAlreadyExists = products.findIndex(
      (item) => item.id === product.id,
    )

    if (productAlreadyExists === -1) {
      setProducts((state) => [...state, product])
    } else {
      setProducts((state) => {
        return state.map((item) => {
          if (item.id === product.id) {
            return {
              ...product,
              qtd: item.qtd + 1,
            }
          }

          return item
        })
      })
    }
  }

  function removeProductFromCart(productId: string) {
    setProducts((state) => state.filter((product) => product.id !== productId))
  }

  return (
    <CartContext.Provider
      value={{ products, addProductToCart, removeProductFromCart }}
    >
      {children}
    </CartContext.Provider>
  )
}
