import React,{useEffect ,useState} from "react"
//Menu
import MenuLink from '../menu/menuLink'
import MenuManyElement from "../menu/menuManyElement"

function Navbar(props) {
  
    var isAdmin = false;

    //Check Role and Disable
    if(props._idProject =="ADMIN")
        isAdmin =true
    


  const navRouterAdmin = [
    {
      name: "Dashboard",
      to: "/dashboard",
      exact: true,
      isManyElenment: false,
      isDisable : false,
      icon: "home"
    },
    {
      name: "Data Tables",
      to: "/tables",
      exact: false,
      isManyElenment: false,
      isDisable : isAdmin,
      icon: "server"
    },
    {
      name: "Alarms",
      to: "/alarms",
      exact: false,
      isManyElenment: false,
      isDisable : isAdmin,
      icon: "bell"
    },
    {
      name: "Maps",
      to: "/maps",
      exact: false,
      isManyElenment: false,
      isDisable : isAdmin,
      icon: "map-pin"
    },
    {
      name: "Accounts",
      to: "/accouts",
      exact: false,
      isManyElenment: false,
      isDisable : isAdmin,
      icon: "user"
    },
    {
      name: "Manage",
      icon: "users",
      isManyElenment: true,
      isDisable : isAdmin,
      exact: false,
      routers: [
        {
          name: "Setting",
          exact: true,
          to: "/manage/setting"
        },
        {
          name: "New Accout",
          exact: false,
          to: "/manage/open-accout"
        }
      ]
    }
  ]
  
  const navRouter = [
    {
      name: "Dashboard",
      to: "/dashboard",
      exact: true,
      isManyElenment: false,
      isManyElenment: false,
      icon: "home"
    },
    {
      name: "Data Tables",
      to: "/tables",
      exact: false,
      isManyElenment: false,
      isManyElenment: false,
      icon: "server"
    },
    {
      name: "Alarms",
      to: "/alarms",
      exact: false,
      isManyElenment: false,
      isManyElenment: false,
      icon: "bell"
    },
    {
      name: "Maps",
      to: "/maps",
      exact: false,
      isManyElenment: false,
      isManyElenment: false,
      icon: "map-pin"
    },
    {
      name: "Accouts",
      to: "/accouts",
      exact: false,
      isManyElenment: false,
      isManyElenment: false,
      icon: "user"
    }
  ]
  
  const navRouterManage = [
    {
      name: "Dashboard",
      to: "/dashboard",
      exact: true,
      isManyElenment: false,
      isManyElenment: false,
      icon: "home"
    },
    {
      name: "Data Tables",
      to: "/tables",
      exact: false,
      isManyElenment: false,
      isManyElenment: false,
      icon: "server"
    },
    {
      name: "Alarms",
      to: "/alarms",
      exact: false,
      isManyElenment: false,
      isManyElenment: false,
      icon: "bell"
    },
    {
      name: "Maps",
      to: "/maps",
      exact: false,
      isManyElenment: false,
      isManyElenment: false,
      icon: "map-pin"
    },
    {
      name: "Accouts",
      to: "/accouts",
      exact: false,
      isManyElenment: false,
       isManyElenment: false,
      icon: "user"
    },
    {
      name: "Manage",
      to: "/manage/project",
      exact: false,
      isManyElenment: false,
      isManyElenment: false,
      icon: "users"
    },
    
    
  ]

  if(props.role =='Administrator')
  {
    return (
      <React.Fragment>
        <div className="pcoded-navbar">
          <div className="navbar-list">
            <ul className="pcoded-item">
              {
                navRouterAdmin.map((menu, index) => {
                  if (!menu.isManyElenment) {
                    return (
                      <MenuLink key={index} label={menu.name} to={menu.to} activeOnlyWhenExact={menu.exact} icon={menu.icon} isDisable ={menu.isDisable}/>
                    )}
                  return (
                    <MenuManyElement key={index} label={menu.name} icon={menu.icon} routers={menu.routers} exact={menu.exact} isDisable ={menu.isDisable}/>
                  )
                })}
            </ul>
          </div>
        </div>
      </React.Fragment>
    )}
  if(props.role == "Manager")
  {
    return (
      <React.Fragment>
      <div className="pcoded-navbar">
        <div className="navbar-list">
          <ul className="pcoded-item">
            {
              navRouterManage.map((menu, index) => {
                if (!menu.isManyElenment) {
                  return (
                    <MenuLink key={index} label={menu.name} to={menu.to} activeOnlyWhenExact={menu.exact} icon={menu.icon} />
                  )}
              })}
          </ul>
        </div>
      </div>
    </React.Fragment>
    )
  }
  return (
    <React.Fragment>
      <div className="pcoded-navbar">
        <div className="navbar-list">
          <ul className="pcoded-item">
            {
              navRouter.map((menu, index) => {
                if (!menu.isManyElenment) {
                  return (
                    <MenuLink key={index} label={menu.name} to={menu.to} activeOnlyWhenExact={menu.exact} icon={menu.icon} />
                  )}
              })}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
}


export default Navbar;
