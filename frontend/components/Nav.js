import Link from 'next/link';
import { Mutation } from 'react-apollo';
import NavStyles from './styles/NavStyles';
import User from './User';
import SignOut from './SignOut';
import { CART_STATE_TOGGLE } from './Cart';
import CartCount from './CartCount';

const Nav = () => (
  <User>
    { (user) => {
      return <NavStyles>
        <Link href="/items">
          <a>Shop</a>
        </Link>
        { user && <>
          <Link href="/sell">
            <a>Sell</a>
          </Link>
          <Link href="/orders">
            <a>Orders</a>
          </Link>
          <Link href="/account">
            <a>My Account</a>
          </Link>
          <SignOut>Sign Out</SignOut>
          <Mutation mutation={ CART_STATE_TOGGLE }>
            { (toogleCart) => (
              <button onClick={ toogleCart }>
                My Cart
                { <CartCount count={ user.cart.reduce((acc, item) => (acc + item.quantity), 0) }></CartCount> }
              </button>
            ) }
          </Mutation>
        </>
        }
        { !user && <>
          <Link href="/signup">
            <a>Sign In</a>
          </Link>
        </>
        }
      </NavStyles>
    } }
  </User>
)

export default Nav;
