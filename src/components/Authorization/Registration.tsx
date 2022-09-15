import addAvatar from '../../images/addAvatar.png';

export const Registration = () => {
  return (
    <form>
      <input type="text" placeholder="Введите имя" />
      <input type="email" placeholder="Введите почту" />
      <input type="password" placeholder="Введите пароль" />
      <input type="file" id="file" />
      <label htmlFor="file">
        <img src={addAvatar} alt="" />
        <span>Добавьте аватар</span>
      </label>
      <button>Зарегистрироваться</button>
    </form>
  )
}
