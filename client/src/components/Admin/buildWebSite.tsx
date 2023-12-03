import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import config from '../config ';

interface setting {
  webName: string;
  myText: string;
}



const BuildWebSite: React.FC = () => {
  // const [logo, setLogo] = useState('');
  const [id, setId] = useState({});

  // const [webName, setWebName] = useState('digital secretary');
  // const [myText, setMytext] = useState('digital secretary');
  const [setting,setSetting] = useState<setting>({
    webName: 'Digital secretary',
    myText: `Welcome  Digital secretary`,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSetting({ ...setting, [name]: value });
  };
  async function getData() {
    const getBuild: any = await axios.get(`${config.api}/build`)
      .then((respons) => {
        setId(respons.data._id);
        console.log(respons.data._id, "sjfklsdhlskdhgsl");

      })
    console.log(getBuild);
  }
  getData();

  const handleBuildSetting = (event:any) => {
    event.preventDefault();
    axios.put(`${config.api}/build/${id}`, setting).then(()=>{
      alert('you update your setting succesfully');}
    ) // שנה את ה-URL לכתובת הנכונה שבשרת
      .catch((error) => {
     console.error('Error adding turn:', error);
   });
};



  return (
    <div>
      <h2>setting</h2>
      <form>
        <label>webName:
          <input
            type="text"
            name="webName"
            value={setting.webName}
            onChange={handleInputChange}
          />
        </label>
        <br />
        
        <br />
        <label>open text:
          <input
            type="text"
            name="myText"
            value={setting.myText}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="button" onClick={handleBuildSetting}>save</button>
      </form>
    </div>
  );
};

export default BuildWebSite;
