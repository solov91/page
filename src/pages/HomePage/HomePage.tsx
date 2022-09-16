import { useAuth } from '../../context/AuthContext';

export const HomePage = () => {
  const { isAuth } = useAuth();
  console.log(isAuth)

  return (
    <div>HomePage</div>
  )
}
