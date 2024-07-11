import './App.css';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import AuthPage from './pages/Auth';
import BookingsPage from './pages/Bookings';
import EventsPage from './pages/Events';
import MainNavigation from './components/Navigation/MainNavigation';

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
