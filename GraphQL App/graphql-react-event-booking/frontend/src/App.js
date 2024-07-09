import './App.css';
import {BrowserRouter, Route, Redirect } from 'react-router-dom';
import AuthPage from './pages/Auth';

function App() {
  return (
    <BrowserRouter>
      <Route path='/' component={null} />
      <Route path='/login' component={null} />
      <Route path='/auth' component={AuthPage} />
      <Route path='/events' component={null} />
      <Route path='/bookings' component={null} />
    </BrowserRouter>
  );
}

export default App;
