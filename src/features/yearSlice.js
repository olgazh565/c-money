import {createSlice} from '@reduxjs/toolkit';

const yearSlice = createSlice({
  name: 'year',
  initialState: {
    year: {}
  },
  reducers: {
    setYear: (state, action) => {
      state.year = action.payload;
    },
    clearYear: (state) => {
      state.year = {};
    }
  },
});

export default yearSlice.reducer;
export const {setYear, clearYear} = yearSlice.actions;
