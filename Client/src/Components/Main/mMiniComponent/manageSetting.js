import React, { useState, useEffect } from "react";
import FeatherIcon from 'feather-icons-react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useHistory } from "react-router-dom"
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { makeStyles } from '@material-ui/core/styles';
import { Search, X } from 'react-feather';

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
    }

});

//Infomation Project
function ManageSetting() {
    //Router
    const history = useHistory();
    const classes = useStyles();
    //useState
    var [project, setProject] = useState([])
    const [open, setOpen] = useState(false);
    const [state, setState] = useState({
        checkedB: true,
    });
    const [isSearch, setSearch] = useState(true)

    //Form
    const { register, handleSubmit, errors, setError, formState: { isSubmitting } } = useForm();

    //Handle
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleDisagree = () => {
        setOpen(false);
    };
    const handleAgree = (id) => (reason) => {
        console.log(id)
        if (reason === 'clickaway') {
            return;
        }
        axios.delete(`/api/manage/setting/${id}`)
            .then(res => {
                var Res = res.data
                if (Res.success || Res.isUser) {
                    //Lấy lại dữ li
                    axios.get('/api/manage/setting')
                        .then(res => {
                            var Res = res.data
                            if (Res.success) {
                                setProject(Res.data)
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                } else if (Res.success || !Res.isUser) {
                    setError("nameProject", "alreadyName", "Project delete Success but User delete Fail")
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


    //Submit
    const onSubmit = data => {
        axios.post('/api/manage/setting', data)
            .then(res => {
                var Res = res.data
                if (Res.success) {
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
                } else {
                    setError("nameProject", "alreadyName", "Name project already exits")
                }
            })
            .catch(err => {
                history.push("/")
            });
    };
    //useEffect
    useEffect(() => {
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
    const InfoDetailProject = project.map((info, index) => {
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{info.nameProject}</td>
                <td>{info.tokenProject}</td>
                <td>
                    <Switch
                        checked={info.activeProject}
                        onChange={handleChange}
                        color="primary"
                        size="small"
                        name="checkedB"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </td>
                <td className="manage-table-tb-delete">

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
                </td>
            </tr>

        )
    })


    return (
        <div className="row m-r-0 m-l-0">
            <div className="col-lg-6 col-md-12 col-sm-12 ">
                <div className="card border-0 background-setting card-manage">
                    <div className="card-body card-body-manage ">
                        <div className="d-flex  justify-content-between align-items-baseline">
                            <FeatherIcon icon="settings" size={16} color="#727cf5" />
                            <h6 className="card-title mb-0 border-title title-card-header">CREATE NEW PROJECT</h6>

                        </div>
                        <div className="form-manage">
                            <form className="form-setting" onSubmit={handleSubmit(onSubmit)} >
                                <div className="form-group ">
                                    <label className="form-lable-manage" id="nameProject">NAME PROJECT</label>
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
                                            <label className="form-lable-manage">PROVINCIAL</label>
                                            <input type="text" className="form-control shadow-none rounded-0 input-setting " name="provincial"
                                                ref={register({
                                                    required: 'Required',
                                                })} />
                                            {errors.provincial && <p>Enter a valid provincial</p>}
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="form-group form-input-manage">
                                            <label className="form-lable-manage">DISTRICT</label>
                                            <input type="text" className="form-control shadow-none rounded-0 input-setting " name="district"
                                                ref={register({
                                                    required: 'Required',
                                                })} />
                                            {errors.district && <p>Enter a valid city or district</p>}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group form-input-manage">
                                    <label className="form-lable-manage">ADDRESS DETAILS</label>
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
                                            <th>ID</th>
                                            <th>NAME</th>
                                            <th>TOKEN</th>
                                            <th>ACTIVE</th>
                                            <th>ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {InfoDetailProject}
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

export default ManageSetting
