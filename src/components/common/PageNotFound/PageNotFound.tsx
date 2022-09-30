import React from "react";
import { Link } from "react-router-dom";

import { routes } from "constants/routes";

import "./PageNotFound.scss";

export const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <h1>Такая страница не найдена</h1>
      <span>
        Перейти на <Link to={routes.home}>Главную</Link> или к{" "}
        <Link to={routes.authorization}>Регистрации</Link>
      </span>
    </div>
  );
};
