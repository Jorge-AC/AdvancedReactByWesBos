import CreateItem from '../components/createItem';
import CheckLogStatus from '../components/checkLogStatus';

const sell = () => {
  return (
    <div>
      <CheckLogStatus>
        <CreateItem />
      </CheckLogStatus>
    </div>
  )
}

export default sell;