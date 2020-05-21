import OrdersList from '../components/OrdersList';
import CheckLogStatus from '../components/checkLogStatus';
const OrdersPage = props => (
  <CheckLogStatus>
    <h2>Orders:</h2>
    <OrdersList></OrdersList>
  </CheckLogStatus>
)

export default OrdersPage;