import styled from 'styled-components';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import RequestReset from '../components/requestReset';

const StyledPage = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;


const SignUpPage = props => (
  <StyledPage>
    <SignUp />
    <SignIn />
    <RequestReset />
  </StyledPage>
)

export default SignUpPage;

