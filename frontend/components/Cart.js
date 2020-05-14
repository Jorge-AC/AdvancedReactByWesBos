import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { adopt } from 'react-adopt';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import SickButton from './styles/SickButton';
import CloseButton from './styles/CloseButton';
import User from './User';
import CartItem from './CartItem';
import calcTotalPrice from '../lib/calcTotalPrice';
import formatMoney from '../lib/formatMoney';

const CART_STATE_QUERY = gql`
  query CART_STATE_QUERY {
    cartOpen @client
  }
`;

const CART_STATE_TOGGLE = gql`
  mutation CART_STATE_TOGGLE {
    toogleCart @client
  }
`;

const Compose = adopt({
  me: ({ render }) => <User>{ render }</User>,
  toogleCart: ({ render }) => <Mutation mutation={ CART_STATE_TOGGLE }>{ render }</Mutation>,
  cartOpen: ({ render }) => <Query query={ CART_STATE_QUERY }>{ render }</Query>
})

const Cart = props => (
  <Compose>
    { ({ me, toogleCart, cartOpen }) => {
      if (!me) return null;
      const cart = me.cart;
      return (
        <CartStyles open={ cartOpen.data.cartOpen }>
          <header>
            <CloseButton onClick={ toogleCart } title="Close">&times;</CloseButton>
            <Supreme>Your Cart</Supreme>
            <p>You have { cart.length } item{ cart.length === 1 ? '' : 's' } in your cart</p>
            <ul>
              { cart.map(cartItem => <CartItem key={ cartItem.id } cartItem={ cartItem } />) }
            </ul>
          </header>
          <footer>
            <p>{ formatMoney(calcTotalPrice(cart)) }</p>
            <SickButton>Checkout</SickButton>
          </footer>
        </CartStyles>
      )
    } }
  </Compose>
)


export default Cart;
export { CART_STATE_QUERY };
export { CART_STATE_TOGGLE };