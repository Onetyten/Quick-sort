import { createSlice } from "@reduxjs/toolkit";

interface LogType {
    name: string;
    log: string[];
    foldersCreated: number;
}

interface LogsState {
    history: LogType[];
}

const initialState: LogsState = {
    history: []
};

const HistorySlice = createSlice({
    name:'history',
    initialState,
    reducers:{
        addLog(state, action: { payload: LogType }) {
            state.history.push(action.payload);
        },
        clearLog(state){
            state.history = []
        }
    }
})

export const {addLog,clearLog} = HistorySlice.actions
export default HistorySlice.reducer