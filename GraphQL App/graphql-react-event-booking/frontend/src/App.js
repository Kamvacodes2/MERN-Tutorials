import './App.css';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import AuthPage from './pages/Auth';
import BookingsPage from './pages/Bookings';
import EventsPage from './pages/Events';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />}/>
        <Route path='/login' element={null} />
        <Route path='/auth' element={<AuthPage/>} />
        <Route path='/events' element={<EventsPage/>} />
        <Route path='/bookings' element={<BookingsPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
