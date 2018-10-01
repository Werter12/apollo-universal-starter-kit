export default {
  webhookUrl: '/stripe/webhook',
  publicKey: process.env.STRIPE_PUBLIC_KEY, // or 'your-public-key', for development
  secretKey: process.env.STRIPE_SECRET_KEY, // or 'your-private-key', for development
  endpointSecret: process.env.STRIPE_ENDPOINT_SECRET,
  // Default Stripe product object
  product: {
    name: 'Magic number',
    type: 'service'
  },
  // Default Stripe plan object
  plan: {
    id: 'basic',
    nickname: 'Basic Plan',
    amount: 1000,
    interval: 'month',
    currency: 'usd'
  }
};
