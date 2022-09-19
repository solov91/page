import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'

import { auth, db, storage } from '../../firebase';

import addAvatar from '../../images/addAvatar.png';

export const Registration = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setError(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Введите имя" />
        <input type="email" placeholder="Введите почту" />
        <input type="password" placeholder="Введите пароль" />
        <input id="file" type="file" />
        <label htmlFor="file">
          <img src={addAvatar} alt="" />
          <span>Добавьте аватар</span>
        </label>
        <button>Зарегистрироваться</button>
      </form>
      {loading && "Подождите..."}
      {error ? <span>Что-то пошло не так</span> : null}
    </React.Fragment>
  )
}
