import React, { useState ,useEffect } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography ,Button} from 'antd';
import axios from 'axios'
const originData = [];



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

const EditableAlarm = (props) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      HH: '',
      H: '',
      L: '',
      LL: '',
      Rate: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const deleteTag = () => {
    setEditingKey('');
  };

  useEffect(() => {
    axios.post('/api/cabin/alarm/get-tag', {
       _idProject :props._idProject
    })
    .then(function (res) {
      let resData=res.data ;
      if(resData.status){
        var dataInit = resData.dataAlarm;
        for (let i = 0; i < dataInit.length; i++) {
          originData.push({
              key: i.toString(),
              STT : i,
              nameTag: dataInit[i].name,
              HH: dataInit[i].HH,
              H: dataInit[i].H,
              L: dataInit[i].L,
              LL: dataInit[i].LL,
              Rate: dataInit[i].Rate,
              Status: dataInit[i].status,
              value : dataInit[i].valueTag
          });
        }
        
      }
      setData(originData)
      
    })
    .catch(function (error) {
      console.log(error);
    });

 

  }, [])

  //Save Edit Table
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      console.log(row)
      console.log(newData)

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
      //Post Data Edit
      var newFomatData = {
        HH: parseInt(row.HH),
        H: parseInt(row.H),
        L: parseInt(row.L),
        LL: parseInt(row.LL),
        Rate: parseInt(row.Rate),
      }
      axios.post('/api/cabin/alarm/edit-tag', {
          _idProject :props._idProject ,
          dataEditAlarm : newFomatData ,
          index : parseInt(key)
       })
     .then(function (res) {})

    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
        title: 'STT',
        dataIndex: 'STT',
        width: '3%',
        editable: false,
      },
    {
      title: 'Tags Name',
      dataIndex: 'nameTag',
      width: '15%',
      editable: false,
    },
    {
      title: 'High High',
      dataIndex: 'HH',
      width: '10%',
      editable: true,
    },
    {
      title: 'High',
      dataIndex: 'H',
      width: '10%',
      editable: true,
    },
    {
        title: 'Low',
        dataIndex: 'L',
        width: '10%',
        editable: true,
    },
    {
        title: 'Low Low',
        dataIndex: 'LL',
        width: '10%',
        editable: true,
     },
    {
        title: 'Rate',
        dataIndex: 'Rate',
        width: '10%',
        editable: true,
    },
    {
        title: 'Tags value',
        dataIndex: 'value',
        width: '10%',
        editable: false,
    },
    {
        title: 'Status',
        dataIndex: 'Status',
        width: '10%',
        editable: false,
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
              onClick={() => save(record.key)}
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
                <Popconfirm title="Sure to Delete Tag ?" onConfirm={deleteTag}>
                <a>Delete</a>
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
        inputType: col.dataIndex === 'HH' ? 'number' : 'text',
        inputType: col.dataIndex === 'H' ? 'number' : 'text',
        inputType: col.dataIndex === 'L' ? 'number' : 'text',
        inputType: col.dataIndex === 'LL' ? 'number' : 'text',
        inputType: col.dataIndex === 'Rate' ? 'number' : 'text',
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

export default EditableAlarm;