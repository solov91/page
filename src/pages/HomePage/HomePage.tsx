import { Link } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';

export const HomePage = () => {
  const { isAuth } = useAuth();
  console.log(isAuth)

  return (
    <div>
      <Link to="/chat">К чату</Link>
    </div>
  )
}
