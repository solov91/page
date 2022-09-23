import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import AuthorizationPage from './pages/AuthorizationPage';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import CalendarPage from './pages/CalendarPage';

import PageNotFound from './components/common/PageNotFound';
import Navigation from './components/Navigation';

import { useAuth } from './context/AuthContext';

import { routes } from './constants';

import './App.scss';

function App() {
  const { isAuth } = useAuth();
  return (
    <Router>
      <div className="App">
        <Navigation isAuth={isAuth} />
        <Routes>
          <Route path={routes.home} element={<HomePage />} />
          <Route path={routes.chat} element={<ChatPage />} />
          <Route path={routes.authorization} element={<AuthorizationPage />} />
          <Route path={routes.calendar} element={<CalendarPage />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
