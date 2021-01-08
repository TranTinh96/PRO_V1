import React, { useState, useEffect } from "react";
import FeatherIcon from 'feather-icons-react';
import { useHistory } from "react-router-dom"
import { useDispatch ,useSelector} from "react-redux";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { Search, X } from 'react-feather';

import TableInfoProject from "../library/tableInfoProject"
import TableEditUser from "../library/tableEditUser"

//Infomation Project
function ManageProject() {
    //Router
    const history = useHistory();
    const _idProject = useSelector((state) => state.idTopicProject);
    const dispatch = useDispatch()
  
    var [user, setUser] = useState([])
   

    const [state, setState] = useState({
        checkedB: true,
    });
    const [isSearch, setSearch] = useState(true)

    //Form
    const { register, handleSubmit, errors, setError, watch, formState: { isSubmitting } } = useForm();


    //Submit
    const onSubmit = data => {
        var dataUser = {
            userName: data.userName,
            email: data.email,
            role : data.role ,
            password: data.password,
            project_id: _idProject
        }
        axios.post('/api/manage/project/open-accout', dataUser)
            .then(res => {
                var Res = res.data
                if (Res.success && Res.isEmail) {
                    dispatch({type :"LOADDING_ACCOUT_MANAGE"})
                } else {
                    setError("email", "emailExits", Res.message)
                }
            })
            .catch(err => {
                history.push("/")
            });
        };



    //useEffect
    useEffect(() => {
     
    }, [])

  
    return (
        <div className="row m-r-0 m-l-0">
            <div className="col-lg-5 col-md-12 col-sm-12 ">
                <div className="card border-0 background-setting card-manage">
                    <div className="card-body card-body-manage ">
                        <div className="page-title-box">
                          <div className="page-title">
                            <div className="page-icon">
                              <FeatherIcon
                                icon="user"
                                color="#727cf5"
                                size={14}
                              />
                            </div>
                            <div className="page-title-text page-title-text-fs font-project-header">
                              ACCOUT
                            </div>
                          </div>
                        </div>
                        <div className="form-manage">
                            <form className="form-setting" onSubmit={handleSubmit(onSubmit)} >
                                <div className="form-group  form-input-manage-2">
                                    <label className="form-lable-manage" id="fullName">Full Name</label>
                                    <input type="text" className="form-control shadow-none rounded-0 input-setting" id="fullName" name="userName"
                                        ref={register({
                                            required: 'Required',
                                        })} />
                                        {errors.userName && <p>Full Name is required</p>}
                                </div>
                                <div className="form-group form-input-manage-2">
                                    <label className="form-lable-manage" id="email">Gmail</label>
                                    <input type="email" className="form-control shadow-none rounded-0 input-setting" name="email" id="email"
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
                                <div className="row">
                                    <div className="col-md-6 col-12">
                                        <div className="form-group form-input-manage-2">
                                            <label className="form-lable-manage" id="password">Password</label>
                                            <input type="password" className="form-control shadow-none input-show rounded-0 input-setting" id="password" name="password"
                                                ref={register({
                                                    required: 'Required', minLength: 8,
                                                    pattern: {
                                                        value: /^[a-zA-Z0-9._%@#$]/i
                                                    }
                                                })} />
                                            {errors.password && <p>Your password need min 8 charcaters</p>}
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="form-group form-input-manage-2">
                                            <label className="form-lable-manage" for="rePassword">Repeat Password</label>
                                            <input type="password" className="form-control shadow-none input-show rounded-0 input-setting" id="rePassword" name="rePassword" 
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
                                    </div>
                                </div>
                               
                                <div className="form-group form-input-manage-2">
                                    <label className="my-1 mr-2 form-lable-manage " for="role">Role</label>
                                    <select className="custom-select form-control shadow-none input-show rounded-0 input-setting  my-1 mr-sm-2" id="role" name="role" ref={register}>
                                        <option selected>Choose...</option>
                                        <option value="ROLE_SEE">User</option>
                                        <option value="ROLE_CONTROL">Control</option>
                                        <option value="ROLE_MANAGER">Manager</option>
                                    </select>
                                </div>

                                <div className="btn-form-container btn-form-manage m-t-20">
                                    <button type="submit" className="btn btn-form shadow-none btn-manage" disabled={isSubmitting}  >
                                        CREATE
                                    </button>
                                </div>

                            </form>

                        </div>

                    </div>

                </div>
            </div>
            {/*-----Table------ */}
            <div className="col-lg-7 col-md-12 form-right-02 col-sm-12">
                <div className="container-table">
                    <div className="card border-0 background-setting">
                        <div className="card-body card-body-manage">
                            <div className="card-body-header ">
                                <div className="page-title-box">
                                    <div className="page-title">
                                        <div className="page-icon">
                                        <FeatherIcon
                                            icon="list"
                                            color="#727cf5"
                                            size={14}
                                        />
                                        </div>
                                        <div className="page-title-text page-title-text-fs font-project-header">
                                            INFORMATION
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body-search ">
                                <form className={isSearch ? "d-none" : "d-line"}>
                                    <X color="red" size={13} className="icon-close-manage" onClick={() => setSearch(!isSearch)} />
                                    <input type="text" className="input-search form-control shadow-none input-search-manage" />
                                    <Search color="#2D8DC9" size={15} className="icon-search-manage" />
                                </form>
                                <Search color="#2D8DC9" size={15} className={isSearch ? "icon-search-manage-show d-line" : "d-none"} onClick={() => setSearch(!isSearch)} />
                            </div>
                            <div className="table-manage">
                                <div>
                                    <TableInfoProject />
                                </div>
                                <div className="m-t-40">
                                    <TableEditUser/>
                                </div>
                                
                               
                            </div>
                        </div>

                    </div>
                </div>

            </div>
            {/*------END Table */}
        </div>
    )
}

export default ManageProject
