import { useKeenSlider } from 'keen-slider/react'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Stripe from 'stripe'

import {
  HomeContainer,
  ProductContainer,
  ProductDetails,
  ProductFooter,
} from '@/styles/pages/home'

import { CartContext, Product } from '@/context/CartContext'
import { stripe } from '@/lib/stripe'
import 'keen-slider/keen-slider.min.css'
import Head from 'next/head'
import Link from 'next/link'
import { Bag } from 'phosphor-react'
import { useContext } from 'react'

interface HomeProps {
  products: Product[]
}

export default function Home({ products }: HomeProps) {
  const { addProductToCart } = useContext(CartContext)
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: false,
    rtl: false,
    slides: {
      perView: 'auto',
      spacing: 48,
    },
  })

  function handleAddNewProductToCart(product: Product) {
    addProductToCart({ ...product, qtd: 1 })
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => (
          <ProductContainer key={product.id} className="keen-slider__slide">
            <Link href={`/product/${product.id}`} prefetch={false}>
              <ProductDetails>
                <Image
                  src={product.imageUrl}
                  width={520}
                  height={480}
                  alt={product.name}
                  priority
                />
              </ProductDetails>
            </Link>

            <ProductFooter>
              <div>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </div>

              <button onClick={() => handleAddNewProductToCart(product)}>
                <Bag size={32} />
              </button>
            </ProductFooter>
          </ProductContainer>
        ))}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount! / 100),
      priceInCents: price.unit_amount!,
      defaultPriceId: price.id,
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}
