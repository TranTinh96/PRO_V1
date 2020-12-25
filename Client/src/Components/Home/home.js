import React, { useEffect } from "react";
import { Link ,useHistory} from "react-router-dom";
import {useSelector ,useDispatch} from 'react-redux';
import logo from "../../assets/Image/logo.png";

function Home() {

const  isAuthenticated = useSelector(state =>state.setUserJWT).isAuthenticated;
 const history = useHistory();

 useEffect(() => {
   console.log(isAuthenticated)
    if( isAuthenticated )
    {
      history.push("/dashboard")
    }
 }, [isAuthenticated ])
  return (
    <>
      <nav className="navbar navbar-header-home">
        <div className="container">
          <div className="navbar-container-home">
            <div className="navbar-left-home">
              <Link to="/">
                {" "}
                <img src={logo} alt="Logo" />
              </Link>
            </div>
            <div className="navbar-right-home">
              <ul>
                <li className="navbar-link-register">
                  <Link to="/profile/register/token-project">Register</Link>
                </li>
                <li>
                  <Link to="/profile/login">Login</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Home;
