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
import { format } from 'date-fns';


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
  selectedValue: any; // SomeType הוא הסוג של selectedValue
  setSelectedValue: (value: any) => void; // SomeType הוא הסוג של הערך שנשמר ב-selectedValue

}
// *** component function ***
export const AddTreatmentForm: React.FC<AddTreatmentFormProps> = ({ selectedValue, setSelectedValue }) => {
  const [isChildVisible, setIsChildVisible] = useState(false);
  const toggleChildVisibility = (value: any) => {
    {
      (value) ?
      setIsChildVisible(true)
      :
      setIsChildVisible(false)
    }
  };

  useEffect(() => {
    if (selectedValue) {
      setTreatment({ ...treatment, date: selectedValue.toDate() });
    }
  }, [selectedValue]);
  console.log(selectedValue, 'selectedValue');
  const [optionsTreatment, setOptionsTreatment] = useState([]);
  const [turns, setTurns] = useState([]);
  const navigate = useNavigate();
  const [freeQueues, setFreeQueues] = useState([]);
  //** use readux */
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
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

  const fetchFreeQueues = async () => {

    console.log('hiiiiiii');
    // event.preventDefault();
    console.log(treatment);
    const response = await axios.get('http://localhost:3000/turns/free-queues', {
      params: {
        // Replace with the desired date
        date: treatment.date,
        duration: treatment.duration

      },
    })//.then(data => console.log("data", data));
    console.log(response.data + "kol");

    setFreeQueues(response.data);
    //handleClick(event);
  };


  const handleFetchFreeQueuesFromChild = () => {
    // Implement the logic you want to execute when the function is called from the child.
    fetchFreeQueues();
  };

  useEffect(() => {

    // Make an Axios request to retrieve the turn types from MongoDB
    axios.get('http://localhost:3000/turns-type')
      .then((response) => {
        console.log(response.data)

        const allTurns = response.data;
        setTurns(allTurns);

        const typeOfTurns = allTurns.map((obj: any) => obj.typeOfTurn);
        setOptionsTreatment(typeOfTurns);
        console.log(optionsTreatment);

      })
      .catch((error) => {
        console.error('Error retrieving turn types:', error);
      });
  }, []);

  const  handleTreatmentChange = (event: any, value: any) => {
    let duration = 0;
    turns.forEach((turn: any) => {
      if (turn.typeOfTurn === value) {
        duration = turn.duration;

      }
    });
    setTreatment({ ...treatment, ['name']: value, ['duration']: duration });
    toggleChildVisibility(value);
    console.log(isChildVisible + 'hhhhh');

  }



  const handleClick = async (event: any) => {
    try {


      // event.preventDefault();

      const duration = treatment.duration;


      const token = Cookies.get('token');
      const headers = {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      };
      treatment.time = event;
      treatment.email = user.email;

      // בצע את בקשת POST
      await axios.post('http://localhost:3000/turns/addTreatment', treatment, { headers });
      console.log('add treat');

      // לאחר בצלחת בקשת POST, הפעל בקשת GET כדי לרענן את הנתונים
      await axios.get('http://localhost:3000/turns/free-queues', {
        params: {
          date: treatment.date,
          duration: treatment.duration,
        },
      })
        .then((response) => {
          

          alert('Treatment added successfully!');
          setFreeQueues(response.data);
        })
        .catch((error) => {
          console.error('שגיאה בשליפת נתונים מעודכנים:', error);
        });

      // ... (הקוד הקיים שלך לאיפוס הטיפול והצגת ההודעה)
    } catch (error) {
      console.error('שגיאה בהוספת הטיפול:', error);
      alert('הוספת הטיפול נכשלה. אנא נסה שוב מאוחר יותר.');
    }
  };



  const renderfreeQueues = () => {
    const rows = [];
    const rowCount = Math.ceil(freeQueues.length / 5); // Display 3 freeQueues per row

    for (let i = 0; i < rowCount; i++) {
      const startIdx = i * 5;
      const endIdx = startIdx + 5;
      const freeQueuesSlice = freeQueues.slice(startIdx, endIdx);

      rows.push(
        <TableRow key={i}>
          {freeQueuesSlice.map((hour, index) => (
            <TableCell
              key={index}
              onClick={() => handleClick(hour)}

              style={{ cursor: 'pointer' }}
            >
              {hour}
            </TableCell>
          ))}
        </TableRow>
      );
    }

    return rows;
  };


  return <>
    {/* <CalendarOfTurns selectedValue={selectedValue} setSelectedValue={setSelectedValue} /> */}
    <form >

      <Grid container spacing={2} justifyContent="center"
        alignItems="center">

        <Grid xs={6} md={4}>
          <Autocomplete

            options={optionsTreatment}
            sx={{ width: 300 }}
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
            <TableBody>{renderfreeQueues()}</TableBody>
          </Table>
          <CalendarOfTurns selectedValue={selectedValue} setSelectedValue={setSelectedValue} handleFetchFreeQueuesFromChild={handleFetchFreeQueuesFromChild} />
        </div>
      )}
  </>

};