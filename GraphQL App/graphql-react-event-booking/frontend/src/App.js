import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import AuthPage from './pages/Auth';
import BookingsPage from './pages/Bookings';
import EventsPage from './pages/Events';
import MainNavigation from './components/Navigation/MainNavigation';
import AuthContext from './context/auth-context';

class App extends Component {
  state = {
    tokenId: null,
    userId: null,
  }

  login = (token, userId, tokeExpiration) => {
    this.setState({ token: token, userId: userId });
  }

  logout = () => { }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider value={{ token: this.state.token, userId: this.state.userId, login: this.login, logout: this.logout }}>
            <MainNavigation />
            <main className='main-content'>
              <Routes>
                {!this.state.token &&
                  <Route path="/" element={<Navigate to="/auth" replace />} />}
                {this.state.token &&
                  <Route path="/" element={<Navigate to="/events" replace />} />}
                {this.state.token &&
                  <Route path="/auth" element={<Navigate to="/events" replace />} />}
                <Route path='/login' element={null} />
                {!this.state.token && <Route path='/auth' element={<AuthPage />} />}
                <Route path='/events' element={<EventsPage />} />
                {this.state.token && <Route path='/bookings' element={<BookingsPage />} />}
              </Routes>
            </main>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }

}

export default App;
