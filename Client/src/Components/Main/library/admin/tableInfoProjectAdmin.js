import React, { useState ,useEffect } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography ,Tag ,Tooltip} from 'antd';
import axios from 'axios'
import { useDispatch ,useSelector } from "react-redux";



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

const EditableUser = (props) => {

  const dispatch = useDispatch()
  const _idProject = localStorage.getItem("AuthID");
  const isLoaddingAccoutManage = useSelector((state) => state.isLoaddingAccoutManage);

  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  
  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      FullName: '',
      Email: '',
      Role: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  //Delete User Manage
  const deleteTag = async (record) => {
    const newData = [...data];
    newData.splice( parseInt(record.key), 1);
    setData(newData);
    setEditingKey('');
    axios.post('/api/manage/setting/delete', {
      _idProject :record.tokenProject ,
      
   })
    .then(function (res) {})
  };


   //Loadding Add new
   useEffect(() => {
    axios.get('/api/manage/setting')
    .then(function (res) {
      let resData=res.data ;
      console.log(resData)
      if(resData.status){
        var dataInit = resData.data;
        for (let i = 0; i < dataInit.length; i++) {
            dataInit[i].key = i.toString();
            dataInit[i].STT = i ;
            dataInit[i].tags = [ dataInit[i].role]
      }
      setData(dataInit)
      dispatch({type:"NO_LOADDING_ACCOUT_MANAGE"})   
    }
    
  })
    .catch(function (error) {
      console.log(error);
    });

  }, [isLoaddingAccoutManage])



  const columns = [
    {
      title: 'Name',
      dataIndex: 'nameProject',
      width: '15%',
      key: 'nameProject',
    },
    {
      title: 'Token',
      dataIndex: 'tokenProject',
      width: '30%',
      key: 'tokenProject',
    },
    {
        title: 'Time',
        dataIndex: 'timeCreate',
        width: '20%',
        key: 'timeCreate',
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      width: '10%',
      render: (_, record) => {
        return  (
          <span>
              <Typography.Link disabled={editingKey !== ''}>
                <Popconfirm title="Sure to Delete Tag ?" onConfirm={()=>deleteTag(record)}>
                   <a  style={{marginLeft: 12,}}>DEL</a>
              </Popconfirm>
              </Typography.Link>
          </span>
         
          
        );
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
      />
    </Form>
  );
};

export default EditableUser;