import React, { useState ,useEffect ,useLayoutEffect } from 'react';
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
  const _idProject = useSelector((state) => state.idTopicProject);
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
    axios.post('/api/manage/project/delete', {
      email :record.email ,
      
   })
    .then(function (res) {})
  };


   //Loadding Add new
   useEffect(() => {
    axios.post('/api/manage/project/get-user', {
       _idProject :_idProject
    })
    .then(function (res) {
      let resData=res.data ;
      if(resData.status){
        var dataInit = resData.users;
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


  //Save Edit Table
  const save = async (record,key) => {
    try {
      const row = await form.validateFields();
      //Post Data Edit
      axios.post('/api/manage/project/edit', {
        record : record,
        role : row.tags
        })
      .then(function (res) {
        if(res.status){
          dispatch({type:"LOADDING_ACCOUT_MANAGE"})
        }
      })
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
      title: 'Full Name',
      dataIndex: 'userName',
      width: '15%',
      editable: false,
    },
    {
        title: 'Email',
        dataIndex: 'email',
        width: '30%',
        editable: false,
    },
    {
        title: 'Role',
        key: 'tags',
        width: '25%',
        editable: true,
        dataIndex: 'tags',
        
        render: tags => (
          <>
            {tags.map(tag => {
              let color = 'success';
              switch (tag) {
                case 'ROLE_MANAGE':
                    color = 'success';              
                  break;
                case 'ROLE_SEE':
                    color = 'purple';
                  break;
                case 'ROLE_CONTROL':
                    color = 'geekblue';
                  break;
                default:
                  break;
              }
              return (
                <Tooltip overlayStyle={{fontSize:10}} placement="topLeft"  title="ROLE_MANAGER , ROLE_CONTROL & ROLE_SEE">
                  <Tag color={color} key={tag}>
                      {tag.toUpperCase()}
                  </Tag>
                </Tooltip>
              
              );
            })}
          </>
        ),
        
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record, record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <span>
              <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                  Edit
              </Typography.Link>
              <Typography.Link disabled={editingKey !== ''}>
                <Popconfirm title="Sure to Delete Tag ?" onConfirm={()=>deleteTag(record)}>
                   <a  style={{marginLeft: 12,}}>Delete</a>
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