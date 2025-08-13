import { createSlice } from "@reduxjs/toolkit";

const initialState={
    folderUrl:""
}

const folderUrlSlice = createSlice({
    name: 'folderUrl',
    initialState,
    reducers:{
        setUrl:(state,actions)=>{
            state.folderUrl = actions.payload
        },
        clearUrl:(state)=>{
            state.folderUrl = ""
        }
    }
})

export const {setUrl,clearUrl} = folderUrlSlice.actions
export default folderUrlSlice.reducer