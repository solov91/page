import { ChangeEvent, useState } from 'react';

import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";

import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';

import './ChatSearch.scss';

export const ChatSearch = () => {
  const [username, setUserName] = useState('');
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState(false);
  const { isAuth } = useAuth();

  const handleSearchResult = async () => {
    const q = query(
      collection(db, 'users'),
      where('displayName', '==', username),
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => setUser(doc.data()));
    } catch (error) {
      setError(true)
    }
  };

  const handleSearchUser = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
  };

  const handleKeyDownSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.code === 'Enter' && handleSearchResult()
  };

  const handleSelect = async () => {
    const combinedId = 
    isAuth.uid > user.uid 
      ? isAuth.uid + user.uid
      : user.uid + isAuth.uid;

    try {
      const res = await getDoc(doc(db, 'chats', combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, 'chats', combinedId), {messages: []});

        await updateDoc(doc(db, 'userChats', isAuth.uid), {
          [combinedId + '.userInfo']: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + '.date']: serverTimestamp()
        });

        await updateDoc(doc(db, 'userChats', user.uid), {
          [combinedId + '.userInfo']: {
            uid: isAuth.uid,
            displayName: isAuth.displayName,
            photoURL: isAuth.photoURL,
          },
          [combinedId + '.date']: serverTimestamp()
        });
      }
    } catch (error) {
      throw error
    }

    setUser(null);
    setUserName('');
  };

  return (
    <div className="chat-search">
      <div className="chat-search__form">
        <input
          type="text"
          placeholder="Поиск по пользователям"
          onChange={handleSearchUser}
          onKeyDown={handleKeyDownSearch}
          value={username}
        />
      </div>
      {error && <span>Пользователь не найден</span>}
      {user &&
        <div className="chat-lists" onClick={handleSelect}>
          <img src={user.photoURL || ''} alt="" />
          <div className="user-info">
            <span>{user.displayName}</span>
          </div>
        </div> 
      }
    </div>
  )
}
