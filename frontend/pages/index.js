import Link from 'next/link';

const home = props => {
    return <div>
        <Link href="/sell">
            <a>Sell</a>
        </Link>

        <p>Home Page</p>
    </div>
}

export default home;