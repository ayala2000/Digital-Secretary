import { useState } from 'react'
import './App.css';
// import { Login } from "../src/components/Login/Login";
// import { Register } from './components/Register/Register';
// import { TurnUser } from './components/User/turnUser/turn';
// import { Navigate, Route, Routes } from 'react-router-dom';
// import { AddTreatmentForm } from './components/User/turnUser/addTurn';
// import { useSelector } from 'react-redux';
// import { Home } from './components/User/HomeUser/HomeUser';
// import { Admin } from './components/Admin/Aabnmd';
// import AddTurnForm from './components/Admin/AddTypeTurn';
// import { CalendarOfTurns } from './components/User/turnUser/calenderOfTurns';
// import AddScheduleForm from './components/Admin/Addtimes';
// import { Blog } from './components/User/blog';
// import { BuildWebSite } from './components/Admin/buildWebSite';
// import { RootState } from './Redux/store';
// import TurnTable from './components/Admin/showTurn';
// import { styled } from '@mui/material/styles';
// import logo from './assets/digital.png';
import MyRouter from './Routs';









function App() {
  return(
  <MyRouter/>)
//   const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
//   const LogoImage = styled('div')`
//   background-image: url(${logo});
//   background-position: center;
//   background-attachment: fixed;
//   background-position-y: -390px;
//   width: 100%;
//   height: 100%;
//   opacity: 0.5; /* שקיפות 50% - כאן ניתן לשנות לערך הרצוי */
// `;
  // return (
  //   <>

  //     {/* <UserForm/> */}

  //     <Routes>
  //       <Route path="/" element={<Login />} />
  //       <Route path="/TurnTable" element={<TurnTable />}/>

  //       {/* <Route index element={<Register />} /> */}
  //       <Route path="/register" element={<Register />} />
  //       <Route path="Blog" element={<Blog />} />
  //       <Route path="/Home" element={<Home />} />
  //       <Route path="/build" element={<BuildWebSite />} />
  //       <Route path="/addTurn" element={<AddTreatmentForm />} />

  //       <Route path="/Admin" element={<Admin />} />
  //       {!isAuthenticated ? (<Route path="/turns" element={<Login />}/>
        
  //           ):(  <>

  //             <Route path="/turns" element={<TurnUser />} />
  
  //             <Route path="/addTimes" element={<AddScheduleForm />} />
  //             <Route path="/CalendarOfTurns" element={<CalendarOfTurns selectedValue={undefined} setSelectedValue={function (value: any): void {
  //               throw new Error('Function not implemented.');
  //             }} handleFetchFreeQueuesFromChild={function (): void {
  //               throw new Error('Function not implemented.');
  //             }} onSelect={function (newValue: any): void {
  //               throw new Error('Function not implemented.');
  //             }}
  //             />} /> </>)}

  //       <Route path="/types" element={<AddTurnForm
  //       />} />



  //     </Routes>
  //     <LogoImage/>
  //   </>
  //   //  <Switch>
  //   //  <Route exact path="/" component={HomePage} />
  //   //   <Route path="/about" component={About} />
  //   // </Switch>
  // );




}

export default App
