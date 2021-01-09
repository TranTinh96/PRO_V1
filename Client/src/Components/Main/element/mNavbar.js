import React,{useEffect} from "react"
//Menu
import MenuLink from '../menu/menuLink'
import MenuManyElement from "../menu/menuManyElement"


//
const navRouterAdmin = [
  {
    name: "Dashboard",
    to: "/dashboard",
    exact: true,
    isManyElenment: false,
    icon: "home"
  },
  {
    name: "Data Tables",
    to: "/tables",
    exact: false,
    isManyElenment: false,
    icon: "server"
  },
  {
    name: "Alarms",
    to: "/alarms",
    exact: false,
    isManyElenment: false,
    icon: "bell"
  },
  {
    name: "Maps",
    to: "/maps",
    exact: false,
    isManyElenment: false,
    icon: "map-pin"
  },
  {
    name: "Accouts",
    to: "/accouts",
    exact: false,
    isManyElenment: false,
    icon: "user"
  },
  {
    name: "Manage",
    icon: "users",
    isManyElenment: true,
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
    icon: "home"
  },
  {
    name: "Data Tables",
    to: "/tables",
    exact: false,
    isManyElenment: false,
    icon: "server"
  },
  {
    name: "Alarms",
    to: "/alarms",
    exact: false,
    isManyElenment: false,
    icon: "bell"
  },
  {
    name: "Maps",
    to: "/maps",
    exact: false,
    isManyElenment: false,
    icon: "map-pin"
  },
  {
    name: "Accouts",
    to: "/accouts",
    exact: false,
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
    icon: "home"
  },
  {
    name: "Data Tables",
    to: "/tables",
    exact: false,
    isManyElenment: false,
    icon: "server"
  },
  {
    name: "Alarms",
    to: "/alarms",
    exact: false,
    isManyElenment: false,
    icon: "bell"
  },
  {
    name: "Maps",
    to: "/maps",
    exact: false,
    isManyElenment: false,
    icon: "map-pin"
  },
  {
    name: "Accouts",
    to: "/accouts",
    exact: false,
    isManyElenment: false,
    icon: "user"
  },
  {
    name: "Manage",
    to: "/manage/project",
    exact: false,
    isManyElenment: false,
    icon: "users"
  },
  
  
]


function Navbar(props) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  //Redux
  //const isMenu = useSelector(state => state.isMenu);

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
                      <MenuLink key={index} label={menu.name} to={menu.to} activeOnlyWhenExact={menu.exact} icon={menu.icon} />
                    )}
                  return (
                    <MenuManyElement key={index} label={menu.name} icon={menu.icon} routers={menu.routers} exact={menu.exact} />
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
