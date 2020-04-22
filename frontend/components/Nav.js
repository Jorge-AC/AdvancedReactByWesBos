import Link from 'next/link';

const Nav = () => (
    <div>
        <ul>
            <li>
            <Link href="/">
                    <a>Home</a>
                </Link>
            </li>
            <li>
            <Link href="/sell">
                <a>Sell</a>
            </Link>
            </li>
        </ul>
    </div>
)

export default Nav;
