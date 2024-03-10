import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import config from '../config ';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Form,
  Input,
  Button,
  Select,
  message,
} from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
const { Option } = Select;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface setting {
  webName: string;
  myText: string;
  phone: string,
  adress: string
  email: string,
}

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
export const BuildWebSite: React.FC = () => {
  const [form] = Form.useForm();
  const [open, setOpen] = React.useState(false);
  const [id, setId] = useState({});
  const [setting, setSetting] = useState<setting>({
    webName: 'Digital secretary',
    myText: `Welcome  Digital secretary`,
    phone: '0',
    adress: 'home:)',
    email: 'easyToe@tor.co.il'
  });

  const onFinish = (values: any) => {
    console.log(values, 'values');
    setSetting(values.user);
    handleBuildSetting(values.user);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSetting({ ...setting, [name]: value });
  };
  async function getData() {
    const getBuild: any = await axios.get(`${config.api}/build`)
      .then((respons) => {
        setId(respons.data._id);
        console.log(respons.data._id, "iiddd");

      })
    console.log(getBuild);
  }
  getData();

  const handleBuildSetting = (setting: any) => {
    axios.put(`${config.api}/build/${id}`, setting).then(() => {
      message.success('you update your setting succesfully');
    }) 
      .catch((error) => {
        console.error('Error adding turn:', error);
      });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  return (
    <React.Fragment>
      <FileTextOutlined className="process-icon my-2"
        onClick={handleClickOpen}/>
      <Dialog open={open} onClose={handleClose} sx={{ padding: 5, width: '100%', opacity: 0.9, backgroundColor: '#333' }}>
        <DialogTitle>My details</DialogTitle>
        <DialogContent>
          <div>
            <Form
              {...layout}
              form={form}
              name="register"
              onFinish={onFinish}
              initialValues={{ prefix: '86' }}
              style={{ maxWidth: 600, opacity: 1 }}
              scrollToFirstError
              validateMessages={validateMessages}>
              <label > My WebSite Name:</label>
              <Form.Item name={['user', 'webName']} rules={[{ required: true }]}>
                <Input
                  type="text"
                  value={setting.webName}
                  style={{ width: 300, height: 35, backgroundColor: '#fff' }}
                />
              </Form.Item>
              <label > My text: This text will be displayed on the home page of the website</label>
              <Form.Item name={['user', 'myText']} rules={[{ required: true }]}>
                <Input.TextArea
                  value={setting.myText}
                  showCount maxLength={500}
                  style={{ width: 300, height: 65, backgroundColor: '#fff' }}
                />
              </Form.Item>
              <label > Where is me?</label>
              <Form.Item name={['user', 'adress']} rules={[{ required: true }]}>
                <Input
                  type="text"
                  value={setting.adress}
                  onChange={handleInputChange}
                  style={{ width: 300, height: 35 }}
                />
              </Form.Item>
              <h3 color='rgb(0, 33, 64)'>contact:</h3>
              <label > Phone Number</label>
              <Form.Item
                name={['user', 'phone']}
                rules={[{ required: true, message: 'Please input your phone number!' }]}
              >
                <Input addonBefore={prefixSelector}
                  value={setting.phone}
                  onChange={handleInputChange}
                  style={{ width: 300, height: 35 }} />
              </Form.Item>
              <label > Email</label>
              <Form.Item
                name="email"
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid Email!',
                  },
                  {
                    required: true,
                    message: 'Please input your Email!',
                  },
                ]}
              >
                <Input value={setting.email} onChange={handleInputChange} style={{ width: 300, height: 35 }} />
              </Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: 300, height: 35, backgroundColor: '#333' }} > SEND  </Button>
            </Form>
          </div>
        </DialogContent>
        <DialogActions sx={{ m: 'auto' }}>
          <Button onClick={handleClose} style={{ color: '#333' }}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};