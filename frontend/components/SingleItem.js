import { Component } from "react";
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import styled from 'styled-components';
import Head from 'next/head';

const SINGLE_ITEM_QUERY= gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: {id: $id}) {
      title
      description
      price
      largeImage
    }
  }
`;

const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`;

class SingleItem extends Component {
  render() {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{id: this.props.id}}>
        {({data, loading, error}) => {
          if(error) { return <Error error={error}></Error>};
          if(loading) { return <div>Loading...</div> };
          if(data.item === null) { return <div>No item found for id {this.props.id}</div>};
          const item = data.item;
          return <SingleItemStyles>
            <Head>
              <title>Sick Fits | {item.title}</title>
            </Head>
            <img src={item.largeImage} alt={item.title} />
            <div className="details">
              <h2>Viewing {item.title}</h2>
              <p>{item.description}</p>
            </div>
          </SingleItemStyles>
        }}
      </Query>
    )
  }
}

export default SingleItem;