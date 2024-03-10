import axios from 'axios';
import Cookies from 'js-cookie';
import config from './config ';
import { RootState } from '../Redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../Redux/userSlice';
const api = axios.create({
  baseURL: 'http://localhost:3000/', // Your base API URL
  headers: {
    Authorization: `Bearer ${Cookies.get('token')}`,
  },
});

const scheduleReminderEmails = async () => {
  const user = useSelector((state: RootState) => state.user)
const dispatch = useDispatch()
dispatch(setUser());
  try {
    const response = await axios.post(`${config.api}/message/sucsses-invite`,{ params: {
      'user': user
    },});
    return response.data;
  } catch (error) {
    throw new Error('Failed to schedule reminder emails');
  }
};

export default {api, scheduleReminderEmails};