import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { format } from 'date-fns'
import Error from './ErrorMessage';
import OrderStyles from './styles/OrderStyles';
import OrderItemStyles from './styles/OrderItemStyles';
import formatMoney from '../lib/formatMoney';

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    singleOrder(id: $id) {
      id
      total
      user {
        id
      }
      createdAt
      charge
      items {
        id
        title
        description
        price
        image
        quantity
      }
    }
  }
`;

const Order = props => {
  return (
    <Query query={ SINGLE_ORDER_QUERY } variables={ { id: props.id } }>
      { ({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <Error error={ error }></Error>
        return <OrderStyles>
          <p>
            <span>Id:</span>
            <span>{ props.id }</span>
          </p>
          <p>
            <span>Charge:</span>
            <span>{ data.singleOrder.charge }</span>
          </p>
          <p>
            <span>Date:</span>
            <span>{ format(data.singleOrder.createdAt, 'MMMM d YYYY h:mm a') }</span>
          </p>
          <p>
            <span>Total:</span>
            <span>{ formatMoney(data.singleOrder.total) }</span>
          </p>
          <div>
            <div>
              { data.singleOrder.items.map(item => (<OrderItemStyles key={ item.id }>
                <div className="order-item">
                  <img src={ item.image } alt={ item.title } />
                  <div>
                    <p>{ item.title }</p>
                    <p>{ item.description }</p>
                    <p>{ item.quantity } x { formatMoney(item.price) } Each</p>
                  </div>
                </div>
              </OrderItemStyles>))
              }
            </div>
          </div>
        </OrderStyles>
      } }
    </Query>
  )
}

export default Order;