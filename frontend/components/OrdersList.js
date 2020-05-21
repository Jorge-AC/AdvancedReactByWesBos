import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { formatDistance } from 'date-fns';
import Link from 'next/link';
import Error from './ErrorMessage';
import OrderItemStyles from './styles/OrderItemStyles';
import formatMoney from '../lib/formatMoney';

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    orders(orderBy: createdAt_DESC) {
      id
      createdAt
      total
      charge
      items {
        id
        quantity
        price
        title
        image
      }
    }
  }
`;
const OrdersList = props => (
  <Query query={ USER_ORDERS_QUERY }>
    { ({ data: { orders }, loading, error }) => {
      if (loading) return <p>Loading...</p>
      if (error) return <Error error={ error }></Error>
      return <ul>
        {
          orders.map(order => (
            <OrderItemStyles key={ order.id }>
              <Link href={ {
                pathname: '/order',
                query: { id: order.id }
              } }>
                <a>
                  < div className="order-meta" >
                    <div><span>Total Products</span> <span>{ order.items.length }</span></div>
                    <div>Total Items { order.items.reduce((acc, item) => (acc + item.quantity), 0) }</div>
                    <div>Created { formatDistance(order.createdAt, Date.now()) }</div>
                    <div>Total { formatMoney(order.total) }</div>
                  </div>
                  <div className="images">
                    { order.items.map(item => (
                      <img key={ item.id } src={ item.image } alt={ item } />
                    )) }
                  </div>
                </a>
              </Link>
            </OrderItemStyles>
          ))
        }
      </ul>
    } }
  </Query >
)

export default OrdersList;