import Img from '../../images/img.png';
import Attach from '../../images/attach.png';

import './InputPanel.scss'

export const InputPanel = () => {
  return (
    <div className="input-panel">
      <input className="input-panel__text-field" type="text" placeholder="Напишите что-нибудь..." />
      <div className="input-panel__btn">
        <img src={Attach} alt="" />
        <input type="file" id="file" />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button>Отправить</button>
      </div>
    </div>
  );
};
