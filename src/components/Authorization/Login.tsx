import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../firebase/firebase";

import Loader from "../common/Loader";

export const Login = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChang = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChang = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  }, [email, navigate, password]);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        handleSubmit();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [handleSubmit]);

  return (
    <React.Fragment>
      <div className="form">
        <input
          type="email"
          placeholder="Введите почту"
          onChange={handleEmailChang}
        />
        <input
          type="password"
          placeholder="Введите пароль"
          onChange={handlePasswordChang}
        />
        <button onClick={handleSubmit}>Войти</button>
      </div>
      {error ? <span>Что-то пошло не так</span> : null}
      {loading && <Loader />}
    </React.Fragment>
  );
};
