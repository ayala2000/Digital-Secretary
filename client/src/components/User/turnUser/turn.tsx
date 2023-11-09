import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import api from '../../api';
import config from '../../config ';
import { Button } from 'react-bootstrap';
import './turn.css';
import { format } from 'date-fns';
import { useState } from 'react';
import type { RootState } from '../../../Redux/store'

import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../../Redux/userSlice'

interface Column {
  id: 'date' | 'time' |'name'| 'TurnType' | 'delete';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}


const columns: Column[] = [
  { id: 'date', label: 'date', minWidth: 170 },
  { id: 'time', label: 'time', minWidth: 170 },
  { id: 'name', label: 'name', minWidth: 170 },
  { id: 'delete', label: 'cancel', minWidth: 170 },
];
export const TurnUser = () => {
  const [view, setView] = useState(0);

  const [rows, setRow] = useState([]);
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

 console.log('user',user);
 dispatch(setUser());
 
 



  async function getData() {
 
    const { data } = await api.get(`${config.api}/turns/${user.email}`);
    console.log(data)

    const filterData = data.map((d: any) => {
      return {
        id:d._id,
        date: d.date,
        time: d.time,
        name:d.name,
        caregiver: null
      }
    })
    setRow(filterData)
    setView(1)
  }
      
  


  const deleteItem = (index: any) => {

    const deletedRow = rows[index];

    const id =deletedRow['id'];
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
        rows.splice(index, 1);
        console.log(req);
        // Update the state or re-render the table
        // For example, if you are using React with hooks:
        setRow([...rows]);
      }
      )
      .catch((error) => {
        console.log(error)
      }
      )
  }

 

 
  return (
    <>
    <h1> <div>
        {user.name ? (
          <p>Welcome, {user.name}!</p>
        ) : (
          <p>Token is invalid or missing.</p>
        )}
      </div></h1>
      <button className='buttonTurn' onClick={getData}>הצג את התורות שלי</button>
      {view == 1 && (
        <Paper sx={{maxWidth:700,border:3,borderRadius:0,margin:'auto'}}>
          <TableContainer sx={{ maxHeight: 600 ,maxWidth:700,margin:'50'}}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow key={"טבלת תורות"} sx={{borderColor:'red',border:6}}>
               

                  {/* {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ top: 57, minWidth: column.minWidth }}
                    >
                      {column.label}

                    </TableCell>
                  ))} */}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .map((row, index) => {
                    return (
                      <TableRow key={index} hover role="checkbox" tabIndex={-1} sx={{borderColor:'red',border:6, Padding: 20,marginTop:100}} >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell className='cell' key={column.id} align={column.align} sx={{borderColor:'black', Padding: 20,marginTop:100}} >
                              {column.format && typeof value === 'number'
                                ? column.format(value) 
                                // : column.id === 'date' // בדוק אם העמודה היא עמודת התאריך
                                // ? format(new Date(value), 'dd/MM/yyyy')
                                : value}
                              {column.id == 'delete' &&
                                  // <button  onClick={() => deleteItem(index)} >בטל תור<button/>
                                  <Button className="custom-button"  onClick={() => deleteItem(index)} color='blue'> בטל תור</Button>
                              }
                             
                            </TableCell>

                          );
                        })}
                      </TableRow>
                    );
                  })}

              </TableBody>
            </Table>
          </TableContainer>
          {/* <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
        </Paper>)
      }
    </>
  );
}
