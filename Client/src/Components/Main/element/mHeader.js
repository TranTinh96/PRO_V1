/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState,useEffect} from "react";
import {Link} from "react-router-dom"
import { useCookies } from 'react-cookie';
import {useSelector ,useDispatch} from 'react-redux';
import { Search ,Menu,Bell,List ,ChevronDown ,ChevronUp ,Settings,User,Lock,Power,X} from 'react-feather';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompress} from "@fortawesome/free-solid-svg-icons";
import userlogo from "../../../assets/Image/loggeduser.jpg"


function mHeader() {
  //Cookie
  const [cookies, removeCookie] = useCookies(["Auth"]);
  //Redux
  const isMenu = useSelector((state) => state.isMenu);
  const userName = useSelector((state) => state.setUserJWT).users.user;
  const role = useSelector((state) => state.setUserJWT).users.role;
  const dispatch = useDispatch();
  //useState
  const [isUser, setUser] = useState(true);
  const [isSearch, setSearch] = useState(true);
  //Callback
  const btnLogout = () => {
    console.log("Remove Cookies ");
    //Redux User JWT
    dispatch({ type: "SET_USER", users: { } });
    removeCookie("Auth");
  };

  //useEffect
  useEffect(() => {}, []);

  return (
    <nav className="navbar navbar-header">
      <div className="navbar-wrapper">
        <div className={isMenu ? "navbar-logo" : "navbar-logo-small"}></div>
        <Menu
          color="white"
          size={25}
          className={isMenu ? "d-none" : "menu-small"}
          onClick={() => dispatch({ type: "TOGGLE_IS_MENU" })}
        />
        <div className="navbar-container ">
          <div className="navbar-left">
            <div className={isMenu ? "sidebar-toggle sidebar-item" : " d-none"}>
              <Menu
                color="#2D8DC9"
                size={25}
                onClick={() => dispatch({ type: "TOGGLE_IS_MENU" })}
              />
            </div>
            <div
              className={
                isSearch
                  ? "sidebar-search-input sidebar-item d-none"
                  : "sidebar-search-input sidebar-item "
              }
            >
              <X
                color="red"
                size={15}
                className="icon-close"
                onClick={() => setSearch(!isSearch)}
              />
              <input
                type="text"
                className="input-search form-control shadow-none"
              />
              <Search color="#2D8DC9" size={17} className="icon-search" />
            </div>
            <div
              className={isSearch ? "sidebar-item" : "sidebar-search d-none"}
            >
              <Search
                color="#2D8DC9"
                size={20}
                onClick={() => setSearch(!isSearch)}
              />
            </div>
            <div className="sidebar-plus sidebar-item">
              <FontAwesomeIcon icon={faCompress} color="#2D8DC9" size="lg" />
            </div>
          </div>
          <div className="navbar-right">
            <div className="navbar-alarm">
              <List color="#2D8DC9" size={25} />
              <span className="badge">0</span>
            </div>
            <div className="navbar-task">
              <Bell color="#2D8DC9" size={25} />
              <span className="badge badge-task">0</span>
            </div>
            <div
              className={isUser ? "navbar-user" : "navbar-user-active"}
              onClick={() => setUser(!isUser)}
            >
              <div className="user-content">
                <figure className="profile-picture">
                  <img src={userlogo} alt="Joseph" className="img-circle" />
                </figure>
                <div
                  className="profile-info"
                  data-lock-name="users"
                  data-lock-email="admin@gmail.com"
                >
                  <span className="name">{userName}</span>
                  <span className="role">{role}</span>
                </div>
                <div className="user-detail">
                  {isUser ? (
                    <ChevronDown color="#2D8DC9" size={16} />
                  ) : (
                    <ChevronUp color="#2D8DC9" size={16} />
                  )}
                </div>
              </div>
              <div
                className={
                  isUser
                    ? "dropdown-menu-user user-hide"
                    : "dropdown-menu-user user-show"
                }
              >
                <ul>
                  <li>
                    <Link className="user-link" to="/accout">
                      <Settings color="#2D8DC9" size={16} />
                      <span> Settings</span>
                    </Link>
                  </li>
                  <li>
                    <Link className="user-link" to="/profile">
                      <User color="#2D8DC9" size={16} />
                      <span> Profile</span>
                    </Link>
                  </li>
                  <li>
                    <Link className="user-link" to="/lock-screen">
                      <Lock color="#2D8DC9" size={16} />
                      <span>Lock Screen</span>
                    </Link>
                  </li>
                  <li>
                    <Link className="user-link" to="/">
                      <Power color="#2D8DC9" size={16} />
                      <span onClick={btnLogout}>Logout</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default mHeader
