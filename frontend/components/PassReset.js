import { Component } from "react";
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Error from './ErrorMessage';
import Form from './styles/Form';
import { SIGNEDIN_USER_QUERY } from './User';

const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION($password: String!, $confirmPassword: String!, $resetToken: String!) {
    resetPassword(password: $password, confirmPassword: $confirmPassword, resetToken: $resetToken) {
      id
      name
      email
      permissions
      password
    }
  }
`;

class PassReset extends Component{
  static propTypes = {
    resetToken: PropTypes.string.isRequired,
  };

  state = {
    password: "",
    confirmPassword: ""
  }

  updateState = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return <Mutation 
    refetchQueries={[{query: SIGNEDIN_USER_QUERY}]} 
    mutation={RESET_PASSWORD_MUTATION} 
    variables={{ 
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      resetToken: this.props.resetToken
    }}>
      {(resetPassword, {error, loading}) => {
        return <Form method="POST" onSubmit={ async(e) => {
          e.preventDefault();
          await resetPassword();

          this.setState({password: "", confirmPassword:""})
        }}>

          <fieldset disabled={loading} aria-busy={loading}>
            <Error error={error}></Error>
            <label htmlFor="resetPassword">
              Password
              <input type="password" id="resetPassword" name="password" placeholder="Insert your password" value={this.state.password} onChange={this.updateState}/>
            </label>
            <label htmlFor="confirmResetPassword">
              Confirm Password
              <input type="password" id="confirmResetPassword" name="confirmPassword" placeholder="Confirm your password" value={this.state.confirmPassword} onChange={this.updateState}/>
            </label>
            <button type="submit">Reset your Password</button>
          </fieldset>        
        </Form>
      }}
    </Mutation>
  }
}

export default PassReset;