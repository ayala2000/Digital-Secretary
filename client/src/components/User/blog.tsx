import axios from "axios";
import { useState, useEffect } from "react";

export const Blog = () => {
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
        <h2>Opening Times:</h2>
        {sortedData.map((item:any) => (
          <div >
            
            {dayNames[item.day-1]}: {item.openingHours} - {item.closingHours}
          </div>
        ))}
      </p>
    </>
  );
};