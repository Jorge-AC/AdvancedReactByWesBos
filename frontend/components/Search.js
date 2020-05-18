import { Component } from "react";
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from "lodash.debounce";
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

const SEARCH_ITEMS_QUERY = gql`
  query SEARCH_ITEMS_QUERY($searchTerm: String) {
    items(where: {
        OR: [{title_contains: $searchTerm}, {description_contains: $searchTerm}]
      }
    ){
      id
      title
      image
    }
  }
`;

class Search extends Component {
  state = {
    items: [],
    loading: false
  };

  handleChange = debounce(async (e, client) => {
    this.setState({ loading: true });
    const { target } = e;

    const res = await client.query({
      query: SEARCH_ITEMS_QUERY,
      variables: { searchTerm: target.value }
    });

    this.setState({ items: res.data.items, loading: false })
  }, 500);

  render() {
    return (
      <SearchStyles>
        <div>
          <ApolloConsumer>
            { client => (
              <input type="text" placeholder="Search" onChange={ (e) => {
                e.persist();
                this.handleChange(e, client);
              } } />
            ) }
          </ApolloConsumer>
          <DropDown>
            { this.state.items.map(item => (<DropDownItem key={ item.id }>
              <img width="100px" src={ item.image } alt={ item.title } />
              <p>{ item.title }</p>
            </DropDownItem>)) }
          </DropDown>
        </div>
      </SearchStyles>
    )
  }

}

export default Search;