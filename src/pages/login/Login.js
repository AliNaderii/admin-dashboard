// styles
import './login.scss';
// tools
import { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Login() {
  const [error, setError] = useState('');
  // const [msg, setMsg] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      if (res.user) {
        dispatch({ type: 'LOGIN', payload: res.user });
        navigate('/');
      }
    }
    catch (err) {
      setError(err.message);
    }
  };



  return (
    <div className='login'>
      <form className="form" onSubmit={ handleSubmit }>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type='email'
            id='email'
            placeholder='Enter your email'
            onChange={ (e) => setEmail(e.target.value) }
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type='password'
            id='password'
            placeholder='Enter your password'
            onChange={ (e) => setPassword(e.target.value) }
          />
        </div>

        <button type='submit' className='form-button'>Login</button>
      </form>
      { error.length > 0 && <p className='error'>{ error }</p> }
    </div>
  );
}