import React from 'react'
import axios from "axios"
import { useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form"

import logo from '../../../assets/Image/logo2.png'

function AuReSend() {
    //Redux
    const { register, handleSubmit, errors, setError, formState: { isSubmitting } } = useForm();
    let history = useHistory();
    const onSubmit = data => {
        axios.post('/profile/resend', data)
            .then(res => {
                var Res = res.data
                if (Res.success && Res.isEmail) {
                    history.push("/profile/confirmation");
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
                    <div className="form-content-resend">
                        <div className="title-form-token-2">
                            PLEASE  ENTER  ADDRESS EMAIL
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} method="POST">
                            <div className="form-group m-t-20 from-position">
                                <input type="email" className="form-control shadow-none input-show rounded-0 input-form-2" id="email" name="email"
                                    ref={register({
                                        required: 'Required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        }
                                    })} />
                                {errors.email && errors.email.type === "required" && <p>Enter a valid email address</p>}
                                {errors.email && errors.email.type === "pattern" && <p>Format email is incorrect</p>}
                                {errors.email && errors.email.type == "emailExits" && <p>{errors.email.message}</p>}
                            </div>
                            {errors.errTotal && errors.email.type == "errMany" && <p  className="err-total">{errors.errTotal.message}</p>}
                            <div className="btn-form-container-resend">
                                <button type="submit" className="btn show btn-form-resend" disabled={isSubmitting}>
                                    RESEND EMAIL
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

export default AuReSend
