import './Message.scss';

export default function Message({ message, type }) {
  return (
    <div className={ `message ${type}` }>
      <p>{ message }</p>
    </div>
  );
}