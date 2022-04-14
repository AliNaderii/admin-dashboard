// tools
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// pages && components
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import List from './pages/list/List';
import New from './pages/new/New';
import Single from './pages/single/Single';
// form inputs data
import { userInputs, productInputs } from './formSource';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/'>
            <Route index element={ <Home /> } />
            <Route path='login' element={ <Login /> } />

            <Route path='users'>
              <Route
                index
                element={ <List title='Users' addNewLink='/users/new' /> }
              />
              <Route
                path='new'
                element={ <New inputs={ userInputs } title='Add new user' /> }
              />
              <Route path=':userId' element={ <Single /> } />
            </Route>

            <Route path='products'>
              <Route
                index
                element={ <List title='Products' addNewLink='/products/new' /> }
              />
              <Route
                path='new'
                element={ <New inputs={ productInputs } title='Add new product' /> }
              />
              <Route path=':productId' element={ <Single /> } />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div >
  );
}

export default App;
