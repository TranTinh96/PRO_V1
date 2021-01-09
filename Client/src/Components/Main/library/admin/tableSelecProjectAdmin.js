import React, { useState ,useEffect } from 'react';
import axios from "axios"
import jwt from 'jsonwebtoken';
import { useCookies } from 'react-cookie'
import { Table, Input, InputNumber, Popconfirm, Form, Typography ,Tag ,Tooltip} from 'antd';
import { useDispatch} from "react-redux";
import {  useHistory } from "react-router-dom"

import checkRole from "../../../services/fucRole"

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const TableSelecProjectAdmin = (props) => {

  const dispatch = useDispatch()
  const history = useHistory();
  const _idProject = localStorage.getItem("AuthID");;

  //Action project id

  const [_idProjectSelect ,set_IdProjectSelect ] = useState("")

   //Cookie
  const [cookies, removeCookie] = useCookies(["Auth"]);
  let jwtToken = jwt.decode(cookies.Auth)
  var role =checkRole(jwtToken.role);

  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  
  const isEditing = (record) => record.key === editingKey;

  const cancel = () => {
    setEditingKey('');
  };

  //Delete User Manage
  const deleteTag = async (record) => {
      localStorage.setItem("AuthID",record.tokenProject)
      set_IdProjectSelect(record.tokenProject)
      dispatch({type :"ID_TOPIC_PROJECT" ,_idProject : record.tokenProject})
      history.go(0)
  };


   //Loadding Add new
   useEffect(() => {
     if(role=="Administrator"){
      axios.get('/api/manage/setting')
      .then(function (res) {
        let resData=res.data ;
        if(resData.status){
          var dataInit = resData.data;
          console.log(dataInit)
          for (let i = 0; i < dataInit.length; i++) {
              dataInit[i].key = i.toString();
              dataInit[i].STT = i ;
        }
        setData(dataInit)
        
      }
      
      })
      .catch(function (error) {
        console.log(error);
      });
      
     }

     if(_idProject !="ADMIN"){
       set_IdProjectSelect(_idProject)
     }

      

  }, [])


  
  //Save Edit Table
  const save = async (record,key) => {
    try {
      const row = await form.validateFields();
      //Post Data Edit
    
      setEditingKey('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
        title: 'STT',
        dataIndex: 'STT',
        width: '5%',
        editable: false,
      },
    {
      title: 'Name',
      dataIndex: 'nameProject',
      width: '20%',
      editable: false,
    },
    {
        title: 'Token',
        dataIndex: 'tokenProject',
        width: '35%',
        editable: false,
    },
    {
      title: 'Time',
      dataIndex: 'timeCreate',
      width: '25%',
      editable: false,
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return ( 
          <span>
              <Typography.Link disabled={editingKey !== ''}>
                <Popconfirm title="Sure to Delete Tag ?" onConfirm={()=>deleteTag(record)}>
                   <a  style={{marginLeft: 0,}}>Active</a>
              </Popconfirm>
              </Typography.Link>
          </span>
         
          
        )
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'value' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  if(role =="Administrator")
  {
    return (
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
          title={() => `Action ID  :  ${_idProjectSelect}`}
        />
      </Form>
    );
  }
  return (
    <Form form={form} component={false}>
      
    </Form>
  );

};

export default TableSelecProjectAdmin;