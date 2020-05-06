import { Component } from "react";
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import Form from './styles/Form';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

class RequestReset extends Component{
  state = {
    email: ""
  }

  updateState = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return <Mutation mutation={REQUEST_RESET_MUTATION} variables={this.state}>
      {(requestReset, {error, loading, called}) => {
        return <Form method="POST" onSubmit={ async(e) => {
          e.preventDefault();
          await requestReset();

          this.setState({email:""})
        }}>
          <fieldset disabled={loading} aria-busy={loading}>
            { !error && !loading && called && <p>Please check your email to reset your password</p> }
            <Error error={error}></Error>
            <label htmlFor="requestResetEmail">
              Email
              <input type="email" id="requestResetEmail" name="email" placeholder="Insert your email" value={this.state.email} onChange={this.updateState}/>
            </label>
            <button type="submit">Request Reset</button>
          </fieldset>        
        </Form>
      }}
    </Mutation>
  }
}

export default RequestReset;