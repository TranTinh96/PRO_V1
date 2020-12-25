import React, { useEffect } from "react";
import {useHistory } from "react-router-dom";
import {useSelector ,useDispatch} from 'react-redux';
import RouterURL from "./Components/RouterURL";


function App() {
  const  isAuthenticated = useSelector(state =>state.setUserJWT).isAuthenticated;
   //Router
  const history = useHistory();
  useEffect(() => {
    console.log(isAuthenticated)
     if( isAuthenticated )
     {
       history.push("/dashboard")
     }
     else
     {
      history.push("/")
     }
  }, [isAuthenticated ])
  return (
    <React.Fragment>
      <RouterURL />
    </React.Fragment>
  );
}

export default App;
