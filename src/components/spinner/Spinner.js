import './spinner.scss';
import PuffLoader from 'react-spinners/PuffLoader';

export default function Spinner({ loading }) {

  return (
    <div className="spinner-container">
      <PuffLoader loading={ loading } size={ 150 } color='#c60021' />
    </div>
  );
}