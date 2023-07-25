import {createSlice} from "@reduxjs/toolkit";

// 초기화
const initialState = {
    createModalOpen : false,
    updateModalOpen : false,
    readModalOpen : false,
}


const closet = createSlice({
    name:'closet',
    initialState,
    reducers:{
        changeCreateModalOpen(state, action){
            state.createModalOpen = action.payload;
        },

        changeUpdateModalOpen(state, action){
            state.updateModalOpen = action.payload;
        },

        changeReadModalOpen(state, action){
            state.readModalOpen = action.payload;
        }
    }
});

export let {changeCreateModalOpen, changeUpdateModalOpen, changeReadModalOpen} = closet.actions;
export default closet;