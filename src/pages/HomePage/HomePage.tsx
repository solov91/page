import Navigation from '../../components/Navigation';
import { useAuth } from '../../context/AuthContext';

import './HomePage.scss';

export const HomePage = () => {
  const { isAuth } = useAuth();

  return (
    <div className="home">
      <Navigation isAuth={isAuth} />
    </div>
  );
};
