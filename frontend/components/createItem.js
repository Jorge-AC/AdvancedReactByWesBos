import { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from '../components/styles/Form';
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
    title: "",
    description: "",
    price: 0,
    image: "",
    largeImage: ""
  }
  
  handleChange = (e) => {
    const {type, value, name} = e.target;

    const val = type === "number" ? parseFloat(value): value;

    this.setState({[name]: val});
  }

  handleUpload = async (e) => {
    const formData = new FormData();
    formData.append('upload_preset', 'drawingsstore');
    formData.append('file', e.target.files[0])

    const res = await fetch('https://api.cloudinary.com/v1_1/jardilaqarbono/image/upload', {
      method: 'POST',
      body: formData
    });

    const file = await res.json();

    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    })
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
                <label htmlFor="title">
                  Title
                  <input 
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Product Name"
                    value={this.state.title} 
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
                    value={this.state.description} 
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
                    value={this.state.price} 
                    required 
                    onChange={this.handleChange}
                  />
                </label>
                <label htmlFor="image">
                  Image
                  <input 
                    type="file" 
                    name="image"
                    id="image"
                    required 
                    onChange={this.handleUpload}
                  />

                  { this.state.image && <img src={this.state.image} alt="Uploaded Image" width="200px"></img>}
                </label>
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