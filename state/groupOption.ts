import { createSlice } from "@reduxjs/toolkit";

const initialState={
    groupOptions:[
        {name:'File Type',value:'type'},
        {name:'Date',value:'date'},
        {name:'Name',value:'name'},
        {name:'Size',value:'Size'}
    ],
    optionIndex:0
}

const groupOptionSlice = createSlice({
    name:'groupOption',
    initialState,
    reducers:{
        setGroupIndex:(state,actions)=>{
            state.optionIndex = actions.payload
        }
    }
})

export const {setGroupIndex} = groupOptionSlice.actions
export default groupOptionSlice.reducer