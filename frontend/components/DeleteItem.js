import { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_ITEMS_QUERY } from '../pages/index';

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
      title
    }
  }
`;
class DeleteItem extends Component {
  handleClick = async (e, deleteItem) => {
    const confirm = await window.confirm('Are you sure you want to delete this item?');

    if(confirm) {
      const deleted = await deleteItem();
    }
  }

  onUpdate(cache, payload){
    //1.get initial cached query
    const data = cache.readQuery({query: ALL_ITEMS_QUERY});
    //2. Remove the deleted item
    data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id );
    //3. update the cache data
    cache.writeQuery({query: ALL_ITEMS_QUERY, data });
  }

  render() {
    return (
      <Mutation mutation={DELETE_ITEM_MUTATION} variables={{id: this.props.id}} update={this.onUpdate}>
        {(deleteItem) => {
          return <button onClick={(e) => { this.handleClick(e, deleteItem)}}>{this.props.children}</button>
        }}
      </Mutation>
    )
  }
}

export default DeleteItem;