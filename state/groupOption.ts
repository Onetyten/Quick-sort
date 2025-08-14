import { createSlice } from "@reduxjs/toolkit";

const initialState={
    groupOptions:[
        {name:'File Type',value:'type'},
        {name:'Date',value:'date'},
        {name:'Size',value:'size'},
        {name:'None',value:'none'}
    ],
    optionIndex:0
}

const groupOptionSlice = createSlice({
    name:'groupOption',
    initialState,
    reducers:{
        setGroupIndex:(state,action)=>{
            state.optionIndex = action.payload
        }
    }
})

export const {setGroupIndex} = groupOptionSlice.actions
export default groupOptionSlice.reducer