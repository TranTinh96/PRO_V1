import React ,{useState ,useEffect ,useLayoutEffect} from "react";
import { Drawer, Form, Button, Col, Input, Alert} from 'antd'
import Select from 'react-select'
import axios from "axios"
import { useSelector ,useDispatch } from "react-redux";

const optionsName = [
  { value: 'Votage Line - Neutral ( VLN )', label: 'Votage Line - Neutral ( VLN )' },
  { value: 'Votage Line - Neutral ( V1N )', label: 'Votage Line - Neutral ( V1N )' },
  { value: 'Votage Line - Neutral ( V2N )', label: 'Votage Line - Neutral ( V2N )' },
  { value: 'Votage Line - Neutral ( V3N )', label: 'Votage Line - Neutral ( V3N )' },
  { value: 'CURRENT ( I )', label: 'CURRENT ( I )' },
  { value: 'CURRENT ( I1 )', label: 'CURRENT ( I1 )' },
  { value: 'CURRENT ( I2 )', label: 'CURRENT ( I2 )' },
  { value: 'CURRENT ( I3 )', label: 'CURRENT ( I3 )' }
]

function  DrawerForm() {
  const dispatch = useDispatch()
  const _idProject = useSelector((state) => state.idTopicProject);

  const [visible ,setVisible] = useState(false)
  const [name ,setName] = useState()
  const [errorForm ,setErrorForm] = useState(false)
  const [errorFormCondited ,setErrorFormCondited] = useState(false)
  const [state, setState] = useState({
    HH: 0,
    H: 0 ,
    L :0,
    LL:0,
    Rate :0
  })


  //Handle
  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  }


  const onCreate = () => {
      if( (!isNaN(state.HH))&& (!isNaN(state.H))&& (!isNaN(state.L))&& (!isNaN(state.LL))&&(!isNaN(state.Rate))){
            //Covert Int
            var HH = parseInt(state.HH)
            var H = parseInt(state.H)
            var L = parseInt(state.L)
            var LL = parseInt(state.LL)
            var Rate = parseInt(state.Rate)
            if((LL <= L)&& (L<= H) && H<=HH && HH > 0 )
                {
                  var dataTagAlarm={
                    _idProject :_idProject ,
                    nameTag : name,
                    HH : HH,
                    H : H ,
                    L : L ,
                    LL : LL ,
                    Rate : Rate
                }
                axios.post('/api/cabin/alarm/create-tag', dataTagAlarm)
                .then(function (res) {
                  
                })
                .catch(function (error) {
                  console.log(error);
                });
                dispatch({type:"LOADDING_DATA_ALARM"})
                setVisible(false)
                }
            else
                {
                    setErrorFormCondited(true) 
                    setTimeout(function(){ 
                      setErrorFormCondited(false)  
                    }, 5000);

                }      
    }
    else{
      setErrorForm(true) 
      setTimeout(function(){ 
        setErrorForm(false)  
      }, 5000);
    }
  }

  const showDrawer = () => {
    
    setVisible(true)
  };

  const onClose = () => {
     setVisible(false)
  };

  const handleChangeName = (value) => {
    setName(value.value);
  };


    return (
      <>
     
       <Button type="primary" onClick={showDrawer}>
            + ADD TAG ALARM
        </Button>
        <Drawer
          title="Create a new alarm"
          width={400}
          onClose={onClose}
          visible={visible}
          style={{
            fontSize:12 ,
            color:"#9b5de5"
          }}
          closable={false}
          headerStyle={{
            fontSize:13 ,
            color:"#9b5de5"
          }}
          bodyStyle={{ 
            paddingBottom: 80 ,
           
          }}
          className="drawerContainer"

          footer={
            <div
              style={{
                textAlign: 'right',
                
              }}
            >
              <Button onClick={onClose} style={{ marginRight: 8 ,fontSize:12 , fontWeight:600}}>
                Cancel
              </Button>
              <Button onClick={onCreate} type="primary" style={{ marginRight: 8 ,fontSize:12 ,  fontWeight:600 }}>
                Submit
              </Button>
            </div>
          }
        >
          <Form layout="vertical" hideRequiredMark>
            <Col gutter={16}>
                 <Form.Item
                    name="Name"
                    label="Name"
                    rules={[{ required: true, message: 'Please select the name ' }]}
                  >
                   <Select options={optionsName}  getStyles={{fontSize:12 } } initialValues="VLN" onChange={handleChangeName}/>
                </Form.Item>
            </Col>
            <Col gutter={16}>
                <Form.Item
                  name="High High"
                  label="High High"
                  rules={[{ required: true, message: 'Please chose level High High' }]}
                >
                 <Input name ="HH" value="HH" onChange={handleChange} />
                </Form.Item>
            </Col>
            <Col gutter={16}>
                <Form.Item
                  name="High"
                  label="High"
                  rules={[{ required: true, message: 'Please chose level High' }]}
                >
                 <Input  name ="H" value="H"  onChange={handleChange}/>
                </Form.Item>
            </Col>
            <Col gutter={16}>
                <Form.Item
                  name="Low"
                  label="Low"
                  rules={[{ required: true, message: 'Please chose level Low' }]}
                >
               <Input  name ="L" value="L"  onChange={handleChange}/>
                </Form.Item>
            </Col>
            <Col gutter={16}>
                <Form.Item
                  name="Low Low"
                  label="Low Low"
                  rules={[{ required: true, message: 'Please chose level Low Low' }]}
                >
                   <Input  name ="LL" value="LL"  onChange={handleChange}/>
                </Form.Item>
            </Col>
            <Col gutter={16}>
                <Form.Item
                  name="Rate"
                  label="Deadband"
                  rules={[{ required: true, message: 'Please chose level Rate' }]}
                >
                  <Input  name ="Rate" value="Rate"  onChange={handleChange}/>
                </Form.Item>
            </Col>
            {
              (errorForm) ?<Col gutter={16}>  
                                <Alert message=" HH , H ,L , LL , Rate  don't  exits  or Int" type="error" showIcon />
                          </Col>  : 
                          <Col gutter={16}>  
                           
                          </Col>
            }
            {
              (errorFormCondited) ?<Col gutter={16}>  
                                <Alert message=" A satisfies the condition" type="error" showIcon />
                          </Col>  : 
                          <Col gutter={16}>  
                           
                          </Col>
            }
            
          </Form>
        </Drawer>
      </>
    );
}

export default DrawerForm

