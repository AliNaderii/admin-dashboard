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
import { userInputs, customerInitialState, productInputs, productInitialState } from './formSource';
// firebase tools
import { customersRef } from './firebase';
import { productsRef } from './firebase';
// table columns
import customersTableColumns from './assets/table-columns/customersTableColumns';
import productsTableColumns from './assets/table-columns/productsTableColumns';

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

              <Route path='customers'>
                <Route
                  index
                  element={
                    <CheckAuth>
                      <List
                        addNewLink='/customers/new'
                        linkText='Add new customer'
                        databaseRef={ customersRef }
                        tableTitle='Customers'
                        tableColumns={ customersTableColumns }
                      />
                    </CheckAuth>
                  }
                />
                <Route
                  path='new'
                  element={
                    <CheckAuth>
                      <New
                        formInputFields={ userInputs }
                        initialState={ customerInitialState }
                        title='Add new user'
                        databaseRef={ customersRef }
                      />
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
                      <List
                        addNewLink='/products/new'
                        linkText='Add new product'
                        databaseRef={ productsRef }
                        tableTitle='Products'
                        tableColumns={ productsTableColumns }
                      />
                    </CheckAuth>
                  }
                />
                <Route
                  path='new'
                  element={
                    <CheckAuth>
                      <New
                        formInputFields={ productInputs }
                        initialState={ productInitialState }
                        title='Add new product'
                        databaseRef={ productsRef }
                      />
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
