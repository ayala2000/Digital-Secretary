import axios from "axios";
import { useState, useEffect } from "react";
import config from "../config ";
import { EmailOutlined, PhoneAndroid, Room } from "@mui/icons-material";
import './blog.css';

export const Blog = () => {
  const [webName, setWebName] = useState('');
  const [phoneNumber, setPoneNumber] = useState('');
  const [myText, setMyText] = useState('');
  const [adress, setAdress] = useState('');
  const [data, setData] = useState([]);
  const sortedData = [...data].sort((a: any, b: any) => a.day - b.day);
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  
    useEffect(() => {
      async function getData() {
    const getBuild: any = await axios.get(`${config.api}/build`)
      .then((respons) => {
        setWebName(respons.data.webName);
        setPoneNumber(respons.data.phone);
        setMyText(respons.data.myText);
        setAdress(respons.data.adress);
      })
    console.log(getBuild);
  }
  getData();},[])

  
  async function getActiveTime() {
    try {
      const response = await axios.get('http://localhost:3000/activity-time');
      setData(response.data);
    } catch (error) {
      console.error('error activityTime', error);
    }
    return data;
  }

  // Call the function inside a useEffect to avoid making unnecessary requests on each render
  useEffect(() => {
    getActiveTime();
  }, []);
 
  return (
    <>
      <div className="flexBlog">
        <div className="flex1">
        <h2>Opening Times:</h2>
        <div className="openHour">
          {sortedData.map((item: any) => (
            <div className="groupOpenHour">
              <div className="days">  {dayNames[item.day - 1] + ':'}
              </div>
              <div className="hour"> {item.openingHours} - {item.closingHours} </div>
            </div>
          ))}
        </div>
        </div>
        <div className="flex2">
          <h1 style={{fontSize:'5.5 em',marginBottom:10}}>{webName}</h1>
          <h2><PhoneAndroid style={{color:'faad14'}} /> {phoneNumber}
            <Room sx={{ fontSize: '5.5 em', marginLeft: 3}} style={{color:'faad14'}}/> {adress}</h2>
          <p style={{marginTop:20, lineHeight:2,fontSize:18}}>{myText}</p>
        </div>
      </div>
    </>
  );
};