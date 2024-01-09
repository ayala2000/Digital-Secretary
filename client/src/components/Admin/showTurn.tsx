import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, Form, DatePicker } from 'antd';
import axios from 'axios';
import config from '../config ';
import { format } from 'date-fns';

import './showTurn.css';




interface TurnData {

    name: string;
    email: string;
    date: string;
    typeOfTurn: string;
    time: string;
}

const TurnTable: React.FC = () => {
    const [turnsData, setTurnsData] = useState<TurnData[]>([]);
    const [userNames, setUserNames] = useState<{ [key: string]: string }>({});
    const [chosenDate, setChosenDate] = useState<string>(format(new Date(Date.now()), 'dd/MM/yyyy'));


    const handleDateChange = (datey: any, dateString: string) => {

        console.log('Formatted Date String: ', dateString); // אם תרצי להשתמש במחרוזת של התאריך

        setChosenDate(format(new Date(dateString), 'dd/MM/yyyy'));
    };



    useEffect(() => {
        const fetchTurnsData = async () => {
            try {
                console.log(chosenDate, "chosenDate");
                const response = await axios.get<TurnData[]>(`${config.api}/turns/date`, {
                    params: {
                        date: chosenDate
                    }
                });
                console.log(response.data);
                setTurnsData(response.data || []);
            } catch (error) {
                console.error('Error fetching turn data:', error);
            }
        };

        fetchTurnsData();
    }, [chosenDate]);



    useEffect(() => {
        const fetchUserNames = async () => {
            const uniqueEmails = Array.from(new Set(turnsData.map(turn => turn.email)));

            try {
                for (const email of uniqueEmails) {
                    const response = await axios.get(`${config.api}/users/email`, {
                        params: {
                            email,
                        },
                    });
                    console.log(response.data, 'kkkkk');

                    const userData = response.data;
                    setUserNames(prevState => ({ ...prevState, [email]: userData?.name || '' }));
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (turnsData.length > 0) {
            fetchUserNames();
        }
    }, [turnsData]);




    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: TurnData) => (
                <span>{userNames[record.email]}</span>
            ),
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

    return (

        <div>

            <div>
                <div style={{ borderBottom: '3px solid #facb01', textAlign: 'center', display: 'inline-block' }}>
                    <h1 style={{ fontSize: 50, color: 'rgb(33, 53, 71)', margin: 'auto', display: 'inline-block' }}>My Turns Diary</h1>
                </div>
            </div>
            <h2>Choose A Date</h2>
            <Form.Item >
                <DatePicker onChange={handleDateChange} style={{ width: 300, height: 50 }} />
            </Form.Item>

            <h2>The Turn Of The Choosen Date</h2>
            <Table className='ant-table-thead' columns={columns } dataSource={turnsData} />


        </div>

    );
};

export default TurnTable;
