import './ChatSearch.scss';

export const ChatSearch = () => {
  return (
    <div className="chat-search">
      <div className="chat-search__form">
        <input type="text" placeholder="Поиск по пользователям"/>
      </div>
      <div className="chat-lists">
        <img src="" alt="" />
        <div className="user-info">
          <span>Chat Name</span>
        </div>
      </div>
    </div>
  )
}
