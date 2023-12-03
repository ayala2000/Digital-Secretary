import { createSlice, PayloadAction,  } from '@reduxjs/toolkit';



export interface TurnState {
turns:any;
}

const initialState: TurnState = {
  turns :[]
};

const turnSlice = createSlice({
  name: 'turns',
  initialState,
  reducers: {
    setTurns: (state, action: PayloadAction<any>) => {
            state.turns = action.payload;

    },
  },
});

export const { setTurns } = turnSlice.actions;
export default turnSlice.reducer;
