import { styled } from '..'

export const HomeContainer = styled('main', {
  display: 'flex',
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px)/2))',
  marginLeft: 'auto',
  minHeight: 656,
})

export const ProductContainer = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  position: 'relative',
  overflow: 'hidden',
  minWidth: 540,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1,
    },
  },
})

export const ProductDetails = styled('div', {
  img: {
    objectFit: 'cover',
  },
})

export const ProductFooter = styled('footer', {
  position: 'absolute',
  bottom: '0',
  left: '0',
  right: '0',
  padding: '2rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  backgroundColor: 'rgba(0, 0, 0, 0.6)',

  transform: 'translateY(110%)',
  transition: 'all 0.2s ease-in-out',

  div: {
    display: 'flex',
    flexDirection: 'column',

    strong: {
      fontSize: '$lg',
      color: '$gray100',
    },

    span: {
      fontSize: '$xl',
      fontWeight: 'bold',
      color: '$green500',
    },
  },

  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '$green500',
    padding: '0.875rem',
    color: '$white',
    border: 0,
    cursor: 'pointer',
    borderRadius: 6,

    '&:hover': {
      opacity: 0.7,
      transition: 'opacity 0.2s',
    },
  },
})
