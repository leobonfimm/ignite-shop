import { Product } from '@/context/CartContext'
import { stripe } from '@/lib/stripe'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { products } = req.body

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  if (!products) {
    return res.status(400).json({ error: 'Price not found' })
  }

  const successUrl = `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `http://localhost:3000/`

  const lineItems = products.map((product: Product) => {
    return {
      price: product.defaultPriceId,
      quantity: product.qtd,
    }
  })

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: lineItems,
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}
