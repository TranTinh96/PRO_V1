import React from 'react'
import axios from "axios"
import { useHistory ,Link } from "react-router-dom";
import { useForm} from "react-hook-form"
import FeatherIcon from 'feather-icons-react'
import {useDispatch} from 'react-redux';

import logo from '../../../assets/Image/logo2.png'

function AuToken() {
      //Redux
      const dispatch = useDispatch();
      const { register,handleSubmit,errors, setError, formState: { isSubmitting }} = useForm();
      let history = useHistory();
      const onSubmit = data => {
          axios.post('/profile/register/token-project', data)
            .then(res=> {
               if(res.data.success){
                   dispatch({
                       type :"PROJECT_ID_REGISTER" ,
                       projectID :res.data.projectID
                   })
                  history.push("/profile/register");
               } else{
                  setError("tokenID", "notMatch", "You Incorrect . Please Enter Project ID Again")
               }
            })
            .catch( err=> {
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
                    <div className="form-content-token">
                        <div className="title-form-token-2">
                            PLEASE  ENTER  PROJECT ID
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group m-t-20 from-position">
                                <input type="text" className="form-control shadow-none input-show rounded-0 input-form-2" name="tokenID" 
                                ref={register({ required: true })} />
                                {errors.tokenID && errors.tokenID.type ==="required"&&  <p> Enter a vaild PROJECT ID </p>}
                                {errors.tokenID && errors.tokenID.type ==="notMatch"&&  <p> {errors.tokenID.message} </p>}
                            </div>
                            <div className="title-form-link-resend m-t-20">
                                <Link to="/profile/resend">
                                    If you have forgotten or expired . Please click on this link ?
                                </Link>
                            </div>
                            <div className="btn-form-container-token">
                                <button className="btn btn-form-token" disabled={isSubmitting} type="submit">
                                    <FeatherIcon icon="arrow-right" color="#fe8a7d" size={35} className="icon-enter-token" />
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

export default AuToken
