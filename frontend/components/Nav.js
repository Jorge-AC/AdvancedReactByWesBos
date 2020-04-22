import Link from 'next/link';
import NavStyles from './styles/NavStyles';

const Nav = () => (
  <div>
    <NavStyles>
      <Link href="/">
        <a>Items</a>
      </Link>
      <Link href="/sell">
        <a>Sell</a>
      </Link>
      <Link href="/orders">
        <a>Orders</a>
      </Link>
      <Link href="/account">
        <a>My Account</a>
      </Link>
      <Link href="/sign">
        <a>Sign In</a>
      </Link>
      <Link href="/cart">
        <a>Cart</a>
      </Link>
    </NavStyles>
  </div>
)

export default Nav;
