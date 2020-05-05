import { Component } from "react";
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

const SIGNEDIN_USER_MUTATION = gql`
  query {
    me {
      name
      email
      id
    }
  }
`;

class User extends Component{
  render() {
    return (
      <Query query={SIGNEDIN_USER_MUTATION}>
        { ({data: { me }}) => (
          this.props.children(me)
        )}
      </Query>
    )
  }
}

User.propTypes = {
  children: PropTypes.func.isRequired
}

export default User;
export { SIGNEDIN_USER_MUTATION };