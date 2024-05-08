import { styled } from '..'

export const HeaderContainer = styled('header', {
  padding: '2rem 1rem',
  width: '100%',
  maxWidth: 1100,
  margin: '0 auto',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const CartButton = styled('button', {
  position: 'relative',
  padding: '0.75rem',
  border: 0,
  background: '$gray800',
  borderRadius: 6,
  lineHeight: 0,
  color: '$gray100',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginLeft: 'auto',

  '&:not(:disabled):hover': {
    opacity: 0.7,
    transition: 'opacity 0.2s',
  },

  '&:disabled': {
    cursor: 'not-allowed',
    color: '$gray300',
  },

  span: {
    position: 'absolute',
    top: -7,
    right: -7,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    fontWeight: 'bold',
    fontSize: '14px',
    color: '$white',
    background: '$green300',
    width: '1.5rem',
    height: '1.5rem',
    outline: '3px solid $gray900',
  },
})
