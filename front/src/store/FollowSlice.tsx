import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// alert창
import Swal from "sweetalert2";

import {CheckToken} from "../hook/UserApi"

// axios
export const action = {

    // 새로운 팔로우 등록 followerId:내가 팔로워 하려는 사람 followeeId:나
    addFollow : createAsyncThunk("FeedSlice/addFollow", async({followerId, followeeId}, thunkAPI)=>{
        const token = await CheckToken();
        await axios.post(`${process.env.REACT_APP_SERVER}/api/follow`, {followerId, followeeId}, {
        headers: {
          "Authorization" : token
        }
        
      }).then((res)=>{
        return res.data;
      }).catch((e)=>{console.log(e)})
    }),


    //팔로우 취소
    deleteFollow : createAsyncThunk("FeedSlice/deleteFollow", async({followerId, followeeId}, thunkAPI)=>{
        const token = await CheckToken();
        await axios.delete(`${process.env.REACT_APP_SERVER}/api/follow`, {
        headers: {
          "Authorization" : token,
        },
        data:{followerId:followerId, followeeId:followeeId}
        
      }).then((res)=>{
        return res.data;
      }).catch((e)=>{console.log(e)})
    }),


    

}


// 초기화

const initialState:Feed = {
    
}


const FollowSlice = createSlice({
    name:'FollowSlice',
    initialState,
    reducers:{
        // changeFollow(state, action){
        //     state.isFollow = action.payload;
        // },
       
    },
    extraReducers:(builder) => {
        // builder.addCase(action.addFeed.fulfilled,(state,action)=>{
        //     state.createModalOpen=false;
        //     state.feedAddOk = true;
        // })

    }
});

export let {} = FollowSlice.actions;
export default FollowSlice.reducer;