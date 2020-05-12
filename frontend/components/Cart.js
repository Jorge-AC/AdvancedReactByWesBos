import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import SickButton from './styles/SickButton';
import CloseButton from './styles/CloseButton';

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

const Cart = props => {
  return (
    <Mutation mutation={ CART_STATE_TOGGLE }>
      { (toogleCart) => (
        <Query query={ CART_STATE_QUERY }>
          { ({ data }) => (
            <CartStyles open={ data.cartOpen }>
              <header>
                <CloseButton onClick={ toogleCart } title="Close">&times;</CloseButton>
                <Supreme>Your Cart</Supreme>
                <p>You have X items in your cart</p>
              </header>
              <footer>
                <p>$10.10</p>
                <SickButton>Checkout</SickButton>
              </footer>
            </CartStyles>
          ) }
        </Query>
      ) }
    </Mutation>
  )
}

export default Cart;
export { CART_STATE_QUERY };
export { CART_STATE_TOGGLE };