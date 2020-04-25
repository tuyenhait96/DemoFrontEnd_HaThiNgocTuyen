import React, { Component } from "react";
import { Link, Route } from "react-router-dom";

const dataMenu = [
  {
    label: "Trang chủ",
    to: "/",
    exact: true,
  },
  {
    label: "Quản lý sản phẩm",
    to: "/products-list",
    exact: false,
  },
];

const MenuLink = ({ label, to, onlyWhenExact }) => {
  return (
    <Route
      exact={onlyWhenExact}
      path={to}
      children={({ match }) => {
        let active = match ? "active" : "unset";
        return (
          <li className={`nav-item ${active} mr-5`}>
            <Link to={to} className="nav-link">
              {label}
            </Link>
          </li>
        );
      }}
    />
  );
};

class MenuContainer extends Component {
  render() {
    return (
      <nav
        className="navbar navbar-light mb-3"
        style={{ backgroundColor: "#e3f2fd" }}
      >
        <ul
          className="navbar-nav d-flex mr-auto mt-2 mt-lg-0"
          style={{ flexDirection: "row" }}
        >
          {this.showMenu(dataMenu)}
        </ul>
      </nav>
    );
  }

  showMenu = (data) => {
    let result = null;
    if (data.length > 0) {
      result = data.map((item, i) => {
        return (
          <MenuLink
            label={item.label}
            to={item.to}
            onlyWhenExact={item.exact}
            key={i}
          />
        );
      });
    }
    return result;
  };
}

export default MenuContainer;
