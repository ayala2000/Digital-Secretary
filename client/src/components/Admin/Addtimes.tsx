import React, { useState } from 'react';
import axios from 'axios';
import config from '../config ';
import { Form, Input, Select } from 'antd';
import { Button as But } from 'antd';
import { Modal } from 'antd';
import { HistoryOutlined } from '@ant-design/icons';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
interface DaySchedule {
  day: number;
  openingHours: string[];
  closingHours: string[];
}

const AddScheduleForm: React.FC = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false); // State to control the visibility of the modal
  const [selectedDayId, setSelectedDayId] = useState<number | null>(null);
  const [newSchedule, setNewSchedule] = useState<DaySchedule>({
    day: 0,
    openingHours: [],
    closingHours: [],
  });
  const onFinish = (values: any) => {
    console.log(values, 'values');

  };

  const optionsDays = [
    { label: ' Sunday', value: 1 },
    { label: ' Mmonday', value: 2 },
    { label: ' Tuesday', value: 3 },
    { label: ' Wednesday', value: 4 },
    { label: ' Thursday', value: 5 },
    { label: ' Friday', value: 6 },
    { label: ' Saturday', value: 7 },
  ];

  const handleInputChange = (value: string) => {
    console.log(value + 'label');
    if (value) {
      setSelectedDayId(parseInt(value));
    } else {
      setSelectedDayId(null);
    }
  };

  const handleAddOpeningClosingHours = () => {
    const { openingHours, closingHours } = newSchedule;
    if (selectedDayId !== null && openingHours.length > 0 && closingHours.length > 0) {
      const scheduleData = {
        day: selectedDayId,
        openingHours: openingHours,
        closingHours: closingHours,
      };
      console.log('i before post');
      console.log(newSchedule);
      axios.put(`${config.api}/activity-time/${scheduleData.day}`, scheduleData)
        .then((_response) => {
          setNewSchedule({
            day: scheduleData.day,
            openingHours: [],
            closingHours: [],
          });
        })

        .catch((error) => {
          console.error('Error adding schedule:', error);
        });
    } else {
      alert('Please provide day, opening hours, and closing hours.');
    }
  };

  const handleAddOpeningHour = () => {
    const { openingHours } = newSchedule;
    setNewSchedule({ ...newSchedule, openingHours: [...openingHours, ''] });
  };

  const handleAddClosingHour = () => {
    const { closingHours } = newSchedule;
    setNewSchedule({ ...newSchedule, closingHours: [...closingHours, ''] });
  };

  const handleRemoveOpeningHour = (index: number) => {
    const { openingHours } = newSchedule;
    openingHours.splice(index, 1);
    setNewSchedule({ ...newSchedule, openingHours });
  };

  const handleRemoveClosingHour = (index: number) => {
    const { closingHours } = newSchedule;
    closingHours.splice(index, 1);
    setNewSchedule({ ...newSchedule, closingHours });
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
  };

  return (
    <div>
      <React.Fragment  >
        <HistoryOutlined className="process-icon my-2"
          onClick={() => setVisible(true)} />
        <Modal
          visible={visible}
          onCancel={() => setVisible(false)}
          footer={null}>
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
              <Select
                onChange={handleInputChange} // Update this line
                options={optionsDays}
                style={{ width: 200, height: 30, marginTop: 10 }}
                placeholder="select a day"
              />
              <But onClick={handleAddOpeningHour} style={{ marginTop: 4, marginRight: '40px', color: 'white', backgroundColor: '#333', width: '73%' }}>
                Add Opening Hour
              </But>
              <br />
              {newSchedule.openingHours.map((hour, index) => (
                <div key={`opening-hour-${index}`}>
                  <Input
                    type="time"
                    value={hour}
                    onChange={(e) => {
                      const newHours = [...newSchedule.openingHours];
                      newHours[index] = e.target.value;
                      setNewSchedule({ ...newSchedule, openingHours: newHours });
                    }}
                  />
                  <But onClick={() => handleRemoveOpeningHour(index)}>
                    Remove
                  </But>
                </div>
              ))}
              <br />
              <But onClick={handleAddClosingHour} style={{ marginTop: 4, marginRight: '40px', color: 'white', backgroundColor: '#333', width: '73%' }}>
                Add Closing Hour
              </But>
              <br />
              {newSchedule.closingHours.map((hour, index) => (
                <div key={`closing-hour-${index}`}>
                  <Input
                    type="time"
                    value={hour}
                    onChange={(e) => {
                      const newHours = [...newSchedule.closingHours];
                      newHours[index] = e.target.value;
                      setNewSchedule({ ...newSchedule, closingHours: newHours });
                    }}
                  />
                  <But onClick={() => handleRemoveClosingHour(index)}>
                    Remove
                  </But>
                </div>
              ))}
              <br />
              <But onClick={handleAddOpeningClosingHours} style={{ maxWidth: 600, marginLeft: '15%' }}>
                Add Schedule
              </But>
            </Form>
          </div>
        </Modal>
      </React.Fragment>
    </div>
  );
}

export default AddScheduleForm;