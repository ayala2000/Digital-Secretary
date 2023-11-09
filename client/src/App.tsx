//import { useState } from 'react'
import './App.css';
import { Login } from "../src/components/Login/Login";
import { Register } from './components/Register/Register';
import { TurnUser } from './components/User/turnUser/turn';
import { Route, Routes } from 'react-router-dom';
import { AddTreatmentForm } from './components/User/turnUser/addTurn';
// import Navbar from './components/Ruoter/navlin';

// import { Switch } from '@mui/material';
import {Home} from './components/User/HomeUser/HomeUser';
// import ResponsiveAppBar from './components/Ruoter/navlin';
import RecipeReviewCard from './components/User/blog';
import { Admin } from './components/Admin/Aabnmd';
import AddTurnForm from './components/Admin/AddTypeTurn';
import { CalendarOfTurns } from './components/User/turnUser/calenderOfTurns';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
//import UserForm from './components/UserForm';
// <link
//   rel="stylesheet"
//   href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
//   integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
//   crossOrigin="anonymous"
// />

function App() {
  const getCurrentDate = () => dayjs();
  const [selectedValue, setSelectedValue] = useState<Dayjs>(getCurrentDate()); 
  return (
  <>
  {/* <UserForm/> */}
    <Routes>
      <Route path="/" element={<Login />} />
      {/* <Route index element={<Register />} /> */}
      
      <Route path="/register" element={<Register />}/>
      <Route path="/turns" element={<TurnUser />}/>
      <Route path="Blog" element={<RecipeReviewCard />} />
      <Route path="/addTurn" element={<AddTreatmentForm selectedValue={selectedValue} setSelectedValue={setSelectedValue} />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Admin" element={<Admin />} />
      <Route path="/CalendarOfTurns" element={<CalendarOfTurns selectedValue={selectedValue} setSelectedValue={setSelectedValue}  
          
        />} />

      <Route path="/types" element={<AddTurnForm 
        />} />


    </Routes>

  </>
    //  <Switch>
    //  <Route exact path="/" component={HomePage} />
    //   <Route path="/about" component={About} />
    // </Switch>
  );




}

export default App
