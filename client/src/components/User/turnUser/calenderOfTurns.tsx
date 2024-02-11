import React, { useEffect, useState } from 'react';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { Alert, Calendar } from 'antd';


interface CalendarOfTurnsProps {
  selectedValue: any; // SomeType הוא הסוג של selectedValue
  setSelectedValue: (value: any) => void; // SomeType הוא הסוג של הערך שנשמר ב-selectedValue
  // נוסיף כאן את שאר הפרופס שלך
  handleFetchFreeQueuesFromChild: () => void;
  onSelect:(newValue:any)=>void; // Define the prop type for the callback function
}

  export const CalendarOfTurns: React.FC<CalendarOfTurnsProps> = ({selectedValue,setSelectedValue,handleFetchFreeQueuesFromChild,onSelect}) => {
    const getCurrentDate = () => dayjs();
    const [value, setValue] = useState<Dayjs>(getCurrentDate()); // Set the initial state to the current date and time

    const HandelOnSelect = (newValue: Dayjs) => {
      onSelect(newValue);
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
    
      {/* <Alert message={`You selected date: ${selectedValue?.format('YYYY-MM-DD')}`} /> */}
      <Calendar value={selectedValue} onSelect={HandelOnSelect} onPanelChange={onPanelChange} 
      style={{width:'50%',
      margin:'auto'}} />
      
    </>
  );
  
};




