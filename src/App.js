// tools
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
// pages && components
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import List from './pages/list/List';
import New from './pages/new/New';
import Single from './pages/single/Single';
import Sidebar from './components/sidebar/Sidebar';
import Navbar from './components/navbar/Navbar';
// form inputs data
import { userInputs, productInputs } from './formSource';

function App() {
  const { user } = useAuth();

  const CheckAuth = ({ children }) => {
    return user ? children : <Navigate to='/login' />;
  };

  return (
    <div style={ { display: 'flex', minHeight: '100vh' } }>
      <Router>
        <Sidebar />
        <div style={ { flex: 8 } }>
          <Navbar />
          <Routes>
            <Route path='/'>
              <Route
                index
                element={
                  <CheckAuth>
                    <Home />
                  </CheckAuth>
                }
              />
              <Route path='login' element={ <Login /> } />

              <Route path='users'>
                <Route
                  index
                  element={
                    <CheckAuth>
                      <List title='Users' addNewLink='/users/new' />
                    </CheckAuth>
                  }
                />
                <Route
                  path='new'
                  element={
                    <CheckAuth>
                      <New inputs={ userInputs } title='Add new user' />
                    </CheckAuth>
                  }
                />
                <Route
                  path=':userId'
                  element={
                    <CheckAuth>
                      <Single />
                    </CheckAuth>
                  }
                />
              </Route>

              <Route path='products'>
                <Route
                  index
                  element={
                    <CheckAuth>
                      <List title='Products' addNewLink='/products/new' />
                    </CheckAuth>
                  }
                />
                <Route
                  path='new'
                  element={
                    <CheckAuth>
                      <New inputs={ productInputs } title='Add new product' />
                    </CheckAuth>
                  }
                />
                <Route
                  path=':productId'
                  element={
                    <CheckAuth>
                      <Single />
                    </CheckAuth>
                  }
                />
              </Route>
            </Route>
          </Routes>
        </div>
      </Router>
    </div >
  );
}

export default App;
