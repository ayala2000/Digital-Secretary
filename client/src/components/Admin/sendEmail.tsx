import React, { useEffect } from 'react';
import config from '../config ';
import axios from 'axios';

const ReminderButton: React.FC = () => {
    const scheduleReminderEmails = async () => {
        try {
          const response = await axios.post(`${config.api}/message/`);
          return response.data;
        } catch (error) {
          throw new Error('Failed to schedule reminder emails');
        }
      };
      
      
  const handleScheduleReminders = async () => {
    try {
      await scheduleReminderEmails();
    } catch (error) {
      console.error('Error scheduling reminder emails:', error);
    }
  };
  useEffect(() => {
    handleScheduleReminders();
  }, []); 
  return null;
};

export default ReminderButton;
