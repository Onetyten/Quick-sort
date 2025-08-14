import { createSlice } from "@reduxjs/toolkit";

const initialState={
    loading:false
}

const SortingStateSlice = createSlice({
    name:'loading',
    initialState,
    reducers:{
        setSorting:(state)=>{
            state.loading = true
        },
        setNotSorting:(state)=>{
            state.loading = false
        },
    }
})
export const {setSorting,setNotSorting} = SortingStateSlice.actions
export default SortingStateSlice.reducer