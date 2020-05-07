import { Query } from 'react-apollo';
import { SIGNEDIN_USER_QUERY } from './User';
import SignIn from './SignIn';

const CheckLogStatus = props => {
  return (
    <Query query={SIGNEDIN_USER_QUERY}>
      {({data, loading}) => {
        if(loading) return <p>Loading...</p>
        if(!data.me) {
          return <div>
            <p>You must be logged in to perform this action</p>
            <SignIn />
          </div>
        }
        return props.children
      }}
    </Query>
  )
}

export default CheckLogStatus;