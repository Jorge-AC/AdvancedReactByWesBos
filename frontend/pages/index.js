import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Item from '../components/Item';
import Pagination from '../components/Pagination';
import { perPage } from '../config';

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage }){
    items(skip: $skip, first: $first, orderBy: createdAt_DESC) {
      id
      title
      price
      image
      largeImage
      description
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth };
  margin: 0 auto;
`;

const home = props => {
  const page = (props.query.page || 1) * perPage - perPage;

  return (
    <Center>
      <Query query={ ALL_ITEMS_QUERY } variables={ {
        skip: page
      } }>
        { ({ data, error, loading }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>{ error.message }</p>
          return <div>
            <Pagination page={ props.query.page || 1 } />
            <ItemsList>
              { data.items.map(item => <Item item={ item } page={ page } key={ item.id }></Item>) }
            </ItemsList>
            <Pagination page={ props.query.page || 1 } />
          </div>
        } }
      </Query>
    </Center>
  )
}

export default home;
export { ALL_ITEMS_QUERY };