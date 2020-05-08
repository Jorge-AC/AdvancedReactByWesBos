import { Component } from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import Proptypes from "prop-types";
import Error from "./ErrorMessage";
import Table from "./styles/Table";
import SickButton from "./styles/SickButton";

const PERMISSIONS = [
  "ADMIN",
  "USER",
  "ITEMCREATE",
  "ITEMUPDATE",
  "ITEMDELETE",
  "PERMISSIONUPDATE",
];

const USERS_PERMISSIONS_QUERY = gql`
  query {
    usersPermissions {
      name
      email
      permissions
      id
    }
  }
`;

const UPDATE_USER_PERMISSIONS = gql`
  mutation UPDATE_USER_PERMISSION($permissions: [Permission], $userId: ID!) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      name
      email
      permissions
      id
    }
  }
`;

const Permissions = props => {
  return (
    <Query query={ USERS_PERMISSIONS_QUERY }>
      { ({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <Error error={ error }></Error>;
        return (
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                { PERMISSIONS.map(permission => {
                  return <th key={ permission }>{ permission }</th>;
                }) }
                <th> Update </th>
              </tr>
            </thead>
            <tbody>
              { data.usersPermissions.map(user => {
                return <User user={ user } key={ user.id } />;
              }) }
            </tbody>
          </Table>
        );
      } }
    </Query>
  );
};

class User extends Component {
  static propTypes = {
    user: Proptypes.shape({
      name: Proptypes.string,
      email: Proptypes.string,
      id: Proptypes.string,
      permissions: Proptypes.array,
    }).isRequired,
  };

  state = {
    updatedPermissions: [...this.props.user.permissions],
  };

  handleChange = (e) => {
    let permissions = [...this.state.updatedPermissions];

    if (e.target.checked) {
      permissions.push(e.target.value)
    } else {
      permissions = permissions.filter(permission => permission !== e.target.value)
    }

    this.setState({ updatedPermissions: permissions })
  };

  render() {
    let { user } = this.props;

    return (
      <Mutation
        mutation={ UPDATE_USER_PERMISSIONS }
        variables={ {
          permissions: this.state.updatedPermissions,
          userId: user.id
        } }>
        { (updatePermissions, { error, loading }) => (
          <>
            { error && <tr><td><Error error={ error }></Error></td></tr> }
            <tr>
              <td>{ user.name }</td>
              <td>{ user.email }</td>
              { PERMISSIONS.map(permission => (
                <td key={ permission }>
                  <label htmlFor={ `${ user.id }-permission-${ permission }` }>
                    <input
                      type="checkbox"
                      id={ `${ user.id }-permission-${ permission }` }
                      checked={ this.state.updatedPermissions.includes(permission) }
                      value={ permission }
                      onChange={ this.handleChange }
                    />
                  </label>
                </td>
              )) }
              <td>
                <SickButton onClick={ updatePermissions }>Updad{ loading ? 'ing' : 'e' }</SickButton>
              </td>
            </tr>
          </>
        ) }
      </Mutation>
    );
  }
}

export default Permissions;
