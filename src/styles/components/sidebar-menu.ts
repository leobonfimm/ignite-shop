import { styled } from '..'

export const SidebarContainer = styled('aside', {
  height: '100vh',
  position: 'absolute',
  width: 480,
  background: '$gray800',
  zIndex: 999,
  top: 0,
  right: 0,

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
})

export const SidebarMenuContent = styled('main', {
  position: 'relative',
  padding: '3rem',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  '> button': {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '$gray100',
    border: 0,
    cursor: 'pointer',
    backgroundColor: 'transparent',
    right: 24,
    top: 24,
    lineHeight: 0,

    '&:hover': {
      opacity: 0.7,
      transition: 'opacity 0.2s',
    },
  },
})

export const PurchaseDetails = styled('div', {
  marginTop: '1.5rem',
  flex: 1,

  img: {
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: 6,
  },

  h1: {
    marginBottom: '2rem',
  },
})

export const ListProductContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',

  maxHeight: 600,
  overflowY: 'auto',
})

export const ProductDetails = styled('div', {
  display: 'flex',
  alignItems: 'stretch',
  gap: '1.25rem',
})

export const ProductContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',

  h3: {
    fontSize: '$md',
    lineHeight: 1.6,
    color: '$gray300',
  },

  strong: {
    fontSize: '$md',
    lineHeight: 1.6,
  },

  button: {
    border: 0,
    background: 'transparent',
    marginTop: 'auto',
    color: '$green500',
    cursor: 'pointer',
    lineHeight: 1.6,
    fontSize: '1rem',

    '&:hover': {
      color: '$green300',
      transition: 'color 0.2s',
    },
  },
})

export const TotalPurchaseContainer = styled('footer', {
  display: 'flex',
  flexDirection: 'column',
  marginTop: 'auto',

  button: {
    marginTop: '3.4375rem',
    border: 0,
    cursor: 'pointer',
    padding: '1.25rem 0',
    borderRadius: 6,
    background: '$green500',
    color: '$white',
    fontWeight: 'bold',
    fontSize: '$md',
    width: '100%',

    '&:not(:disabled):hover': {
      background: '$green300',
      transition: 'background 0.2s',
    },

    '&:disabled': {
      opacity: 0.7,
      cursor: 'not-allowed',
    },
  },
})

export const SummaryPurchase = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  '& + &': {
    marginTop: '0.5rem',
  },

  span: {
    fontSize: '1rem',
    lineHeight: 1.6,

    '&.qtd-products': {
      fontSize: '$md',
    },
  },

  strong: {
    fontSize: '$md',
    lineHeight: 1.6,

    '&.total-price': {
      fontSize: '$xl',
    },
  },
})
