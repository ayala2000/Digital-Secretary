import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Alert, Grid } from '@mui/material'
import Cookies from 'js-cookie'
import { CalendarOfTurns } from './calenderOfTurns'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store'
import { setUser } from '../../../Redux/userSlice'
import type { Dayjs } from 'dayjs'
import { Card, message } from 'antd'
import dayjs from 'dayjs'
import { TurnState, setTurns } from '../../../Redux/turnSlice'
import { ClockCircleOutlined } from '@ant-design/icons'
import { Login } from '../../Login/Login'
import Meta from 'antd/es/card/Meta'
import './addTurn.css'
import imgURL from '../../../assets/notebook-3297317_1920.jpg'
import config from '../../config '


interface Treatment {
  date: Date
  time: Date
  patientName: string
  name: string
  duration: number
  email: string
  reminderSent:boolean
}

export const AddTreatmentForm: React.FC = () => {
  const user = useSelector((state: RootState) => state.user)
  const turns = useSelector((state: TurnState) => state.turns)
  const dispatch = useDispatch()
  const getCurrentDate = (): Dayjs => {
    return dayjs().startOf('day')
  }
  const [turnsType, setTurnsType] = useState([])
  const [isChildVisible, setIsChildVisible] = useState(false)
  const [selectedValue, setSelectedValue] = useState<Dayjs>(getCurrentDate())
  const [optionsTreatment, setOptionsTreatment] = useState([]);
  const toggleChildVisibility = (value: any) => {
    {
      (value) ?
        setIsChildVisible(true)
        :
        setIsChildVisible(false)
    }
  }
  const isDateValid = (date: Dayjs) => {
    const currentDate = getCurrentDate()
    return date.isSame(currentDate) || date.isAfter(currentDate)
  }

  const onSelect = (newValue: Dayjs) => {
    if (isDateValid(newValue)) {
      setSelectedValue(newValue)
      setTreatment({ ...treatment, date: newValue.toDate() })
      handleFetchFreeQueuesFromChild(newValue)
    } else {
      message.error('This day is not active.');
    }
  }
  dispatch(setUser())
  const [treatment, setTreatment] = useState<Treatment>({
    date: new Date(Date.now()),
    time: new Date('12:00'),
    patientName: '',
    name: '',
    duration: 10,
    email: '',
    reminderSent:false,
  })

  const fetchFreeQueues = async (date: any, duration: any) => {
    await axios.get('http://localhost:3000/turns/free-queues', {
      params: {
        // Replace with the desired date
        date: date,
        duration: duration
      },
    })
      .then((response => {
        dispatch(setTurns(response.data))
      }))}
  const deleteTime = (turns: any, time: any) => {
    const newTurns: Treatment[] = turns.turns.filter((turn: any) => turn !== time)
    dispatch(setTurns(newTurns))
  }

  const handleFetchFreeQueuesFromChild = (date: any) => {
    fetchFreeQueues(date, treatment.duration)
  }

  useEffect(() => {
    axios.get('http://localhost:3000/turns-type')
      .then((response) => {
        const allTurns = response.data
        setTurnsType(allTurns)
        const typeOfTurns = allTurns.map((obj: any) => obj.typeOfTurn)
        setOptionsTreatment(typeOfTurns)
      })
      .catch((error) => {
        console.error('Error retrieving turn types:', error)
      })
  }, [])

  const handleTreatmentChange = (value: any) => {
    let duration = 10
    turnsType.forEach((turn: any) => {
      if (turn.typeOfTurn === value) {
        duration = turn.duration
      }
    })
    setTreatment({ ...treatment, ['name']: value, ['duration']: duration })
    fetchFreeQueues(treatment.date, duration)
    toggleChildVisibility(value)
  }
  const handleClick = async (event: any) => {
    try {
      const token = Cookies.get('token')
      const headers = {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }
      treatment.time = event
      treatment.email = user.email
      await axios.post(`${config.api}/turns/addTreatment`, treatment, { headers })
        .then(async (_response) => {
          message.success('Treatment added successfully!')
          
          deleteTime(turns, treatment.time)
          await axios.get(`${config.api}/turns/free-queues`, {
            params: {
              date: treatment.date,
              duration: treatment.duration,
            },
          })
            .catch((error) => {
              console.error('שגיאה בשליפת נתונים מעודכנים:', error)
            })
            
              try {
                await axios.post(`${config.api}/message/sucsses-invite`,{ params: {
                  'user': user,
                  body:{
                  'content':`hi ${user.name}\n
                  You have successfully booked a transplant appointment of ${treatment.name} 
                  the date: ${treatment.date.toLocaleDateString()} at: ${treatment.time}`,
                  'title':'Thanks for you choose to invite turn:)'
               } },});
              } catch (error) {
                throw new Error('Failed to schedule reminder emails');
              }
        },)
    }
    catch (error) {
      console.error('שגיאה בהוספת הטיפול:', error)
      message.error('Adding service faild')
    }
  }
  const renderfreeQueues = (_duration: any) => {
    const buttons: any[] = []
    if (turns && turns.turns.length) {
      turns.turns.forEach((hour: any, index: any) => {
        buttons.push(
          <button
            key={index}
            onClick={() => handleClick(hour)}
            style={{
              margin: '5px', cursor: 'pointer', backgroundColor: '#fff',
              color: '#001529',
              borderColor: ' #001529',
              fontSize: 20
            }}
          >
            <ClockCircleOutlined style={{ color: '#faad14 ' }} />{'  '}
            {hour}
          </button>
        )
      })
    }
    else{
      buttons.push(<Alert severity="error" style={{width:'50%',margin:'auto',fontSize:24}} >No appointments available today Choose another day</Alert>)
    }
    return buttons
  }
  function scrollToBottom(): void {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth' 
    });
}
  const renderTypeQueues = () => {
    const buttons: any[] = []
    if (turnsType && turnsType.length) {
      turnsType.forEach((turn: any) => {
        buttons.push(
          <div>
            <Card
              hoverable
              style={{
                width: 400, margin: 10,
              }}
              cover={<img src={imgURL} />}
              onClick={() =>{ handleTreatmentChange(turn.typeOfTurn) ,scrollToBottom()} }
            >
              <Meta style={{fontSize:20}} title={turn.typeOfTurn} description= {`Duration of service ${turn.duration} Minutes \n
              price: ${turn.price}$`} />
            </Card>
          </div>
        )
      })
    }
    return buttons
  }
  return (<>
      {user.token ? (
      <>
        <Grid container spacing={2} justifyContent=" space-evenly" marginTop={6} marginBottom={6}
          alignItems="center">
            {/* הצגת סוגי תורים */}
          {renderTypeQueues()}
        </Grid>
        {isChildVisible &&
          (<>
              <div >         
                <h2 style={{ textAlign: 'center' ,color:'#faad14'}}> Selected Date : {selectedValue.toDate().toLocaleDateString().toString()}</h2>
                <h2 style={{ textAlign: 'center' }}> Please, Select a Time </h2>
                {/* שליפת התורים  הפנויים */}
                <div style={{textAlign:'center'}}>{renderfreeQueues(treatment.duration)}</div>
              </div>
              {/* זריקת פונקציה ומשתנים כדי להעביר משתנים מאבא לבן ומהבן לאב בחזרה */}
              <div style={{textAlign:'center'}}>
                <CalendarOfTurns selectedValue={selectedValue} setSelectedValue={setSelectedValue} handleFetchFreeQueuesFromChild={handleFetchFreeQueuesFromChild} onSelect={onSelect} />
              </div>
            </>
          )}
          </>
          ) :(<Login />)
          }
 </>)
} 