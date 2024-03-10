import axios from 'axios';
import api from '../../api';
import config from '../../config ';
import './turn.css';
import React, { useEffect, useState } from 'react';
import type { RootState } from '../../../Redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../../Redux/userSlice'
import { Button } from 'react-bootstrap';
import { Space, Table, message } from 'antd';
import { Login } from '../../Login/Login';
import { Alert } from '@mui/material';
interface TurnsData {
  id: string;
  name: string;
  time: string;
  date: string;
}

export const TurnUser = () => {
  const [turnsData, setTurnsData] = useState<TurnsData[]>([]);
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  dispatch(setUser());
  const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(e, 'I was closed.');
  };

  const validDateForDelete = (id:any,date: any) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate());    
    const partsA = date.split('/'); 
    const recordDate = new Date(parseInt(partsA[2]), parseInt(partsA[1]) - 1, parseInt(partsA[0]));
    if (new Date(recordDate) >= tomorrow) {
      deleteItem(id);
      message.success('You cancel your turn')
    }
    else {
    message.error('Its too late for canceling turn!!')
     
    }
  }
  const sortTurnsData = (data: TurnsData[]): TurnsData[] => {
    return data.slice().sort((a, b) => {
      // Split the date strings by '/' assuming the format is "dd/mm/yyyy"
      const partsA = a.date.split('/');
      const partsB = b.date.split('/');

      // Create Date objects from the parts in reversed order "yyyy-mm-dd"
      const dateA = new Date(parseInt(partsA[2]), parseInt(partsA[1]) - 1, parseInt(partsA[0]));
      const dateB = new Date(parseInt(partsB[2]), parseInt(partsB[1]) - 1, parseInt(partsB[0]));

      // Compare the Date objects
      if (dateA.getTime() !== dateB.getTime()) {
        return dateA.getTime() - dateB.getTime(); // Sort by date
      } else {
        // If dates are the same, sort by time
        const [hourA, minuteA] = a.time.split(':').map(Number); // Convert time string to numbers
        const [hourB, minuteB] = b.time.split(':').map(Number);
        if (hourA !== hourB) {
          return hourA - hourB; // Sort by hour
        } else {
          return minuteA - minuteB; // Sort by minute
        }
      }
    });
  }



  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get(`${config.api}/turns/${user.email}`);
        const filterData = data.data.map((d: any) => {
          return {
            id: d._id,
            date: d.date,
            time: d.time,
            name: d.name,
          }
        });

        const sortedData = sortTurnsData(filterData);

        setTurnsData(sortedData);
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
      render: (id: any, record: any) => (
        
        <Button style={{ backgroundColor: '#333' }}
                 
          onClick={() => validDateForDelete(id,record.date)}>
          Cancel Turn
        </Button>
      )
    },
  ];
  const deleteItem = (id: any) => {
    console.log(id);
    const level = user.email.toString() === config.admin.email ? 'admin' : 'user';
    console.log(id);
    axios.delete('http://localhost:3000/turns/delete/' + id, {
      headers: {
        'authorization': `Bearer ${user.token}`
      },
      params: {
        roles: level
      }
    })
      .then((req: any) => {
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
      <h2>
        <div className='turnsTableBg'>
          {user.name ? (
            <>
              <p style={{ margin: 0, color: '#333', fontSize: 50 }}>Your Turns {user.name}</p>
              {turnsData.length ? (

                <Table className='ant-table-thead' columns={columns} dataSource={turnsData} style={{ width: '70%', margin: 'auto' }} />
              ) : (<Alert severity="error" style={{ width: '50%', margin: 'auto', fontSize: 24 }} >You  Have no Turns yet</Alert>
              )}

            </>) : (
            <Login />
          )}
        </div>
      </h2>
    </>
  );
}
