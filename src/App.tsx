import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import AuthorizationPage from './pages/AuthorizationPage';
import { HomePage } from './pages/HomePage/HomePage';
import { ChatPage } from './pages/ChatPage/ChatPage';

import { PageNotFound } from './components/common/PageNotFound/PageNotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/authorization" element={<AuthorizationPage />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
