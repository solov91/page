import './ChatNavbar.scss';

export const ChatNavbar = () => {
  return (
    <div className="chat-navbar">
      <span className="logo">Чат</span>
      <div className="chat-navbar__user-info">
        <img src="" alt="" />
        <span>Name</span>
        <button>Выйти</button>
      </div>
    </div>
  )
}
