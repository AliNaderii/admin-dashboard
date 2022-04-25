// styles
import './login.scss';
// tools
import { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Message from '../../components/message/Message';
// custom hooks
import { useTheme } from '../../hooks/useTheme';

export default function Login() {
  const { theme } = useTheme();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsPending(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      if (res.user) {
        dispatch({ type: 'LOGIN', payload: res.user });
        setIsPending(false);
        navigate('/');
      }
    }
    catch (err) {
      setIsPending(false);
      setError(err.message);
    }
  };

  return (
    <div className={ theme === 'light' ? 'login' : 'login dark' }>
      <form className="form" onSubmit={ handleSubmit }>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type='email'
            id='email'
            placeholder='admin@gmail.com'
            onChange={ (e) => setEmail(e.target.value) }
            onFocus={ () => setError(null) }
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type='password'
            id='password'
            placeholder='123456'
            onChange={ (e) => setPassword(e.target.value) }
            onFocus={ () => setError(null) }
          />
        </div>

        {
          isPending ?
            <button type='button' className='form-button' disabled>Please Wait</button>
            :
            <button type='submit' className='form-button'>Login</button>
        }
      </form>
      { error && <Message type='error' message={ error } /> }
    </div>
  );
}