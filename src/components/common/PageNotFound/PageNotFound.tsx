import { Link } from 'react-router-dom';

import './PageNotFound.scss'

export const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <h1>Такая страница не найдена</h1>
      <span>
        Перейти на <Link to="/">Главную</Link> или к <Link to="/authorization">Регистрации</Link>
      </span>
    </div>
  )
}
