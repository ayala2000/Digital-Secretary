import React from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/userSlice';
import { Event } from '@mui/icons-material';

const UserForm: React.FC = () => {
 
  const dispatch = useDispatch();
    
  const handleSaveUser = (event:any, name: string, email: string) => {
    event.preventDefault();

    dispatch(setUser({ name, email }));
  };

  return (
    <form>
      <input type="text" placeholder="Name" />
      <input type="email" placeholder="Email" />
      <button type='submit' onClick={() => handleSaveUser(Event,'John Doe', 'johndoe@example.com')}>
        Save User
      </button>
    </form>
  );
};

export default UserForm;
