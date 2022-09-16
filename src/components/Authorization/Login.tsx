import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../../firebase';

export const Login = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (err) {
      setError(true);
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Введите почту" />
        <input type="password" placeholder="Введите пароль" />
        <button>Войти</button>
      </form>
      {error ? <span>Что-то пошло не так</span> : null}
    </React.Fragment>
  )
}
