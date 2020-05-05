import { Component } from "react";
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import Form from './styles/Form';
import { SIGNEDIN_USER_QUERY } from './User';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($name: String!, $email: String!, $password: String!) {
    signUp(name: $name, email: $email, password: $password) {
      id
      name
      password
      email
      permissions
    }
  }
`;

class SignUp extends Component{
  state = {
    name: "",
    email: "",
    password: ""
  }

  updateState = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return <Mutation refetchQueries={[{query: SIGNEDIN_USER_QUERY }]} mutation={SIGNUP_MUTATION} variables={this.state}>
      {(signUp, {error, loading}) => {
        return <Form method="POST" onSubmit={ async(e) => {
          e.preventDefault();
          await signUp();

          this.setState({name: "", password: "", email:""})
        }}>

          <fieldset disabled={loading} aria-busy={loading}>
            <Error error={error}></Error>
            <label htmlFor="signUpName">
              Name
              <input type="text" id="signUpName" name="name" value={this.state.name} placeholder="Insert your name" onChange={this.updateState}/>
            </label>
            <label htmlFor="signUpEmail">
              Email
              <input type="email" id="signUpEmail" name="email" value={this.state.email} placeholder="Insert your email" onChange={this.updateState}/>
            </label>
            <label htmlFor="signUpPassword">
              Password
              <input type="password" id="signUpPassword" name="password" value={this.state.password} placeholder="Insert your password" onChange={this.updateState}/>
            </label>
            <button type="submit">Sign Up</button>
          </fieldset>        
        </Form>
      }}
    </Mutation>
  }
}

export default SignUp;