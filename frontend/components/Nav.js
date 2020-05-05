import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import User from './User';

const Nav = () => (
  <User>
    {(user) => {
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
          </>
        }
        { !user && <>
            <Link href="/signup">
              <a>Sign In</a>
            </Link>
          </>
        }
      </NavStyles>
    }}
  </User>
)

export default Nav;
