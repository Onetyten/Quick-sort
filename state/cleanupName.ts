import { createSlice } from "@reduxjs/toolkit";

const initialState={
    cleanName:false
}

const cleanUpNameSlice = createSlice({
    name:'cleanName',
    initialState,
    reducers:{
        cleanTrue:(state)=>{
            state.cleanName = true
        },
        cleanFalse:(state)=>{
            state.cleanName = false
        },
        toggleClean:(state)=>{
            state.cleanName = !state.cleanName
        },
        
    }
})

export const {cleanFalse,cleanTrue,toggleClean} = cleanUpNameSlice.actions
export default cleanUpNameSlice.reducer