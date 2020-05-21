import CheckLogStatus from '../components/checkLogStatus';
import Order from '../components/Order';

const OrderPage = props => {
  return (
    <CheckLogStatus>
      <Order id={ props.query.id }></Order>
    </CheckLogStatus>
  )
}

export default OrderPage;