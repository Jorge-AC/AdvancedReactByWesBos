import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Item from '../components/Item';
import Pagination from '../components/Pagination';

const ALL_ITEMS_QUERY = gql`
  query {
    items {
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
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

const home = props => (
  <Center>
    <Query query={ALL_ITEMS_QUERY}>
      { ({data, error, loading}) => {
        if(loading) return <p>Loading...</p>
        if(error) return <p>{error.message}</p>
        return <div>
          <Pagination page={props.query.page}/>
          <ItemsList>
            {data.items.map(item => <Item item={item} key={item.id}></Item>)}
          </ItemsList>
          <Pagination page={props.query.page}/>
        </div>
      }}
    </Query>
  </Center>
)

export default home;
export { ALL_ITEMS_QUERY };