import { useState } from 'react';

import { v4 as uuid } from 'uuid';
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

import { db, storage } from '../../firebase';

import { useAuth } from '../../context/AuthContext';
import { useChats } from '../../context/ChatContext';

import Img from '../../images/img.png';


import './InputPanel.scss'

export const InputPanel = () => {
  const [text, setText] = useState('');
  const [img, setImg] = useState<File>();

  const { isAuth } = useAuth();
  const { data } = useChats();

  const handleKeyDownSend = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter' || e.code === "NumpadEnter") handleSend()
  };

  const handleTextEnter = (event: React.ChangeEvent<HTMLInputElement>) => setText(event.target.value);
  const handleFileEnter = (event: React.FormEvent) => {
    const file = (event.target as HTMLInputElement).files

    if (file && file.length > 0) {
      setImg(file[0])
    }
  };

  const handleSend = async () => {
    if (text.trim().length === 0) return

    setText('');

    if (img) {
      const storageRef = ref(storage, uuid());

      if(!Boolean(img?.name
        .split('.')
        .find(a => a === 'png' || a === 'jpg' || a === 'jpeg' || a === 'svg'))) {
          setImg(undefined);
          return alert('Выберете файл с раширением jpg, jpeg, png, svg')
        }

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on('state_changed',
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, 'chats', data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: isAuth.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, 'chats', data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: isAuth.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, 'userChats', isAuth.uid), {
      [data.chatId + '.lastMessage']: {
        text,
      },
      [data.chatId + '.date']: serverTimestamp(),
    });

    await updateDoc(doc(db, 'userChats', data.user.uid), {
      [data.chatId + '.lastMessage']: {
        text,
      },
      [data.chatId + '.date']: serverTimestamp(),
    });
    setImg(undefined);
  };
  
  return (
    <div className="input-panel">
      <input
        className="input-panel__text-field"
        type="text"
        placeholder="Напишите что-нибудь..."
        onChange={handleTextEnter}
        onKeyDown={handleKeyDownSend}
        value={text}
      />
      <div className="input-panel__btn">
      <input
          type="file"
          id="file"
          onChange={handleFileEnter}
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button
          onClick={handleSend}
        >
          Отправить
        </button>
      </div>
    </div>
  );
};
