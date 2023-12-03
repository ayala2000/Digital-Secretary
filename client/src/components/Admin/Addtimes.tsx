import React,{ useState, ChangeEvent } from 'react';
import axios from 'axios';
import config from '../config ';

interface DaySchedule {
  day: number;
  openingHours: string[];
  closingHours: string[];
}

const AddScheduleForm: React.FC = () => {
  const [newSchedule, setNewSchedule] = useState<DaySchedule>({
    day: 0,
    openingHours: [],
    closingHours: [],
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSchedule({ ...newSchedule, [name]: value });
  };

  const handleAddOpeningClosingHours = () => {
    const { day, openingHours, closingHours } = newSchedule;

    if (day && openingHours.length > 0 && closingHours.length > 0) {
      console.log('i before post');
      console.log(newSchedule);
      axios.put(`${config.api}/activity-time/${day}`, newSchedule)
      
        .then((response) => {
          console.log('i after post');
          setNewSchedule({
            day: 0,
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
  return(
<div>
       <h2>Add Opening and Closing Hours</h2>
      <form>
        <label>
          Day:
          <input
            type="text"
            name="day"
            value={newSchedule.day}
            onChange={handleInputChange}/>
         </label> 
         <br />  
         <label>Opening Hours:</label>
         
         {newSchedule.openingHours.map((hour, index) => (
          <div key={`opening-hour-${index}`}>
            <input
              type="time"
              value={hour}
              onChange={(e) => {
                const newHours = [...newSchedule.openingHours];
                newHours[index] = e.target.value;
                setNewSchedule({ ...newSchedule, openingHours: newHours });
              }}
            />
               <button type="button" onClick={() => handleRemoveOpeningHour(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddOpeningHour}>
          Add Opening Hour
        </button>
        <br />
        <label>Closing Hours:</label>
        {newSchedule.closingHours.map((hour, index) => (
          <div key={`closing-hour-${index}`}>
            <input
              type="time"
              value={hour}
              onChange={(e) => {
                const newHours = [...newSchedule.closingHours];
                newHours[index] = e.target.value;
                setNewSchedule({ ...newSchedule, closingHours: newHours });
              }}
            />
            <button type="button" onClick={() => handleRemoveClosingHour(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddClosingHour}>
          Add Closing Hour
        </button>
        <br />
        <button type="button" onClick={handleAddOpeningClosingHours}>
          Add Schedule
        </button>
         </form>
         </div>
  );
}


export default AddScheduleForm;
