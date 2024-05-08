import { CartContext } from '@/context/CartContext'
import { stripe } from '@/lib/stripe'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '@/styles/pages/product'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useContext } from 'react'
import Stripe from 'stripe'

interface Product {
  id: string
  name: string
  imageUrl: string
  price: string
  description: string
  defaultPriceId: string
  priceInCents: number
}

interface ProductProps {
  product: Product
}

export default function Product({ product }: ProductProps) {
  const { addProductToCart } = useContext(CartContext)

  function handleAddNewProductToCart({
    id,
    imageUrl,
    name,
    price,
    priceInCents,
    defaultPriceId,
  }: Product) {
    addProductToCart({
      id,
      imageUrl,
      name,
      price,
      priceInCents,
      qtd: 1,
      defaultPriceId,
    })
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button onClick={() => handleAddNewProductToCart(product)}>
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Buscar os produtos mais vendidos / mais acessados

  return {
    paths: [{ params: { id: 'prod_Pz8nRe50XoX7hi' } }],
    fallback: 'blocking',
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params!.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount! / 100),
        description: product.description,
        defaultPriceId: price.id,
        priceInCents: price.unit_amount!,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
