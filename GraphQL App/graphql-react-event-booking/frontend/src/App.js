import './App.css';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import AuthPage from './pages/Auth';
import BookingsPage from './pages/Bookings';
import EventsPage from './pages/Events';
import MainNavigation from './components/Navigation/MainNavigation';
import AuthContext from './context/auth-context';

function App() {
  state = {
    tokenId: null,
    userId: null,
  }

  login = (token, userId, tokeExpiration) => {
    this.setState({token: token, userId: userId});
  }

  logout = () => {}


  return (
    <BrowserRouter>
      <React.Fragment>
        <AuthContext.Provider value={{token: this.state.token, userId: this.state.userId, login: this.login, logout: this.logout}}>
          <MainNavigation />
          <main className='main-content'>
            <Routes>
              <Route path="/" element={<Navigate to="/auth" replace />} />
              <Route path='/login' element={null} />
              <Route path='/auth' element={<AuthPage />} />
              <Route path='/events' element={<EventsPage />} />
              <Route path='/bookings' element={<BookingsPage />} />
            </Routes>
          </main>
        </AuthContext.Provider>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
