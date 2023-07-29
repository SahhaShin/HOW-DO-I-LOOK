import { createSlice} from "@reduxjs/toolkit";

// 초기화
//isFollow : 팔로우 여부
const initialState = {
    isFollow : false,
}


const FeedSlice = createSlice({
    name:'FeedSlice',
    initialState,
    reducers:{
        changeFollow(state, action){
            state.isFollow = action.payload;
        }
    }
});

export let {changeFollow} = FeedSlice.actions;
export default FeedSlice.reducer;