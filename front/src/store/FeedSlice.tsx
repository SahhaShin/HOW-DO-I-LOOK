import { createSlice} from "@reduxjs/toolkit";

// 초기화
//isFollow : 팔로우 여부
//sortType : 1 all 2 following
const initialState = {
    isFollow : false,
    modalOpen : false,
    sortType:1,
}


const FeedSlice = createSlice({
    name:'FeedSlice',
    initialState,
    reducers:{
        changeFollow(state, action){
            state.isFollow = action.payload;
        },
        changeModalOpen(state, action){
            state.modalOpen = action.payload;
        },
        changeSortType(state, action){
            state.sortType = action.payload;
        },

    }
});

export let {changeFollow, changeModalOpen, changeSortType} = FeedSlice.actions;
export default FeedSlice.reducer;