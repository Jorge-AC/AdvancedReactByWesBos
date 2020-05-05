import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { SIGNEDIN_USER_QUERY } from './User';

const SIGNOUT_MUTATION = gql`
  mutation {
    signOut {
      name
    }
  }
`;

const SignOut = props => {
  return (
    <Mutation mutation={ SIGNOUT_MUTATION } refetchQueries={[{query: SIGNEDIN_USER_QUERY}]}>
      {(signOut, {loading}) => {
        return <button disabled={ loading } onClick={ async () => { 
          await window.confirm('Are you sure to close your session?');
          await signOut();
        }}>{props.children}</button>
      }}
    </Mutation>
  )
}

export default SignOut;