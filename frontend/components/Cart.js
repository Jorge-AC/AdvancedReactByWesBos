import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import SickButton from './styles/SickButton';
import CloseButton from './styles/CloseButton';

const Cart = props => {
  return (
    <CartStyles open>
      <header>
        <CloseButton title="Close">&times;</CloseButton>
        <Supreme>Your Cart</Supreme>
        <p>You have X items in your cart</p>
      </header>
      <footer>
        <p>$10.10</p>
        <SickButton>Checkout</SickButton>
      </footer>
    </CartStyles>
  )
}

export default Cart;