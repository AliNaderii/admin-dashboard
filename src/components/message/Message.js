import './Message.scss';
// custom hooks
import { useTheme } from '../../hooks/useTheme';

export default function Message({ message, type }) {
  const { theme } = useTheme();

  return (
    <div className={ theme === 'light' ? `message ${type}` : `message ${type} dark` }>
      <p>{ message }</p>
    </div>
  );
}