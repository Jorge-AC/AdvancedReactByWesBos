import { Component } from "react";
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import Form from './styles/Form';
import { SIGNEDIN_USER_QUERY } from './User';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      name
      email
      permissions
      password
    }
  }
`;

class SignIn extends Component{
  state = {
    email: "",
    password: ""
  }

  updateState = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return <Mutation refetchQueries={[{query: SIGNEDIN_USER_QUERY}]} mutation={SIGNIN_MUTATION} variables={this.state}>
      {(signIn, {error, loading}) => {
        return <Form method="POST" onSubmit={ async(e) => {
          e.preventDefault();
          await signIn();

          this.setState({password: "", email:""})
        }}>

          <fieldset disabled={loading} aria-busy={loading}>
            <Error error={error}></Error>
            <label htmlFor="signInEmail">
              Email
              <input type="email" id="signInEmail" name="email" placeholder="Insert your email" value={this.state.email} onChange={this.updateState}/>
            </label>
            <label htmlFor="signInPassword">
              Password
              <input type="password" id="signInPassword" name="password" placeholder="Insert your password" value={this.state.password} onChange={this.updateState}/>
            </label>
            <button type="submit">Sign In</button>
          </fieldset>        
        </Form>
      }}
    </Mutation>
  }
}

export default SignIn;