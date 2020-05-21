import { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import NProgress from 'nprogress';
import calcTotalPrice from '../lib/calcTotalPrice';
import User, { SIGNEDIN_USER_QUERY } from './User';

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    createOrder(token: $token) {
      id
    }
  }
`;
class CartCheckout extends Component {
  handleToken = async (res, createOrder) => {
    NProgress.start();
    const order = await createOrder({
      variables: { token: res.id }
    }).catch(err => console.log(err));

    Router.push({
      pathname: '/order',
      query: { id: order.data.createOrder.id }
    })
  };

  render() {
    return (
      <User>
        { (me) => (
          <Mutation mutation={ CREATE_ORDER_MUTATION } refetchQueries={ [{ query: SIGNEDIN_USER_QUERY }] }>{ (createOrder) => (
            <StripeCheckout
              stripeKey="pk_test_lXqeByKO0oYAe04pQYp3WF4g00gY0vWZgE"
              name="My Own Cart"
              email={ me.email }
              image={ me.cart.length && me.cart[0].item && me.cart[0].item.image || "" }
              description={ `Total items: ${ me.cart.reduce((acc, item) => (acc + item.quantity), 0) }` }
              amount={ calcTotalPrice(me.cart) }
              currency="USD"
              token={ (res) => { this.handleToken(res, createOrder) } }>
              { this.props.children }
            </StripeCheckout>
          ) }</Mutation>
        ) }
      </User>
    )
  }
}

export default CartCheckout;