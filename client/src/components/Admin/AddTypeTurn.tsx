import React, { useState, ChangeEvent, useEffect } from 'react';
import axios from 'axios';
import config from '../config ';
import { Button, Form, Input, Modal, message } from 'antd';
import layout from 'antd/es/layout';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
interface Turn {
  typeOfTurn: string;
  duration: number;
  ManagerTurn: string;
  price:number;
}

const AddTurnForm: React.FC = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [turnName, setTurnName] = useState('');
  const [loading, setLoading] = useState(false);
  const [clientReady, setClientReady] = useState<boolean>(false);
  const [newTurn, setNewTurn] = useState<Turn>({
    typeOfTurn: '',
    duration: 0,
    ManagerTurn: '',
    price:0,
  });

  useEffect(() => {
    setClientReady(true);
  }, []);
  const onFinish = (values: any) => {
    console.log(values, 'values');
    setNewTurn(values.user);
  };
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTurn({ ...newTurn, [name]: value });
  };

  const handleDeleteTurn = () => {
    console.log(turnName,' console.log(turnName);');
    axios.delete(`${config.api}/turns-type/${turnName}`)
      .then(() => {
        message.success(`${turnName} deleted successfully!`);
        setVisible(false);
        form.resetFields();
      })
      .catch(error => {
        console.error('Error deleting turn:', error);
        message.error('Failed to delete treatment type.');
      })   
  };

  const handleAddTurn = () => {
    axios.post(`${config.api}/turns-type/`, newTurn) // שנה את ה-URL לכתובת הנכונה שבשרת
      .then((_response) => {
        // עדכן את הסטייט עם התור החדש מהשרת
        message.success('Turn added successfully!');
        setVisible(false);
        form.resetFields(); 
      })
      .catch((error) => {
        console.error('Error adding turn:', error);
      });
  };
  return (
    <>
      <PlusCircleOutlined className="process-icon my-2"
        onClick={() => setVisible(true)} />
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        className='addTypeModal'
      >
        <div >
          <h2>Add New Turn</h2>
          <Form
            {...layout}
            form={form}
            name="user"
            onFinish={onFinish}
            initialValues={{ prefix: '86' }}
            style={{ maxWidth: 300, opacity: 1 }}
            scrollToFirstError
            validateMessages={validateMessages}>
            <label style={{ marginTop: 10 }}>Type of Turn:
              <Form.Item
                name={['user', 'text']}
                rules={[{ required: true, message: 'Please input Name of service!' }]}
              >
                <Input
                  type="text"
                  name="typeOfTurn"
                  value={newTurn.typeOfTurn}
                  onChange={handleInputChange}
                  required
                  style={{ width: 250, height: 38, marginTop: 10 }}
                />
              </Form.Item>
            </label>
            <br />
            <label style={{ marginTop: 10 }}>Duration:
              <Form.Item
                name={['user', 'duration']}
                rules={[
                  { required: true, message: 'Please input the duration!' },
                  {
                    type: 'number',
                    message: 'Please input a valid number for duration!',
                    transform: (value) => Number(value), // Ensure the value is treated as a number
                    validator: (_, value) => {
                      if ( value > 1) {
                        return Promise.resolve();
                      }
                      return Promise.reject('Duration must be a positive number greater than 0!');
                    },
                  }
                ]}
              >
                <Input
                  type="number"
                  name="duration"
                  value={newTurn.duration}
                  onChange={handleInputChange}
                  style={{ width: 250, height: 38, marginTop: 10 }}
                /></Form.Item>
            </label>
            <br />
            <label>Manager Turn:
              <br />
          <Form.Item>
              <Input
                type="text"
                name="ManagerTurn"
                value={newTurn.ManagerTurn}
                onChange={handleInputChange}
                style={{ width: 250, height: 38, marginTop: 10 }}
              />
              </Form.Item>
            </label>
            <br />
            <label style={{ marginTop: 10 }}>Price:
            <Form.Item
                name={['user', 'price']}
                rules={[
                  { required: true, message: 'Please input the price!' },
                  {
                    type: 'number',
                    message: 'Please input a valid number for duration!',
                    transform: (value) => Number(value), // Ensure the value is treated as a number
                    validator: (_, value) => {
                      if ( value > 1) {
                        return Promise.resolve();
                      }
                      return Promise.reject('Duration must be a positive number greater than 0!');
                    },
                  }
                ]}
              >
                <Input
                  type="number"
                  name="price"
                  value={newTurn.price}
                  onChange={handleInputChange}
                  style={{ width: 250, height: 38, marginTop: 10 }}

                /></Form.Item></label>

            <Form.Item shouldUpdate>
        {() => (
              <Button onClick={handleAddTurn} 
                disabled={
                  !clientReady ||
                  !form.isFieldsTouched(true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length).length
                }
              type="primary" htmlType="submit" style={{ width: 300, height: 35, backgroundColor: '#333' }}>
                Add Turn
              </Button> )}
      </Form.Item>
            </Form>
        </div>
        <div style={{ marginTop: '20px' }}>
        <h2>Delete Treatment Type</h2>
        <Form layout="inline">
          <Form.Item label="Treatment Type Name">
            <Input 
              placeholder="Enter treatment type name"
              value={turnName}
              onChange={(e) => setTurnName(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button 
              type="primary" 
              icon={<DeleteOutlined />} 
              onClick={handleDeleteTurn} 
              loading={loading}
              disabled={!turnName.trim()}
            >
              Delete
            </Button>
          </Form.Item>
        </Form>
      </div>
      </Modal>
    </>
  );
};
export default AddTurnForm;