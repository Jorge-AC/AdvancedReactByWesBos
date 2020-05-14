import { Component } from "react";
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SIGNEDIN_USER_QUERY } from './User';

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;

const RemoveStyled = styled.button`
  background: none;
  border: 0px;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.red };
  }
`;

class RemoveFromCart extends Component {
  update = (cache, payload) => {
    const data = cache.readQuery({ query: SIGNEDIN_USER_QUERY });

    data.me.cart = data.me.cart.filter(cartItem => {
      return cartItem.id !== payload.data.removeFromCart.id
    });

    cache.writeQuery({ query: SIGNEDIN_USER_QUERY, data })
  }

  render() {
    return (
      <Mutation
        mutation={ REMOVE_FROM_CART_MUTATION }
        variables={ { id: this.props.id } }
        update={ this.update }
        optimisticResponse={ {
          removeFromCart: {
            id: this.props.id,
            __typename: "CartItem"
          }
        } }>
        { (removeFromCart, { loading, error }) => (
          <RemoveStyled title="Remove Item" onClick={ removeFromCart } disabled={ loading }>x</RemoveStyled>
        ) }
      </Mutation>
    )
  }
}

RemoveFromCart.propTypes = {
  id: PropTypes.string.isRequired
}

export default RemoveFromCart;