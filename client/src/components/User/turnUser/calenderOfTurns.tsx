import React, { useEffect, useState } from 'react';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { Alert, Calendar } from 'antd';
import { AddTreatmentForm } from './addTurn';
import { useNavigate } from 'react-router-dom';
import App from '../../../App';

interface CalendarOfTurnsProps {
  selectedValue: any; // SomeType הוא הסוג של selectedValue
  setSelectedValue: (value: any) => void; // SomeType הוא הסוג של הערך שנשמר ב-selectedValue
  // נוסיף כאן את שאר הפרופס שלך
  handleFetchFreeQueuesFromChild: () => void; // Define the prop type for the callback function
}

  export const CalendarOfTurns: React.FC<CalendarOfTurnsProps> = ({selectedValue,setSelectedValue,handleFetchFreeQueuesFromChild}) => {
    const getCurrentDate = () => dayjs();
    const [value, setValue] = useState<Dayjs>(getCurrentDate()); // Set the initial state to the current date and time
    const navigate = useNavigate();

    const isDateValid = (date: Dayjs) => {
      return date.isAfter(getCurrentDate()) && date.day() !== 6;
    };
  
    const onSelect = (newValue: Dayjs) => {
      if (isDateValid(newValue)) {
        setValue(newValue);
        setSelectedValue(newValue);
        handleFetchFreeQueuesFromChild();
      } else {
        console.log('Invalid date selection.');
      }
    };
  
  const onPanelChange = (newValue: Dayjs) => {
    setValue(newValue);
  };
  useEffect(() => {
    // Update the selectedValue to match the current date and time
    setSelectedValue(getCurrentDate());
  }, []);

  return (
    <>
    
      <Alert message={`You selected date: ${selectedValue?.format('YYYY-MM-DD')}`} />
      <Calendar value={selectedValue} onSelect={onSelect} onPanelChange={onPanelChange}  />
      
    </>
  );
  
};




