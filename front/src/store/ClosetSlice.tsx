import { createSlice} from "@reduxjs/toolkit";

// 초기화
//mode는 c(1) r(2) u(3) 중 어떤 모드인지를 뜻한다.
const initialState = {
    modalOpen : false,
    mode : 0,
}


const ClosetSlice = createSlice({
    name:'ClosetSlice',
    initialState,
    reducers:{
        changeModalOpen(state, action){
            state.modalOpen = action.payload;
        },

        changeMode(state, action){
            state.mode = action.payload;
        }
    }
});

export let {changeModalOpen, changeMode} = ClosetSlice.actions;
export default ClosetSlice.reducer;