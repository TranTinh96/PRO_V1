import React, { useState, useEffect } from "react";
import FeatherIcon from 'feather-icons-react';
import { useHistory } from "react-router-dom"
import { useForm } from "react-hook-form";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { makeStyles } from '@material-ui/core/styles';
import { Search, X } from 'react-feather';
import checkRole from "../../services/fucService"

const useStyles = makeStyles({
    root: {
        border: 1,
        borderRadius: 3,
        color: 'black',
        padding: '5px 20px',
        '&:hover': {
            border: 1,
            borderColor: "#538DDF",

        },
        '&:active': {
            border: 1,
            borderColor: "#538DDF",

        },
    },
    text: {
        color: "#727cf5",
        fontSize: 15,
        wordSpacing: 2
    },
    textedit: {
        color: "#727cf5",
        fontSize: 17,
        wordSpacing: 2
    }

});

//Infomation Project
function ManageRegisterUser() {
    //Router
    const history = useHistory();

    const classes = useStyles();
    //useState
    var [user, setUser] = useState([])
    var [project, setProject] = useState([])
    //Role
    var [role ,setRole]=useState()
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('xs');
    const [state, setState] = useState({
        checkedB: true,
    });
    const [isSearch, setSearch] = useState(true)

    //Form
    const { register, handleSubmit, errors, setError, watch, formState: { isSubmitting } } = useForm();

    //Handle DELETE
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleDisagree = () => {
        setOpen(false);
    };

    const handleAgree = (id) => (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        axios.delete(`/api/manage/open-accout/${id}`)
            .then(res => {
                var Res = res.data
                if (Res.success) {
                    //Lấy lại dữ lieu
                    axios.get('/api/manage/open-accout')
                        .then(res => {
                            var Res = res.data
                            if (Res.success) {
                                setUser(Res.data)
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                } else {
                    setError("nameProject", "alreadyName", "Project delete  Fail")
                }
            })
            .catch(err => {
                console.log(err);
            });
        setOpen(false);
    };
    const handleClose = () => {
        setOpen(false);
    };


    //EDIT
    const handleClickOpenEDIT = () => {
        setOpenEdit(true);
    };
    const handleCloseEdit = () => {

        setOpenEdit(false);
    };

    const handleEdit = (id) => (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        axios.put(`/api/manage/open-accout/${id}/${role}`)
        .then(res => {
            var Res = res.data
            if (Res.success) {
                //Lấy lại dữ lieu
                axios.get('/api/manage/open-accout')
                    .then(res => {
                        var Res = res.data
                        if (Res.success) {
                            setUser(Res.data)
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                
            }
        })
        .catch(err => {
            console.log(err);
        });

       
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleChangeRole = (e) => {
        console.log(e.target.value)
        setRole(e.target.value);
      };
    




    //Submit
    const onSubmit = data => {
        axios.post('/api/manage/open-accout', data)
            .then(res => {
                var Res = res.data
                if (Res.success && Res.isEmail) {
                    axios.get('/api/manage/open-accout')
                        .then(res => {
                            var Res = res.data
                            if (Res.success) {
                                setUser(Res.data)
                            }
                        })
                        .catch(err => {
                            history.push("/")
                        });
                } else {
                    setError("email", "emailExits", Res.message)
                }
            })
            .catch(err => {
                history.push("/")
            });
        };

        //Submit Edit
        const onSubmitEdit = data => {
            alert(data.data) 
        };


    //useEffect
    useEffect(() => {
        //Get data open accout
        axios.get('/api/manage/open-accout')
            .then(res => {
                var Res = res.data
                if (Res.success) {
                    setUser(Res.data)
                }
            })
            .catch(err => {
                history.push("/")
            });
        //Get project
        axios.get('/api/manage/setting')
        .then(res => {
            var Res = res.data
            if (Res.success) {
                setProject(Res.data)
            } 
        })
        .catch(err => {
            history.push("/")
        });
        
    }, [])
    //Maps -List
    const InfoDetailUser = user.map((info, index) => {
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{info.userName}</td>
                <td>{info.email}</td>
                <td>{checkRole(info.role)}</td>
                <td>{info.project_id}</td>
                <td className="manage-table-tb-delete">
                     {/* DELETE */}
                    <FeatherIcon icon="trash-2" size={18} color="red" onClick={handleClickOpen} />
                    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description" className={classes.text}>
                                You definitely want to delete the project ?
                             </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDisagree} variant="outlined" disableRipple size="small" color="primary" className={classes.root}>
                                Disagree
                            </Button>
                            <Button onClick={handleAgree(info._id)} variant="outlined" disableRipple color="primary" size="small" autoFocus className={classes.root} >
                                Agree
                            </Button>
                        </DialogActions>
                    </Dialog>
                    {/* EDIT */}
                    <FeatherIcon icon="edit-2" size={18} color="red" className="m-l-10" onClick={handleClickOpenEDIT} />
                    <Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={openEdit} onClose={handleCloseEdit} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description" className={classes.textedit}>
                                Edit User
                             </DialogContentText>
                                <div class="form-group form-input-edit m-b-20">
                                        <label className="my-1 mr-2 form-lable-manage " for="role">ROLE</label>
                                        <select className="custom-select form-control shadow-none input-show rounded-0 input-setting  my-1 mr-sm-2" id="role" n onChange={handleChangeRole} >
                                            <option selected>Choose...</option>
                                            <option value="ROLE_ADMIN">Administrator</option>
                                            <option value="ROLE_SEE">User</option>
                                            <option value="ROLE_CONTROL">Control</option>
                                            <option value="ROLE_MANAGER">Manager</option>
                                        </select>
                                    </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCancel} variant="outlined" disableRipple size="small" color="primary" className={classes.root}>
                                Cancel
                            </Button> 
                            <Button onClick={handleEdit(info._id)} variant="outlined" disableRipple color="primary" size="small"  className={classes.root} >
                                EDIT
                            </Button>
                        </DialogActions>
                    </Dialog>
                </td>
            </tr>

        )
    })
    //Project
    const InfoDetailProject = project.map((info, index) => {
        return (
            <option value={info._id}>{info.nameProject}</option>
        )
    })


    return (
        <div className="row m-r-0 m-l-0">
            <div className="col-lg-6 col-md-12 col-sm-12 ">
                <div className="card border-0 background-setting card-manage">
                    <div className="card-body card-body-manage ">
                        <div className="d-flex  justify-content-between align-items-baseline">
                            <FeatherIcon icon="settings" size={16} color="#727cf5" />
                            <h6 className="card-title mb-0 border-title title-card-header">CREATE NEW USER</h6>

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
                                <div class="form-group form-input-manage-2">
                                    <label className="my-1 mr-2 form-lable-manage " for="nameProject">Name Project</label>
                                    <select className="custom-select form-control shadow-none input-show rounded-0 input-setting  my-1 mr-sm-2" id="nameProject" name="project_id" ref={register}>
                                        <option selected>Choose...</option>
                                        {InfoDetailProject}

                                    </select>
                                </div>

                                <div class="form-group form-input-manage-2">
                                    <label className="my-1 mr-2 form-lable-manage " for="role">ROLE</label>
                                    <select className="custom-select form-control shadow-none input-show rounded-0 input-setting  my-1 mr-sm-2" id="role" name="role" ref={register}>
                                        <option selected>Choose...</option>
                                        <option value="ROLE_ADMIN">Administrator</option>
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
            <div className="col-lg-6 col-md-12 form-right-02 col-sm-12">
                <div className="container-table">
                    <div className="card border-0 background-setting">
                        <div className="card-body card-body-manage">
                            <div className="card-body-header ">
                                <div className="d-flex">
                                    <FeatherIcon icon="list" size={16} color="#727cf5" />
                                    <h6 className="card-title mb-0 border-title title-card-header">INFORMATION</h6>
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
                                <table className="table table-centered mb-0">
                                    <thead>
                                        <tr>
                                            <th>id</th>
                                            <th>User Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Project ID</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {InfoDetailUser}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
            {/*------END Table */}
        </div>
    )
}

export default ManageRegisterUser
