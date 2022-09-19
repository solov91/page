import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../../firebase';

import Loader from '../common/Loader';

export const Login = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Введите почту" />
        <input type="password" placeholder="Введите пароль" />
        <button>Войти</button>
      </form>
      {error ? <span>Что-то пошло не так</span> : null}
      {loading && <Loader />}
    </React.Fragment>
  )
}
