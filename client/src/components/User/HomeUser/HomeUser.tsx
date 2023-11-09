import * as React from 'react';
import { useSelector } from 'react-redux';
//import { RootState } from 'C:/Users/ayala/Documents/תיכנות/FinalProject/client/src/Redux/store';
 
export const Home = () =>{
    const user = useSelector((state: any) => state.user);

    return(<>
      <div>
        <h2>User Details</h2>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
      </div></>);
};
