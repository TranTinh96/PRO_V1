import React from 'react'
import axios from "axios"
import { useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form"

import logo from '../../../assets/Image/logo2.png'

function AuVerification() {
    //Redux
    const { register, handleSubmit, errors, setError, formState: { isSubmitting } } = useForm();
    let history = useHistory();
    const onSubmit = data => {
        axios.post('/profile/confirmation', {token :data.authAccout})
            .then(res => {
                var Res = res.data
                if (Res.success) {
                    history.push("/profile/login");
                } else {
                    setError("authAccout", "noMatch", Res.message)
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
                    <div className="form-content-resend">
                        <div className="title-form-token">
                            VERIFICATION ACCOUT
                        </div>
                        <div className="title-form-infomation">
                            Code send in your email . Let's copy and paste in below
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} method="POST">
                            <div className="form-group m-t-20 from-position">
                                <input type="text" className="form-control shadow-none input-show rounded-0 input-form-2" id="authAccout" name="authAccout"
                                    ref={register({
                                        required: 'Required'                       
                                    })} />
                                {errors.authAccout && errors.authAccout.type === "required" && <p>Enter a valid authAccout address</p>}
                                {errors.authAccout && errors.authAccout.type === "noMatch" && <p>{errors.authAccout.message}</p>}
                            </div>
                            {errors.errTotal && errors.email.type == "errMany" && <p  className="err-total">{errors.errTotal.message}</p>}
                            <div className="border-resend"></div>
                            <div className="title-form-link-resend">
                                <Link to="/profile/resend">
                                    If you have forgotten or expired . Please click on this link ?
                                </Link>
                            </div>
                            <div className="btn-form-container-resend">
                                <button type="submit" className="btn show btn-form-resend" disabled={isSubmitting}>
                                    SUBMIT CODE
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

export default AuVerification
