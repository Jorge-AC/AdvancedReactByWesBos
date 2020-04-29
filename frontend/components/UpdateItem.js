import { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from '../components/styles/Form';
import Error from './ErrorMessage';

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $title: String,
    $description: String,
    $price: Int
    $id: ID!
  ) {
    updateItem (
      title: $title,
      description: $description,
      price: $price,
      id: $id
    ) {
      id
    }
  }
`;

const UPDATE_ITEM_QUERY = gql`
  query UPDATE_ITEM_QUERY($id: ID!){
    item(where: { id: $id }) {
      title
      description
      price
    }
  }
`;

class updateItem extends Component {
  state = {}
  
  handleChange = (e) => {
    const {type, value, name} = e.target;

    const val = type === "number" ? parseFloat(value): value;

    this.setState({[name]: val});
  }

  onSubmit = async (e, updateItem) => {
    e.preventDefault();
    const res = await updateItem();
    
    if(res.data) {
      Router.push({
        pathname: '/item',
        query: {
          id: res.data.updateItem.id
        }
      })
    }
  }

  render() {
    return (
      <div>
        <Query query={UPDATE_ITEM_QUERY} variables={this.props}>
          {({ data, loading, error}) => {
            if(data.item === null) { return <div>No item found for id {this.props.id}</div>}
            if(loading) { return <div>Loading...</div>}
            if(error) { return <Error error={error}></Error>}
            return <Mutation mutation={UPDATE_ITEM_MUTATION} variables={{ ...this.state, id: this.props.id }}>
              {(updateItem, {error, loading}) => (
                <Form onSubmit={(e) => { this.onSubmit(e, updateItem) }}>
                  <Error error={error}></Error>
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="title">
                      Title
                      <input 
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Product Name"
                        defaultValue={data.item.title} 
                        required 
                        onChange={this.handleChange}
                        />
                    </label>
                    <label htmlFor="description">
                      Description
                      <textarea 
                        type="text" 
                        name="description"
                        id="description"
                        placeholder="Enter the product description"
                        defaultValue={data.item.description} 
                        required 
                        onChange={this.handleChange}
                        />
                    </label>
                    <label htmlFor="price">
                      Price
                      <input 
                        type="number" 
                        name="price"
                        id="price"
                        placeholder="Product Price"
                        defaultValue={data.item.price} 
                        required 
                        onChange={this.handleChange}
                      />
                    </label>
                    <button type="submit">Send{ loading ? 'ing' : null}</button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          }}
        </Query>
      </div>
    )
  }
}

export default updateItem;