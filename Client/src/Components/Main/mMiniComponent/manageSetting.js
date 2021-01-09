import React, { useState, useEffect } from "react";
import FeatherIcon from 'feather-icons-react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useHistory } from "react-router-dom"
import { Search, X } from 'react-feather';
import TableInfoSetting from "../library/admin/tableInfoProjectAdmin"
import { useDispatch ,useSelector } from "react-redux";


function ManageSetting() {
    //Router
    const history = useHistory();
    const dispatch = useDispatch()
    //useState
    var [project, setProject] = useState([])
    const [open, setOpen] = useState(false);
    const [state, setState] = useState({
        checkedB: true,
    });
    const [isSearch, setSearch] = useState(true)

    //Form
    const { register, handleSubmit, errors, setError, formState: { isSubmitting } } = useForm();


    //Submit
    const onSubmit = data => {
        axios.post('/api/manage/setting', data)
            .then(res => {
                var Res = res.data
                if (Res.success) {
                    dispatch({type:"LOADDING_ACCOUT_MANAGE"}) 
                } else {
                    setError("nameProject", "alreadyName", "Name project already exits")
                }
            })
            .catch(err => {
                history.push("/")
            });
    };

    return (
        <div className="row m-r-0 m-l-0">
            <div className="col-lg-5 col-md-12 col-sm-12 ">
                <div className="card border-0 background-setting card-manage">
                    <div className="card-body card-body-manage ">
                         <div className="page-title-box">
                          <div className="page-title">
                            <div className="page-icon">
                              <FeatherIcon
                                icon="settings"
                                color="#727cf5"
                                size={14}
                              />
                            </div>
                            <div className="page-title-text page-title-text-fs font-project-header">
                              SETTING
                            </div>
                          </div>
                        </div>
                        <div className="form-manage">
                            <form className="form-setting" onSubmit={handleSubmit(onSubmit)} >
                                <div className="form-group ">
                                    <label className="form-lable-manage" id="nameProject">Name Project</label>
                                    <input type="text" className="form-control shadow-none rounded-0 input-setting" id="nameProject" name="nameProject"
                                        ref={register({
                                            required: 'Required',
                                        })} />
                                    {errors.nameProject && errors.nameProject.type === 'required' && <p>Enter a valid name project</p>}
                                    {errors.nameProject && errors.nameProject.type == 'alreadyName' && <p>Name project already exits</p>}
                                </div>
                                <div className="row">
                                    <div className="col-md-6 col-12">
                                        <div className="form-group form-input-manage">
                                            <label className="form-lable-manage">Provincial</label>
                                            <input type="text" className="form-control shadow-none rounded-0 input-setting " name="provincial"
                                                ref={register({
                                                    required: 'Required',
                                                })} />
                                            {errors.provincial && <p>Enter a valid provincial</p>}
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="form-group form-input-manage">
                                            <label className="form-lable-manage">District</label>
                                            <input type="text" className="form-control shadow-none rounded-0 input-setting " name="district"
                                                ref={register({
                                                    required: 'Required',
                                                })} />
                                            {errors.district && <p>Enter a valid city or district</p>}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group form-input-manage">
                                    <label className="form-lable-manage">Address Details</label>
                                    <input type="text" className="form-control shadow-none rounded-0 input-setting " name="addressDetail"
                                        ref={register({
                                            required: 'Required',
                                        })} />
                                    {errors.addressDetail && <p>Enter a valid city details address</p>}
                                </div>
                                <div className="btn-form-container btn-form-manage">
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
                               <TableInfoSetting/>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
            {/*------END Table */}
        </div>
    )
}

export default ManageSetting
