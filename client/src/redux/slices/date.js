import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    date:null
};


const dateSlice = createSlice({
    name:"date",
    initialState,
    reducers:{
        setDate:(state,action)=>{
            console.log(action,'action date...........');
            
            state.date = action.payload

        },
        removeDate:(state)=>{
            state.date = null;
        }
    }
})
export const { setDate , removeDate} =dateSlice.actions;
export default dateSlice.reducer