import * as React from 'react';
import axios from 'axios';
import api from '../../api';
import config from '../../config ';
import './turn.css';
import { useEffect, useState } from 'react';
import type { RootState } from '../../../Redux/store'
import { Table, Tag} from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../../Redux/userSlice'
import { Button } from 'react-bootstrap';
interface TurnsData {
  id:string; 
  name: string;
  time: string;
  date: string; 

}
export const TurnUser = () => {
  const [turnsData, setTurnsData] = useState<TurnsData[]>([]);
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
 dispatch(setUser());


 useEffect(() => {
  const getData = async () => {
      try {
          const data=await api.get(`${config.api}/turns/${user.email}`);
          const filterData = data.data.map((d: any) => {
            return {
              id:d._id,
              date: d.date,
              time: d.time,
              name:d.name,
            }
          })
        
          // console.log(filterData);
          setTurnsData(filterData|| []);
      } catch (error) {
          console.error('Error fetching turn data:', error);
      }
  };

  getData();
}, []);


const columns = [
 

  {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
  },
  {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',

    
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',

},
  {
    title: 'DeleteTurn',
    dataIndex: 'id',
    key: 'id',
    render: (id: any) => (
      <Button color="#001529" onClick={() => deleteItem(id)}>
          Cancel Turn
      </Button>

)},
];

  const deleteItem = (id:any) => {


    console.log(id);
    const level= user.email.toString() === config.admin.email? 'admin':'user';
    console.log(id);
    axios.delete('http://localhost:3000/turns/delete/'+id,{
    headers:{ 'authorization': `Bearer ${user.token}`
  },
  params:{
    roles:level
  
  }})
      .then((req:any)=>{
        const newTurnsData: TurnsData[] = turnsData.filter((turn: any) => turn.id !== id);

       setTurnsData(newTurnsData)
      }
      )
      .catch((error) => {
        console.log(error)
      }
      )
  }

  return (
    <>
    <h2> <div>
        {user.name ? (
          <p>Welcome, {user.name}!</p>
        ) : (
          <p>Token is invalid or missing.</p>
        )}
      </div></h2>
      <Table className='ant-table-thead' columns={columns } dataSource={turnsData} />
    </>
  );
}
