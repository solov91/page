import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'

import { auth, db, storage } from '../../firebase';

import Loader from '../common/Loader';

import addAvatar from '../../images/addAvatar.png';

export const Registration = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFiles] = useState<File>();

  const navigate = useNavigate();

  const handleEmailEnter = (e:React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordEnter = (e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleDisplayNameEnter = (e:React.ChangeEvent<HTMLInputElement>) => setDisplayName(e.target.value);

  const handleFileEnter = useCallback((event: React.FormEvent) => {
    const files = (event.target as HTMLInputElement).files

    if (files && files.length > 0) {
        setFiles(files[0])
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    if(!file) return alert('You can`t go forword without avatar');

    setLoading(true);

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
  }, [displayName, email, file, navigate, password]);

  useEffect(() => {
    const listener = (event:KeyboardEvent) => {
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
          type="text" 
          placeholder="Введите имя"
          value={displayName}
          onChange={handleDisplayNameEnter}
        />
        <input 
          type="email" 
          placeholder="Введите почту"
          value={email}
          onChange={handleEmailEnter}
        />
        <input 
          type="password" 
          placeholder="Введите пароль"
          value={password}
          onChange={handlePasswordEnter}
        />
        <input 
          id="file"
          type="file"
          onChange={handleFileEnter}
        />
        <label htmlFor="file">
          <img src={addAvatar} alt="" />
          <span>Добавьте аватар</span>
        </label>
        <button onClick={handleSubmit}>
          Зарегистрироваться
        </button>
      </div>
      {loading && <Loader />}
      {error ? <span>Что-то пошло не так</span> : null}
    </React.Fragment>
  )
}
