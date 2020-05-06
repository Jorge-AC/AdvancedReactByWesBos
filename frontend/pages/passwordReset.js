import styled from 'styled-components';
import PassReset from '../components/PassReset';

const ResetStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  
  form {
    grid-column: 2;
  }
`;

const passwordReset = props => (
  <div>
    <h2>Reset Password Page</h2>
    <ResetStyle>
      <PassReset resetToken={props.query.resetToken}></PassReset> 
    </ResetStyle>
  </div>
);

export default passwordReset;