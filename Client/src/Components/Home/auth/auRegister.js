import React ,{useEffect} from 'react'
import { NavLink, Route, Link, useHistory } from "react-router-dom"
import { useForm } from "react-hook-form";
import axios from "axios"
import { useSelector } from 'react-redux';
//Icon -Image
import logo from '../../../assets/Image/logo2.png'
import { Checkbox, FormControlLabel } from "@material-ui/core";
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

 function checkNull(valueNull){
   return valueNull == null ? true :false 
 }

function AuRegister() {
    //Router
    let history = useHistory();
    //Redux
    var projectID = useSelector(state => state.projectID);
    const { register, handleSubmit, errors, setError, watch, formState: { isSubmitting } } = useForm();
    //useEffect
    useEffect(() => {
            if(checkNull(projectID)) 
                history.push("/profile/register/token-project")
        return () => {
         
        }
    }, [])
    
    //Submit form
    const onSubmit = data => {
        var dataUser = {
            userName: data.userName,
            email: data.email,
            password: data.password,
            project_id: projectID
        }
        axios.post('/profile/register', dataUser)
            .then(res => {
                var Res = res.data;
                if (Res.success && Res.isEmail) {
                    history.push("/profile/confirmation")
                } else if (!Res.success && !Res.isEmail) {
                    setError("email", "emailExits", Res.message)
                } else {
                    setError("errTotal", "errMany", Res.message)
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
                                <MenuLink to="/profile/register" activeOnlyWhenExact={false} lable="Register" />
                            </ul>
                        </div>

                    </div>
                    <div className="form-content">
                        <div className="title-form">
                            REGISTER
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group from-position">
                                <label className="form-lable">Full Name</label>
                                <FeatherIcon icon="user" color="#ced4da" size={18} className="icon-email" />
                                <input type="text" className="form-control shadow-none input-show rounded-0 input-form" name='userName'
                                    ref={register({ required: true })} />
                                {errors.userName && <p>Full Name is required</p>}
                            </div>
                            <div className="form-group form-marginTop from-position">
                                <label for="email" className="form-lable">Gmail</label>
                                <FeatherIcon icon="mail" color="#ced4da" size={18} className="icon-email" />
                                <input type="email" className="form-control shadow-none input-show rounded-0 input-form" id="email" name="email"
                                    ref={register({
                                        required: 'Required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        }
                                    })} />
                                {errors.email && errors.email.type === "required" && <p>Enter a valid email address</p>}
                                {errors.email && errors.email.type === "pattern" && <p>Format email is incorrect</p>}
                                {errors.email && errors.email.type === "emailExits" && <p>{errors.email.message}</p>}
                            </div>
                            <div className="form-group form-marginTop from-position">
                                <label for="password" className="form-lable">Password</label>
                                <FeatherIcon icon="lock" color="#ced4da" size={18} className="icon-email" />
                                <input type="password" className="form-control shadow-none input-show rounded-0 input-form" id="password" name="password"
                                    ref={register({
                                        required: 'Required', minLength: 8,
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%@#$]/i
                                        }
                                    })} />
                                {errors.password && <p>Your password need minmium 8 charcaters</p>}
                            </div>
                            <div className="form-group form-marginTop from-position">
                                <label for="rePassword" className="form-lable">Repeat Password</label>
                                <FeatherIcon icon="unlock" color="#ced4da" size={18} className="icon-email" />
                                <input type="password" className="form-control shadow-none input-show rounded-0 input-form" id="rePassword" name="rePassword"
                                    ref={register({
                                        required: 'Required', minLength: 8,
                                        validate: (value) => value === watch('password'),
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%@#$]/i
                                        }
                                    })}
                                />
                                {errors.rePassword && <p>Those password didn't match. Try again</p>}

                            </div>
                            <div className="form-checkPASS form-marginTop from-position-temp" >
                                <div className="form-checkbox">
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label="I agree to the Temps of User"
                                        inputRef={register({
                                            required: true
                                        })} 
                                        name="isTemp"
                                    />
                                    {errors.isTemp && <p>Please chose agree Temps</p>}
                                </div>
                            </div>
                            {errors.errTotal && errors.email.type == "errMany" && <p  className="err-total">{errors.errTotal.message}</p>}
                            <div className="btn-form-container">
                                <button className="btn btn-form shadow-none" disabled={isSubmitting} >
                                    <div className="btn-login-one"></div>
                                    <div className="btn-login-two"></div>
                                    <div className="btn-form-login-content">Sign up</div>

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

export default AuRegister
