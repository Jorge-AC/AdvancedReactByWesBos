import { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import calcTotalPrice from '../lib/calcTotalPrice';
import User from './User';

class CartCheckout extends Component {
  handleToken = (res) => {
    console.log(res)
  }

  render() {
    return (
      <User>
        { (me) => (
          <StripeCheckout
            stripeKey="pk_test_lXqeByKO0oYAe04pQYp3WF4g00gY0vWZgE"
            name="My Own Cart"
            email={ me.email }
            image={ me.cart[0].item && me.cart[0].item.image }
            description={ `Total items: ${ me.cart.reduce((acc, item) => (acc + item.quantity), 0) }` }
            amount={ calcTotalPrice(me.cart) }
            currency="USD"
            token={ (res) => { this.handleToken(res) } }>
            { this.props.children }
          </StripeCheckout>
        ) }
      </User>
    )
  }
}

export default CartCheckout;