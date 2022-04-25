import './spinner.scss';
import PuffLoader from 'react-spinners/PuffLoader';
// custom hooks
import { useTheme } from '../../hooks/useTheme';

export default function Spinner({ loading }) {
  const { theme } = useTheme();
  return (
    <div className="spinner-container">
      <PuffLoader
        loading={ loading }
        size={ 150 }
        color={ theme === 'light' ? '#c60021' : '#66fcf1' } />
    </div>
  );
}