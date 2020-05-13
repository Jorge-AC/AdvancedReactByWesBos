import { Component } from "react";
import styled from 'styled-components';
import formatMoney from '../lib/formatMoney';
import PropTypes from 'prop-types';

const ItemStyled = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.lightgrey };
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 10px;
  }
  h3,
  p {
    margin: 0;
  }
`;

class CartItem extends Component {
  render() {
    const { quantity, item } = this.props.cartItem;

    return (
      <ItemStyled>
        <img width="100px" src={ item.image } alt={ item.title }></img>
        <div className="cart-item-details">
          <h3>{ item.title }</h3>
          <p>
            { formatMoney(item.price * quantity) }
            { ' - ' }
            <em>
              { quantity } &times; { formatMoney(item.price) } each
            </em>
          </p>
        </div>
      </ItemStyled>
    )
  }
}

CartItem.propTypes = {
  cartItem: PropTypes.object.isRequired,
};

export default CartItem;