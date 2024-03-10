import React, { useState, useEffect } from 'react';
import { Table, Tag, Form, DatePicker } from 'antd';
import axios from 'axios';
import config from '../config ';
import { format } from 'date-fns';
import './showTurn.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Redux/store';
import HomeAdmin from './Home';
import { setUser } from '../../Redux/userSlice';
import { Alert } from '@mui/material';
import { Email } from '@mui/icons-material';

interface TurnData {
    userName:String;
    name: string;
    email: string;
    date: string;
    typeOfTurn: string;
    time: string;
}

const TurnTable: React.FC = () => {
    const [turnsData, setTurnsData] = useState<TurnData[]>([]);
    const [chosenDate, setChosenDate] = useState<string>(format(new Date(), 'dd/MM/yyyy'));
    const user = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch();
    dispatch(setUser());
    const handleDateChange = (_datey: any, dateString: string) => {
        console.log('Formatted Date String: ', dateString); // אם תרצי להשתמש במחרוזת של התאריך
        setChosenDate(format(new Date(dateString), 'dd/MM/yyyy'));
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'userName',
            key: 'userName',
           
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
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
            title: 'Type of Turn',
            key: 'typeOfTurn',
            dataIndex: 'name',
            render: (text: string) => (
                <Tag color="#001529" key={text}>
                    {text}
                </Tag>
            ),
        },
    ];

    const sortTurnsData = (data: TurnData[]): TurnData[] => {
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
    const fetchUserName = async (email:any) => {
        try {
            
                const response = await axios.get(`${config.api}/users/email`, {
                    params: {
                        email,
                    },
                });
                const name = response.data;
                console.log(name.name,'response.data');
                return name.name;
            }
         catch (error) {
            console.error('Error fetching user data:', error);
        }
    }
    useEffect(() => {
        const fetchTurnsData = async () => {
            try {
                console.log(chosenDate, "chosenDate");
                const response = await axios.get<TurnData[]>(`${config.api}/turns/date`, {
                    params: {
                        date: chosenDate
                    }});
                    const sortedData = sortTurnsData(response.data);
                    const updatedTurnsData = await Promise.all(sortedData.map(async (turn) => {
                        const name = await fetchUserName(turn.email);
                        return { ...turn, userName: name };
                    }));
                    setTurnsData(updatedTurnsData || []);
                    console.log(updatedTurnsData[0]);
                    

                } 
                catch (error) {
                console.error('Error fetching turn data:', error);
            }
        };
        fetchTurnsData();

    }, [chosenDate]);
    
    return (
        <>
            {user.name ? (
                <div>
                    
                    <div className='titleShowTurn'>
                        <div>
                            <div className='borderBottom' style={{ borderBottom: '3px solid #facb01', textAlign: 'center', display: 'inline-block' }}>
                                <h1 style=
                                    {{
                                        fontSize: 50,
                                        color: 'rgb(33, 53, 71)',
                                        margin: 'auto',
                                        display: 'inline-block'
                                    }}>My Turns Diary</h1>
                            </div>
                            <div className='borderBottom'></div>
                        </div>
                        <Form.Item >
                            <DatePicker onChange={handleDateChange} style={{ width: 300, height: 50 }} />
                        </Form.Item>
                    </div>
                    {turnsData.length?(
                    <Table className='ant-table-thead' columns={columns} dataSource={turnsData} />
                    ):( <Alert severity="error" style={{width:'50%',margin:'auto',fontSize:24}} >You  Have no Turns yet</Alert>
                    )}
                </div>) :(<HomeAdmin />)}
        </>);};
export default TurnTable;
