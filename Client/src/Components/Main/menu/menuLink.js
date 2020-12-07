import React from 'react'
import { NavLink, useRouteMatch } from "react-router-dom"
import FeatherIcon from 'feather-icons-react';

function MenuLink({ label, to, activeOnlyWhenExact, icon }) {

    let match = useRouteMatch({
      path: to,
      exact: activeOnlyWhenExact
    });


  return (
    <li className={match ? "pcoded-hasmenu-active" : " pcoded-hasmenu"}>
      <NavLink to={to} className="pcoded-link">
        <span className="pcoded-micon">
          <FeatherIcon icon={icon} color="#fff" size={18} />
        </span>
        <span className="pcoded-mtext">
          {label}
        </span>
      </NavLink>
    </li>
  )}
 
export default MenuLink