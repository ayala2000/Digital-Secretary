import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';


interface UserState {
  name: string;
  email: string;
  token: string;
  isAuthenticated:boolean;
  
}


const initialState: UserState = {
  name: '',
  email: '',
  token: '',
  isAuthenticated: false
};



const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state) => {
     
  
        // כאן אתה יכול לקבל את הטוקן ממקור כלשהו (localStorage, cookies וכדומה)
        const tokenFromStorage = Cookies.get('token');
    
        if (tokenFromStorage) {
          try {
            // השתמש במפתח הפומבי לפענוח הטוקן
            // const publicKey = 'SECRET';
            const decodedToken: any = jwtDecode(tokenFromStorage);
            state.token = tokenFromStorage.toString();
            // הצגת השם המשתמש בפריט המציג בריאקט
            state.name=decodedToken.name;
            // if(decodedToken.email!== config.admin.email)
            state.email=decodedToken.email;
            state.isAuthenticated = true;
     
          } catch (error: any) {
            console.error('Token verification failed:', error.message);
          }
        };

     
    },
    
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
