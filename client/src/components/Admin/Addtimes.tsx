import React, { useState } from 'react';
import axios from 'axios';
import config from '../config ';
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,  TextField } from '@mui/material';
import { Form, Input } from 'antd';
import { Button as But } from 'antd';
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
  const onFinish = (values: any) => {
    console.log(values,'values');
    
  };

  //const [optionsDays, setOptionsDays] = useState([]);
  const optionsDays = [
    { label: ' ראשון', id: 1 },
    { label: ' שני', id: 2 },
    { label: ' שלישי', id: 3 },
    { label: ' רביעי', id: 4 },
    { label: ' חמישי', id: 5 },
    { label: ' שישי', id: 6 },
    { label: ' שבת', id: 7 },
  ];
  const [selectedDayId, setSelectedDayId] = useState<number | null>(null);
  const [newSchedule, setNewSchedule] = useState<DaySchedule>({
    day: 0,
    openingHours: [],
    closingHours: [],
  });

  const handleInputChange = (e: any, newValue: any) => {
    console.log(newValue.label);
    console.log(newValue.id);

    if (newValue) {
      setSelectedDayId(newValue.id);
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
        .then((response) => {

          setNewSchedule({
            day: scheduleData.day,
            openingHours: [],
            closingHours: [],
          });
          // setSelectedDayId(null);

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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  

  

  return (
    <div>
      <h2>Add Opening and Closing Hours</h2>

     
        <React.Fragment  >
        <Button variant="outlined" onClick={handleClickOpen}>
        fill my details
      </Button>     
      <Dialog open={open} onClose={handleClose} sx={{ padding: 5, width: '100%', opacity:0.9 , mr:0}}>
        <DialogTitle>My details</DialogTitle>
        <DialogContent sx={{m:'auto'}}>
          <DialogContentText>

          </DialogContentText >
          <div>

          <Form
           {...layout}
           form={form}
           name="register"
           onFinish={onFinish}
           initialValues={{  prefix: '86' }}
           style={{ maxWidth: 600,opacity:1 }}
           scrollToFirstError
           validateMessages={validateMessages}>
     

     <Autocomplete

       options={optionsDays}
       sx={{ width: 200,height:50}}
       onChange={handleInputChange}

       renderInput={(params) => (
         <TextField {...params} label="Day" variant="outlined" />
       )}
     />
     <br />
<Button  onClick={handleAddOpeningHour} sx={{mr:'40px',color:'white',backgroundColor:'rgb(0, 33, 64)'}}> 
       Add Opening Hour
     </Button>

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
         <Button  onClick={() => handleRemoveOpeningHour(index)}>
           Remove
         </Button>
       </div>
     ))}
     <br />
       <Button  onClick={handleAddClosingHour}>
       Add Closing Hour
     </Button>
    
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
         <Button  onClick={() => handleRemoveClosingHour(index)}>
           Remove
         </Button>
       </div>
     ))}
   
     <br />
     <But onClick={handleAddOpeningClosingHours} style={{ maxWidth: 600,margin:'auto'}}>
       Add Schedule
     </But>
   </Form>
          </div>

        </DialogContent>
        <DialogActions sx={{m:'auto'}}>

          <Button onClick={handleClose} style={{color:'rgb(0, 33, 64)'}}>Close</Button>
        </DialogActions>
      </Dialog>   
            
             
         
        </React.Fragment>
   
    </div>
  );}



export default AddScheduleForm;



