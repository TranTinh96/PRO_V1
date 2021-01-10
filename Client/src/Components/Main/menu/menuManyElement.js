import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useRouteMatch, Route } from "react-router-dom"
import FeatherIcon from 'feather-icons-react';


const MenuLink = ({ name, to, activeOnlyWhenExact }) => {
    return (
        <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => {
            var active = match ? "content-many-active" : "content-many"
            return (
                <li className={active} >
                    <NavLink to={to} className="many-element-link">
                        <span className="many-element-micon">
                            <FeatherIcon icon="chevron-right" color="#dcdcdc" size={15} />
                        </span>
                        <span className="many-element-mtext">
                            {name}
                        </span>
                    </NavLink>
                </li>
            )
        }} />
    )
}


function MenuManyElement({ label, icon, routers, exact ,isDisable }) {
    const isMenuElement = useSelector(state => state.isMenuElement);
    const dispatch = useDispatch();

    var match = useRouteMatch({
        path: "/manage",
        exact: exact


    });
    if(isDisable){
        return (
            <li className="pcoded-hasmenu disabled-li">
                <div className="pcoded-link-many-element" onClick={() => {
                    dispatch({ type: "TOGGLE_IS_MENU_ELEMENT" })
    
                }}>
                    <span className="pcoded-micon">
                        <FeatherIcon icon={icon} color="#dcdcdc" size={15} />
                    </span>
                    <span className="pcoded-mtext">
                        {label}
                    </span>
                    <span className="pcoded-toggle">
                        <FeatherIcon icon={isMenuElement ? "chevron-down" : "chevron-up"} size={14} />
                    </span>
                </div>
                <div className={isMenuElement ? "pcoded-content-many-element d-none" : "pcoded-content-many-element d-d-block"}>
                    <ul className="pcoded-content-element">
                        {
                            routers.map((router, index) => {
                                return (
                                    <MenuLink key={index}name={router.name}  to={router.to} activeOnlyWhenExact={router.exact}  />
                                )
                            })
                        }
                    </ul>
                </div>
            </li>
        )
    }

    return (
        <li className={match ? "pcoded-hasmenu-active" : " pcoded-hasmenu"}>
            <div className="pcoded-link-many-element" onClick={() => {
                dispatch({ type: "TOGGLE_IS_MENU_ELEMENT" })

            }}>
                <span className="pcoded-micon">
                    <FeatherIcon icon={icon} color="#dcdcdc" size={15} />
                </span>
                <span className="pcoded-mtext">
                    {label}
                </span>
                <span className="pcoded-toggle">
                    <FeatherIcon icon={isMenuElement ? "chevron-down" : "chevron-up"} size={14} />
                </span>
            </div>
            <div className={isMenuElement ? "pcoded-content-many-element d-none" : "pcoded-content-many-element d-d-block"}>
                <ul className="pcoded-content-element">
                    {
                        routers.map((router, index) => {
                            return (
                                <MenuLink key={index}name={router.name}  to={router.to} activeOnlyWhenExact={router.exact}  />
                            )
                        })
                    }
                </ul>
            </div>
        </li>
    )
}


export default MenuManyElement