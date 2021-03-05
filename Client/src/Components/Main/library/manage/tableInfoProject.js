import React ,{useEffect ,useState} from 'react'
import { Table} from 'antd';
import axios from "axios"
import {useSelector} from "react-redux";


const columns = [
    {
      title: 'Name',
      dataIndex: 'nameProject',
      key: 'nameProject',
    },
    {
      title: 'Token',
      dataIndex: 'tokenProject',
      key: 'tokenProject',
    },
    {
        title: 'Time',
        dataIndex: 'timeCreate',
        key: 'timeCreate',
    },

  ];

function TableInfoProject() {
    const _idProject = localStorage.getItem("AuthID");
    const [data, setData] = useState([]);
    var infoProject = [{
        key :" ",
        nameProject :" ",
        tokenProject : " ",
        timeCreate : " "
    }]
    useEffect(() => {
        axios.post('/api/cabin/accouts/information', {
            _idProject :_idProject 
         })
         .then(function(res) {
             let resData = res.data;
             console.log(resData)
             if(resData.status){
                infoProject[0].key ='1';
                infoProject[0].nameProject = resData.project.nameProject;
                infoProject[0].tokenProject = resData.project.tokenProject;
                infoProject[0].timeCreate = resData.project.timeCreate;
             }
             setData(infoProject)
        
         })
         .catch(function (error) {
           console.log(error);
     });
    }, [])

    return (
        <Table columns={columns} dataSource={data} />
    )
}

export default TableInfoProject
