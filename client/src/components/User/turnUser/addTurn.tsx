import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Autocomplete, Grid, TextField } from '@mui/material';
import Cookies from 'js-cookie';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { CalendarOfTurns } from './calenderOfTurns';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';
import { setUser } from '../../../Redux/userSlice';
import type { Dayjs } from 'dayjs';
//import { PopupProvider, useAlert } from "react-hook-popup";
import dayjs from 'dayjs';

import { format } from 'date-fns';
import { TurnState, setTurns } from '../../../Redux/turnSlice';
import { JSX } from 'react/jsx-runtime';


interface Treatment {
  date: Date;
  time: Date;
  patientName: string;
  name: string;
  duration: number;
  email: string
}
// ***props inerface***
interface AddTreatmentFormProps {

  // selectedValue: any; // SomeType הוא הסוג של selectedValue
  // setSelectedValue: (value: any) => void; // SomeType הוא הסוג של הערך שנשמר ב-selectedValue

}
// *** component function ***
export const AddTreatmentForm: React.FC<AddTreatmentFormProps> = ({ }) => {
  //** use readux */
  const user = useSelector((state: RootState) => state.user)
  const turns = useSelector((state:TurnState) => state.turns)
  const dispatch = useDispatch()
  const getCurrentDate = (): Dayjs => {
    return dayjs().startOf('day');
  };
  const [turnsType, setTurnsType] = useState([]);

  //const[alert1] = useAlert()
  const [isChildVisible, setIsChildVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState<Dayjs>(getCurrentDate()); 
  const toggleChildVisibility = (value: any) => {
    {
      (value) ?
      setIsChildVisible(true)
      :
      setIsChildVisible(false)
    }
  };
  const isDateValid = (date: Dayjs) => {
    const currentDate = getCurrentDate();
    return date.isSame(currentDate)||date.isAfter(currentDate);
  };

  const onSelect = (newValue: Dayjs) => {
    if (isDateValid(newValue)) {
      // setValue(newValue);
      setSelectedValue(newValue);
      setTreatment({ ...treatment, date: newValue.toDate() });
      handleFetchFreeQueuesFromChild(newValue);
    } else {
      alert('This day is not active.');
    }
  };
  console.log(selectedValue, 'selectedValue');
  const [optionsTreatment, setOptionsTreatment] = useState([]);
  // const [turns, setTurns] = useState([]);
  const navigate = useNavigate();

  

  console.log('user', user);
  dispatch(setUser());
  const [treatment, setTreatment] = useState<Treatment>({
    date: new Date(Date.now()),
    time: new Date('12:00'),
    patientName: '',
    name: '',
    duration: 10,
    email: '',
  });

  const handleInputChange = (value: any, name: any) => {
    setTreatment({ ...treatment, [name]: value });
    console.log(treatment);

  };

  const fetchFreeQueues = async (date:any,duration:any) => {
     await axios.get('http://localhost:3000/turns/free-queues', {
      params: {
        // Replace with the desired date
        date: date,
        duration:duration
       },     
    }
    )   
    .then((response=>{
      if(response.data.length==0){ 
        alert('No appointments available today\n Choose another day')      
      }   
     dispatch(setTurns(response.data));
    }));
    //handleClick(event);
  };

  const deleteTime = (turns:any,time:any) => {
    const newTurns: Treatment[] = turns.turns.filter((turn: any) => turn !== time);
    dispatch(setTurns(newTurns)) ;
  }

  const handleFetchFreeQueuesFromChild = (date:any) => {
    // Implement the logic you want to execute when the function is called from the child.
    fetchFreeQueues(date,treatment.duration);
  };

  useEffect(() => {
    // Make an Axios request to retrieve the turn types from MongoDB
    axios.get('http://localhost:3000/turns-type')
      .then((response) => {
        console.log(response.data)

        const allTurns = response.data;
        setTurnsType(allTurns);
        const typeOfTurns = allTurns.map((obj: any) => obj.typeOfTurn);
        setOptionsTreatment(typeOfTurns);
        console.log(optionsTreatment);

      })
      .catch((error) => {
        console.error('Error retrieving turn types:', error);
      });
  }, []);

  const  handleTreatmentChange = (event: any, value: any) => {
    let duration = 10;
  
    turnsType.forEach((turn: any) => {
      if (turn.typeOfTurn === value) {
        duration = turn.duration;

      }
    });
    setTreatment({ ...treatment, ['name']: value, ['duration']: duration });
    console.log(treatment.date+'dateeeeeeeee');
    
    fetchFreeQueues(treatment.date,duration);
    toggleChildVisibility(value);
    console.log(isChildVisible + 'hhhhh');

  }



  const handleClick = async (event: any) => {
    try {
      const duration = treatment.duration;
      const token = Cookies.get('token');
      const headers = {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      };
      treatment.time = event;
      treatment.email = user.email;
// setTurns()
      // בצע את בקשת POST
      await axios.post('http://localhost:3000/turns/addTreatment', treatment, { headers })
      .then(async(response) => {
        alert('Treatment added successfully!');
        // dispatch(setTurns(response.data));
        deleteTime(turns,treatment.time);
        await axios.get('http://localhost:3000/turns/free-queues', {
          params: {
            date: treatment.date,
            duration: treatment.duration,
          },
        })
        .catch((error) => {
          console.error('שגיאה בשליפת נתונים מעודכנים:', error);
        });
      })
    } 
    catch (error) {
      console.error('שגיאה בהוספת הטיפול:', error);
      alert('הוספת הטיפול נכשלה. אנא נסה שוב מאוחר יותר.');
    }
      // לאחר בצלחת בקשת POST, הפעל בקשת GET כדי לרענן את הנתונים
     
      
       
      // ... (הקוד הקיים שלך לאיפוס הטיפול והצגת ההודעה)
  };



  const renderfreeQueues = (duration:any) => {
    const buttons: any[] = [];
    if (turns && turns.turns.length) {
      turns.turns.forEach((hour:any, index:any) => {
        buttons.push(
          <button
            key={index}
            onClick={() => handleClick(hour)}
            style={{ margin: '5px', cursor: 'pointer',backgroundColor:'##001529' }}
          >
            duration: {duration}
            <br/>
            {hour}
          </button>
        );
      });
    }
    return buttons;
  };


  return <>
    {/* <CalendarOfTurns selectedValue={selectedValue} setSelectedValue={setSelectedValue} /> */}
    <form >

      <Grid container spacing={2} justifyContent="center"
        alignItems="center">

        <Grid xs={6} md={4}>
          <Autocomplete

            options={optionsTreatment}
            sx={{marginTop:5, width: 300 ,ml:'10%' ,color:'white',backgroundColor:'white'}}
            onChange={handleTreatmentChange}

            renderInput={(params) => (
              <TextField {...params} label="NameOfTURN" variant="outlined" />
            )}
          />
        </Grid>

      </Grid>

    </form>
    {isChildVisible &&

      (
        <div>
          <Table>
            <TableHead>
              <TableRow>

              </TableRow>
            </TableHead>
           <h2 color='white'> Choose a convenient time for you :)</h2>
            <TableBody>{renderfreeQueues(treatment.duration)}</TableBody>
          </Table>
          <CalendarOfTurns selectedValue={selectedValue} setSelectedValue={setSelectedValue} handleFetchFreeQueuesFromChild={handleFetchFreeQueuesFromChild} onSelect={onSelect}/>
        </div>
      )}
  </>

};