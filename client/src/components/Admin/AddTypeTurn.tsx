import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import config from '../config ';
import AddScheduleForm from './Addtimes';

interface Turn {
  typeOfTurn: string;
  duration: number;
  ManagerTurn: string;
}



const AddTurnForm: React.FC = () => {
  const [newTurn, setNewTurn] = useState<Turn>({
    typeOfTurn: '',
    duration: 0,
    ManagerTurn: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTurn({ ...newTurn, [name]: value });
  };

  const handleAddTurn = (event:any) => {
       event.preventDefault();
       axios.post(`${config.api}/turns-type/`, newTurn) // שנה את ה-URL לכתובת הנכונה שבשרת
      .then((response) => {
       // עדכן את הסטייט עם התור החדש מהשרת
        setNewTurn({
          typeOfTurn: '',
          duration: 0,
          ManagerTurn: '',
        });
      })
      .catch((error) => {
        console.error('Error adding turn:', error);
      });
  };

  return (
    <div>
      <h2>Add New Turn</h2>
      <form>
        <label>Type of Turn:
          <input
            type="text"
            name="typeOfTurn"
            value={newTurn.typeOfTurn}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>Duration:
          <input
            type="number"
            name="duration"
            value={newTurn.duration}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>Manager Turn:
          <input
            type="text"
            name="ManagerTurn"
            value={newTurn.ManagerTurn}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="button" onClick={handleAddTurn}>Add Turn</button>
      </form>
      <AddScheduleForm/>
    </div>
  
  );
};

export default AddTurnForm;
