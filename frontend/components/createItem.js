import { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from '../components/styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!,
    $description: String!,
    $price: Int!,
    $image: String,
    $largeImage: String
  ) {
    createItem (
      title: $title,
      description: $description,
      price: $price,
      image: $image,
      largeImage: $largeImage
    ) {
      id
    }
  }
`;
class createItem extends Component {
  state = {
    title: "Product title",
    description: "Product description",
    price: 0,
    image: "product.png",
    largeImage: "largeProduct.png"
  }
  
  handleChange = (e) => {
    const {type, value, name} = e.target;

    const val = type === "number" ? parseFloat(value): value;

    this.setState({[name]: val});
  }

  render() {
    return (
      <div>
        <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
          {(createItem, {error, loading}) => (
            <Form onSubmit={ async e => {
              e.preventDefault();
              const {data} = await createItem();
              
              if(data) {
                Router.push({
                  pathname: '/item',
                  query: {
                    id: data.createItem.id
                  }
                })
              }
            }}>
              <Error error={error}></Error>
              <fieldset disabled={loading} aria-busy={loading}>
                Title
                <input 
                  type="text"
                  name="title"
                  id="title"
                  value={this.state.title} 
                  required 
                  onChange={this.handleChange}
                />
                Description
                <textarea 
                  type="text" 
                  name="description"
                  id="description"
                  value={this.state.description} 
                  required 
                  onChange={this.handleChange}
                />
                Price
                <input 
                  type="number" 
                  name="price"
                  id="price"
                  value={this.state.price} 
                  required 
                  onChange={this.handleChange}
                />
                Image
                <input 
                  type="text" 
                  name="image"
                  id="image"
                  value={this.state.image} 
                  required 
                  onChange={this.handleChange}
                />
                Large Image
                <input 
                  type="text" 
                  name="largeImage"
                  id="largeImage"
                  value={this.state.largeImage} 
                  required 
                  onChange={this.handleChange}
                />
                <button type="submit">Send</button>
              </fieldset>
            </Form>
          )}
        </Mutation>
      </div>
    )
  }
}

export default createItem;