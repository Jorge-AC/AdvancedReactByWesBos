import { Component } from "react";
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from "lodash.debounce";
import Downshift, { resetIdCounter } from "downshift";
import Router from "next/router";
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
    resetIdCounter();
    return (
      <SearchStyles>
        <Downshift itemToString={ (item) => item ? item.title : '' } onChange={ (item) => { Router.push({ pathname: '/item', query: { id: item.id } }) } }>
          { ({ getInputProps, getItemProps, inputValue, highlightedIndex, isOpen }) => (
            <div>
              <ApolloConsumer>
                { client => (
                  <input
                    { ...getInputProps({
                      type: 'search',
                      placeholder: 'Search item',
                      className: this.state.loading ? 'loading' : '',
                      onChange: (e) => {
                        e.persist();
                        this.handleChange(e, client);
                      }
                    }) } />
                ) }
              </ApolloConsumer>
              <DropDown>
                { isOpen && this.state.items.map((item, index) => (
                  <DropDownItem { ...getItemProps({
                    key: item.id,
                    highlighted: index === highlightedIndex,
                    item
                  }) }>
                    <img width="100px" src={ item.image } alt={ item.title } />
                    <p>{ item.title }</p>
                  </DropDownItem>
                )) }
                { isOpen && !this.state.items.length && <DropDownItem>{ <p>No item found for { inputValue }</p> }</DropDownItem> }
              </DropDown>
            </div>
          ) }
        </Downshift>
      </SearchStyles>
    )
  }
}

export default Search;