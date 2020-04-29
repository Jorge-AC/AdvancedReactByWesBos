import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import Head from 'next/head';
import { perPage } from '../config';
import PaginationStyles from './styles/PaginationStyles';

const PAGINATION_QUERY = gql`
  query {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = props => {
  return (
    <Query query={PAGINATION_QUERY}>
      {({data, error, loading}) => {
        const count = data.itemsConnection.aggregate.count;
        const pages = Math.ceil( count / perPage);
        const currentPage = parseFloat(props.page);
        return <PaginationStyles>
          <Head>
            <title>Items - Page {currentPage} of { pages }</title>
          </Head>
          <Link href={{
            pathname: '/items',
            query: { page: currentPage -1}
          }}>
            <a aria-disabled={ currentPage <= 1}>Prev</a>
          </Link>

          <p>Page { currentPage || 1} of {pages}</p>
          <p>Total items: {count}</p>

          <Link href={{
            pathname: '/items',
            query: { page: currentPage +1}
          }}>
            <a aria-disabled={ currentPage >= pages}>Next</a>
          </Link>
        </PaginationStyles>
      }}
    </Query>
  )
}

export default Pagination;