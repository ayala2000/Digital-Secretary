import React, { useEffect, useState } from 'react';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { Button, Calendar, Modal } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';

interface CalendarOfTurnsProps {
  selectedValue: any;
  setSelectedValue: (value: any) => void;
  handleFetchFreeQueuesFromChild: () => void;
  onSelect: (newValue: any) => void;
}

export const CalendarOfTurns: React.FC<CalendarOfTurnsProps> = ({ selectedValue, setSelectedValue, handleFetchFreeQueuesFromChild, onSelect }) => {
  const getCurrentDate = () => dayjs();
  const [value, setValue] = useState<Dayjs>(getCurrentDate());
  const [visible, setVisible] = useState(false); // State to control the visibility of the modal

  const HandelOnSelect = (newValue: Dayjs) => {
    onSelect(newValue);
    setVisible(false); // Close the modal after selecting a date
  };

  const onPanelChange = (newValue: Dayjs) => {
    setValue(newValue);
  };

  useEffect(() => {
    setSelectedValue(getCurrentDate());
  }, []);

  return (
    <>
      <Button style={{
        fontSize: 27, height: 68, marginTop: '50px', marginBottom: 20,
        borderRadius: 14, fontWeight: 'bold', backgroundColor: '#333',
        color: '#faad14 ', textAlign: 'center', borderColor: '#faad14 ',
        borderWidth: 'medium',
      }}

        onClick={() => setVisible(true)}
        icon={<CalendarOutlined style={{ fontSize: 25 }} />}>
        Other Date
      </Button>

      <Modal
        title="Select a Date"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Calendar value={selectedValue} onSelect={HandelOnSelect} onPanelChange={onPanelChange} />
      </Modal>
    </>
  );
};
