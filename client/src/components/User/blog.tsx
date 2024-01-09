import axios from "axios";
import { useState, useEffect } from "react";
import config from "../config ";
import { CommentOutlined, HomeOutlined, PhoneOutlined } from "@ant-design/icons";
import { Room } from "@mui/icons-material";
import './blog.css';
import { Flex } from "antd";
export const Blog = () => {
  const [webName, setWebName] = useState('');
  const [phoneNumber, setPoneNumber] = useState('');
  const [myText, setMyText] = useState('');
  const [adress, setAdress] = useState('');

  async function getData() {
    const getBuild: any = await axios.get(`${config.api}/build`)
      .then((respons) => {
        setWebName(respons.data.webName);
        setPoneNumber(respons.data.phone);
        setMyText(respons.data.myText);
        setAdress(respons.data.adress);
        console.log(respons.data, "khkhkhk");

      })
    console.log(getBuild);
  }
  getData();
  const [data, setData] = useState([]);

  async function getActiveTime() {
    try {
      const response = await axios.get('http://localhost:3000/activity-time');
      setData(response.data);
    } catch (error) {
      console.error('error activityTime', error);
    }
    return  data;
  }

  // Call the function inside a useEffect to avoid making unnecessary requests on each render
  useEffect(() => {
     getActiveTime();
  }, []);
  const sortedData = [...data].sort((a:any, b:any) => a.day - b.day);
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <>
      <p>
        <h1>{webName}</h1>
        <h2>{myText}</h2>
        <h3><PhoneOutlined /> { phoneNumber}
        <Room sx={{fontSize:'14px', marginLeft:3}} /> {adress}</h3>
        <h2>Opening Times:</h2>
        <div className="openHour">
       
        {sortedData.map((item:any) => (
          <div className="groupOpenHour">
            
         <div className="days">  {dayNames[item.day-1]}</div> 
           <div> {item.openingHours} - {item.closingHours} </div>
         
          </div>
          
        ))}

        </div>
      </p>
    </>
  );
};