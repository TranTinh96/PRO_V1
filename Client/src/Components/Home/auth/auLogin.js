import React from 'react'
import { NavLink, Route, Link, useHistory } from "react-router-dom"
import { useForm } from "react-hook-form";
import { useDispatch} from 'react-redux';
import { useCookies } from 'react-cookie';
import axios from "axios"
//Auth JWT
import jwt from 'jsonwebtoken';
import setAuthorizationToken from "../../services/jwtService";
//Check Role 
import checkRole  from "../../services/fucRole"
//Icon - Image
import logo from '../../../assets/Image/logo2.png'
import google from '../../../assets/Image/google.png'
import facebook from '../../../assets/Image/facebook.png'
import FeatherIcon from 'feather-icons-react';

const MenuLink = ({ lable, to, activeOnlyWhenExact }) => {
    return (
        <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => {
            var active = match ? 'control-select-active' : "control-select"
            return (
                <li className={active}>
                    <NavLink to={to} className="control-select-link">
                        <span className="control-select-text">
                            {lable}
                        </span>
                    </NavLink>
                </li>
            )
        }} />
    )
}




function AuLogin() {
    var jwtToken = null;
    //Router
    const history = useHistory();
    //Redux
    const dispatch = useDispatch();
    //Cookie
    const [cookies, setCookie] = useCookies(["Auth"]);
    //Form
    const { register, handleSubmit, errors, setError, formState: { isSubmitting } } = useForm();
    const onSubmit = data => {
        axios.post('/profile/login', data)
            .then(res => {
                var resData = res.data
               
                if (resData.success) {
                    var authToken = resData.token;
                    jwtToken =jwt.decode(authToken)
                    var role = checkRole(jwtToken.role);
                    var users ={
                        email :jwtToken.email,
                        user :jwtToken.user,
                        role :role
                    }
                    dispatch({
                        type :"ID_TOPIC_PROJECT" ,
                        _idProject :jwtToken.project_id
                    })
                    
                    //Set JWT
                    setAuthorizationToken(authToken);
                    //Redux User JWT ,ID_TOPIC_PROJECT
                    dispatch({ type :"SET_USER" ,users:users})
                    //Save Token into Cookie
                    var optionCookie ={
                        path :"/",
                        maxAge :7200
                    }
                    setCookie('Auth', authToken, optionCookie);
                    //Redirect
                    history.push("/dashboard");
                   
                } else {
                    if (!resData.email) {
                        setError(
                            "email",
                            "noEmail",
                            resData.message
                        )
                    } else {
                        setError(
                            "password",
                            "noPassword",
                            resData.message
                        )
                    }
                }
            })
            .catch(err => {
                console.log(err);
            });
    };
    return (
        <div className="form-body">
            <div className="row m-r-0 m-l-0">
                <div className="col-lg-6 col-sm-12 form-left p-r-l-0">
                    <div className="logo-container">
                        <Link to="/">
                            <img src={logo} alt="Logo" className=" width-img-form" />
                        </Link>
                    </div>
                    <div className="control-container">
                        <div>
                            <ul>
                                <MenuLink to="/profile/login" activeOnlyWhenExact={true} lable="Login" />
                                <MenuLink to="/profile/register/token-project" activeOnlyWhenExact={false} lable="Register" />
                            </ul>
                        </div>

                    </div>
                    <div className="form-content">
                        <div className="title-form">
                            WELCOME
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group from-position">
                                <label className="form-lable">Email</label>
                                <FeatherIcon icon="mail" color="#ced4da" size={18} className="icon-email" />
                                <input type="email" className="form-control shadow-none input-show rounded-0 input-form" name="email"
                                    ref={register({
                                        required: 'Required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        }
                                    })} />
                                {errors.email && errors.email.type === 'required' && <p>Enter a valid email address</p>}
                                {errors.email && errors.email.type == 'noEmail' && <p>{errors.email.message}</p>}

                            </div>
                            <div className="form-group m-t-25 from-position">
                                <label className="form-lable">Password</label>
                                <FeatherIcon icon="lock" color="#ced4da" size={18} className="icon-email" />
                                <input type="password" className="form-control shadow-none input-show rounded-0 input-form" name="password"
                                    ref={register({
                                        required: 'Required',
                                        minLength: 8,
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%@#$]/i
                                        }
                                    })} />
                                {errors.password && errors.password.type === 'required' && <p>Enter a valid password</p>}
                                {errors.password && errors.password.type === 'minLenght' && <p>Your password need minmium 8 charcaters</p>}
                                {errors.password && errors.password.type == 'noPassword' && <p>{errors.password.message}</p>}

                            </div>
                            <div className="form-checkPASS m-t-25">
                                <div className="form-forgotPass">
                                    <Link to="/profile/forgotpassword"> Forgot your password ?</Link>
                                </div>
                            </div>
                            <div className="btn-form-container">
                                <button className="btn btn-form shadow-none" disabled={isSubmitting}>
                                    <div className="btn-login-one"></div>
                                    <div className="btn-login-two"></div>
                                    <div className="btn-form-login-content">Login</div>
                                </button>
                            </div>
                            <div className="form-line-login">
                                <span>OR</span>
                            </div>
                            <div className="form-login-googleFacebook">
                                <button className="btn btn-google shadow-none m-r-15">
                                    <img src={google} alt="google" width={20} className="google-icon" />
                                </button>
                                <button className="btn btn-google shadow-none">
                                    <img src={facebook} alt="facebook" width={20} className="google-icon" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-lg-6 form-right p-r-l-0">
                    <div className="container-img">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuLogin
