import React from "react";

import { Menu, Avatar } from "antd";

import {
  SearchOutlined,
  HomeOutlined,
  BookOutlined,
  PlusOutlined,
  EditOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { useNavigate, useLocation } from "react-router-dom";

import logo from "../assets/booklogo.jpg";

function NavbarComponent() {
  const navigate = useNavigate();

  const location = useLocation();

  const username = localStorage.getItem("username") || "User";

  const userInitial = username.charAt(0).toUpperCase();
  const logout = () => {
    localStorage.clear();

    navigate("/");
  };

  return (
    <div className="navbar-wrapper">
      <div className="custom-navbar">
        <div className="logo-section">
          <img src={logo} alt="logo" className="logo-image" />

          <h2 className="logo-title">BookSphere</h2>
        </div>

        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          className="navbar-menu"
        >
          <Menu.Item
            key="/dashboard"
            icon={<HomeOutlined />}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </Menu.Item>

          <Menu.Item
            key="/view-books"
            icon={<BookOutlined />}
            onClick={() => navigate("/view-books")}
          >
            Library
          </Menu.Item>

          <Menu.Item
            key="/add-book"
            icon={<PlusOutlined />}
            onClick={() => navigate("/add-book")}
          >
            Add Book
          </Menu.Item>
          <Menu.Item
            key="/search-book"
            icon={<SearchOutlined />}
            onClick={() => navigate("/search-book")}
          >
            Search
          </Menu.Item>
          <Menu.Item
            key="/update-book"
            icon={<EditOutlined />}
            onClick={() => navigate("/update-book")}
          >
            Manage
          </Menu.Item>
        </Menu>

        <div className="navbar-right">
          <div className="profile-section">
            <Avatar className="profile-avatar">{userInitial}</Avatar>
            <span className="profile-name">{username}</span>
          </div>

          <LogoutOutlined className="logout-icon" onClick={logout} />
        </div>
      </div>
    </div>
  );
}

export default NavbarComponent;
