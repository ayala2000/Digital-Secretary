//import { useState } from 'react'
import './App.css';
import { Login } from "../src/components/Login/Login";
import { Register } from './components/Register/Register'
import { Route, Routes } from 'react-router-dom';

function App() {
  return (<>
    <Routes>
      <Route path="/" element={<Login />} />
      {/* <Route index element={<Register />} /> */}
      <Route path="/register" element={<Register />} />
      <Route path="blogs" element={<App />} />
    </Routes>

  </>
    //  <Switch>
    //  <Route exact path="/" component={HomePage} />
    //   <Route path="/about" component={About} />
    // </Switch>
  );




}

export default App
