// tools
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// pages && components
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import List from './pages/list/List';
import New from './pages/new/New';
import Single from './pages/single/Single';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* <Route path='/'>
            <Route index element={ <Home /> } />
            <Route path='login' element={ <Login /> } />

            <Route path='users'>
              <Route index element={ <List /> } />
              <Route path=':userId' element={ <Single /> } />
              <Route path='new' element={ <New /> } />
            </Route>

            <Route path='products'>
              <Route index element={ <List /> } />
              <Route path=':productId' element={ <Single /> } />
              <Route path='new' element={ <New /> } />
            </Route>
          </Route> */}

          <Route path='/' element={ <Home /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='/users' element={ <List /> } />
          <Route path='/users/:id' element={ <Single /> } />
          <Route path='/users/new' element={ <New /> } />
          <Route path='/products' element={ <List /> } />
          <Route path='/products/:id' element={ <Single /> } />
          <Route path='/products/new' element={ <New /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
