import { useCallback, useState } from 'react';

import { Login, Registration } from '../../components/Authorization';

import './AuthorizationPage.scss';

export const AuthorizationPage = () => {
  const [switchAuth, setSwitchAuth] = useState(true);

  const handleSwitchAuthorization = useCallback(() => {
    setSwitchAuth(!switchAuth);
  }, [switchAuth])

  return (
    <div className="authorization">
      <div className="authorization__container">
        <span className="logo">Чат</span>
        <span className="title">
        {switchAuth ? 'Регистрация' : 'Вход'}
        </span>
        {switchAuth ? <Registration /> : <Login />}
        <div className="authorization__switcher">
          {switchAuth ? 'Уже есть аккаунт?' : 'У вас ещё нет аккаунта?'}
          <button onClick={handleSwitchAuthorization}>
          {switchAuth ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </div>
      </div>
    </div>
  );
};
