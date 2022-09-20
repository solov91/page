import { Link } from 'react-router-dom';

export const HomePage = () => (
  <div>
    <Link to="/chat">К чату</Link>
    <Link to="/authorization">К авторизации</Link>
  </div>
);
