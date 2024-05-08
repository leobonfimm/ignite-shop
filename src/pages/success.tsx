import { stripe } from '@/lib/stripe'
import {
  ImageContainer,
  ImagesContainer,
  SuccessContainer,
} from '@/styles/pages/success'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'

interface SuccessProps {
  customerName: string
  quantity: number
  products: {
    imageUrl: string
  }[]
}

export default function Success({
  customerName,
  quantity,
  products,
}: SuccessProps) {
  console.log(customerName, quantity, products)

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <ImagesContainer>
          {products.map((product) => (
            <ImageContainer key={product.imageUrl}>
              <Image src={product.imageUrl} alt="" width={120} height={110} />
            </ImageContainer>
          ))}
        </ImagesContainer>

        <h1>Compra efetuada!</h1>

        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de{' '}
          <strong>{quantity}</strong> camisetas já está a caminho de sua casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const sessionId = query.session_id as string

  if (!sessionId) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session!.customer_details!.name
  const products = session.line_items!.data
  const totalProduct = products.reduce((acc, item) => acc + item.quantity!, 0)
  const productsImages = products.map((product) => {
    const priceProduct = product.price?.product as Stripe.Product
    return {
      imageUrl: priceProduct.images[0],
    }
  })

  return {
    props: {
      customerName,
      quantity: totalProduct,
      products: productsImages,
    },
  }
}
