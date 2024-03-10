import React from "react";
import { TurnUser } from './components/User/turnUser/turn';
import { Route, Routes } from 'react-router-dom';
import { AddTreatmentForm } from './components/User/turnUser/addTurn';
import Home  from './components/User/Home/Home';
import AddTurnForm from './components/Admin/AddTypeTurn';
import { CalendarOfTurns } from './components/User/turnUser/calenderOfTurns';
import AddScheduleForm from './components/Admin/Addtimes';
import { Blog } from './components/User/blog';
import { BuildWebSite } from './components/Admin/buildWebSite';
import TurnTable from './components/Admin/showTurn';
import HomeAdmin from "./components/Admin/Home";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import Footer from "./components/Ruoter/footer";

 const MyRouter:React.FC = ()=>
 {    
    return ( <>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/TurnTable" element={<TurnTable />}/>
            <Route path="/homeAdmin" element={<HomeAdmin />} />
            <Route path="/footer" element={<Footer />} />
            <Route path="/Blog" element={<Blog />} />
            <Route path="/types" element={<AddTurnForm/>} />
            <Route path="/Home" element={<Home />} />
            <Route path="/build" element={<BuildWebSite />} />
            <Route path="/addTurn" element={<AddTreatmentForm />} />        
            <Route path="/turns" element={<TurnUser />} />
            <Route path="/addTimes" element={<AddScheduleForm />} />
            <Route path="/CalendarOfTurns" element={<CalendarOfTurns selectedValue={undefined} setSelectedValue={function (_value: any): void {
                    throw new Error('Function not implemented.');
                }} handleFetchFreeQueuesFromChild={function (): void {
                    throw new Error('Function not implemented.');
                }} onSelect={function (_newValue: any): void {
                    throw new Error('Function not implemented.');
                }}
                />} /> 
      </Routes>
    </>);
    }
  export default MyRouter;