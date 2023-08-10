import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// alert창
import Swal from "sweetalert2";

import {CheckToken} from "../hook/UserApi"

interface Follow {
  myFollowerUsers: Followers[]; // 내 팔로워 리스트
  myFollowingUsers: Followers[]; // 내 팔로잉 리스트
  yourFollowerUsers: Followers[]; // 타인의 팔로워 리스트
  yourFollowingUsers: Followers[]; // 타인의 팔로잉 리스트

  perfectFollowUsers: PerfectFollow[]; // 맞팔 리스트
}

interface Followers {
  id: number;
  nickname: string;
  profileImg: string | null;
}

interface PerfectFollow {
  userIdA: number;
  userIdB: number;
  nicknameA: string | null;
  nicknameB: string | null;
  profileImgA: string | null;
  profileImgB: string | null;
}

interface BlackLists {
  id: number;
  nickname: string;
  profileImg: string | null;
  targetUserId: number;
}

// 초기화

const initialState:Follow = {
  myFollowerUsers: [], // 내 팔로워
  myFollowingUsers: [], // 내 팔로잉
  yourFollowerUsers: [], // 상대의 팔로워
  yourFollowingUsers: [], // 상대의 팔로잉

  perfectFollowUsers: [], // 맞팔 리스트
}

// axios
export const action_follow = {

  // 내 팔로잉 리스트
  getMyFollowingList: createAsyncThunk(
    `FollowSlice/getMyFollowingList`,
    async myId => {
      try {
        const token = await CheckToken();

        const response = await axios.get(
          `${process.env.REACT_APP_SERVER}/api/follow/list/my/followee/${myId}`,
          {
            headers: {
              Authorization: token
            }
          }
        );

        return response.data;
      } catch (e) {
        throw e;
      }
    }
  ),

  // 내 팔로워 리스트
  getMyFollowerList: createAsyncThunk(
    `FollowSlice/getMyFollowerList`,
    async myId => {
      try {
        const token = await CheckToken();

        const response = await axios.get(
          `${process.env.REACT_APP_SERVER}/api/follow/list/my/follower/${myId}`,
          {
            headers: {
              Authorization: token
            }
          }
        );

        return response.data;
      } catch (e) {
        throw e;
      }
    }
  ),

  // 타인의 팔로잉 리스트
  getYourFollowingList: createAsyncThunk(
    `FollowSlice/getYourFollowingList`,
    async yourId => {
      try {
        const token = await CheckToken();

        const response = await axios.get(
          `${process.env
            .REACT_APP_SERVER}/api/follow/list/your/followee/${yourId}`,
          {
            headers: {
              Authorization: token
            }
          }
        );

        return response.data;
      } catch (e) {
        throw e;
      }
    }
  ),

  // 타인의 팔로워 리스트
  getYourFollowerList: createAsyncThunk(
    `FollowSlice/getYourFollowerList`,
    async yourId => {
      try {
        const token = await CheckToken();

        const response = await axios.get(
          `${process.env
            .REACT_APP_SERVER}/api/follow/list/your/follower/${yourId}`,
          {
            headers: {
              Authorization: token
            }
          }
        );

        return response.data;
      } catch (e) {
        throw e;
      }
    }
  ),

  // 팔로우
  follow: createAsyncThunk(`FollowSlice/follow`, async followingData => {
    const token = await CheckToken();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/follow`,
        followingData,
        {
          headers: {
            Authorization: token
          }
        }
      );

      return followingData;
    } catch (e) {
      throw e;
    }
  }),

  // 언팔로우
  unfollow: createAsyncThunk(
    `FollowSlice/unfollow`,
    async deleteFollowingData => {
      try {
        const token = await CheckToken();

        const response = await axios.delete(
          `${process.env.REACT_APP_SERVER}/api/follow`,
          {
            data: deleteFollowingData,
            headers: {
              Authorization: token
            }
          }
        );

        return deleteFollowingData;
      } catch (e) {
        throw e;
      }
    }
  ),

    // 새로운 팔로우 등록 followerId:내가 팔로워 하려는 사람 followeeId:나
    // addFollow : createAsyncThunk("FeedSlice/addFollow", async({followerId, followeeId}, thunkAPI)=>{
    //     const token = await CheckToken();
    //     await axios.post(`${process.env.REACT_APP_SERVER}/api/follow`, {followerId, followeeId}, {
    //     headers: {
    //       "Authorization" : token
    //     }
        
    //   }).then((res)=>{
    //     return res.data;
    //   }).catch((e)=>{console.log(e)})
    // }),


    //팔로우 취소
    // deleteFollow : createAsyncThunk("FeedSlice/deleteFollow", async({followerId, followeeId}, thunkAPI)=>{
    //     const token = await CheckToken();
    //     await axios.delete(`${process.env.REACT_APP_SERVER}/api/follow`, {
    //     headers: {
    //       "Authorization" : token,
    //     },
    //     data:{followerId:followerId, followeeId:followeeId}
        
    //   }).then((res)=>{
    //     return res.data;
    //   }).catch((e)=>{console.log(e)})
    // }),


    

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

        builder.addCase(
          action_follow.getMyFollowingList.fulfilled,
          (state, action) => {
            state.myFollowingUsers = action.payload;
          }
        );
    
        builder.addCase(
          action_follow.getMyFollowerList.fulfilled,
          (state, action) => {
            state.myFollowerUsers = action.payload;
          }
        );
    
        builder.addCase(
          action_follow.getYourFollowingList.fulfilled,
          (state, action) => {
            state.yourFollowingUsers = action.payload;
          }
        );
    
        builder.addCase(
          action_follow.getYourFollowerList.fulfilled,
          (state, action) => {
            state.yourFollowerUsers = action.payload;
          }
        );

        builder.addCase(action_follow.follow.fulfilled, (state, action) => {
          const loginUser = JSON.parse(window.sessionStorage.getItem("loginUser"));
    
          if (action.payload.id === loginUser.id) {
            state.myFollowingUsers.push({
              id: action.payload.targetId,
              nickname: action.payload.nickname,
              profileImg: action.payload.profileImg
            });
    
            state.yourFollowerUsers.push({
              id: action.payload.id,
              nickname: loginUser.nickname,
              profileImg: loginUser.profileImg
            });
          } else if (action.payload.targetId === loginUser.id) {
            state.myFollowerUsers.push({
              id: action.payload.targetId,
              nickname: action.payload.nickname,
              profileImg: action.payload.profileImg
            });
    
            state.yourFollowingUsers.push({
              id: action.payload.id,
              nickname: loginUser.nickname,
              profileImg: loginUser.profileImg
            });
          }
        });
    
        builder.addCase(action_follow.unfollow.fulfilled, (state, action) => {
          for (let i = 0; i < state.myFollowingUsers.length; i++) {
            if (state.myFollowingUsers[i].id === action.payload.targetId) {
              state.myFollowingUsers.splice(i, 1);
    
              break;
            }
          }
    
          for (let i = 0; i < state.myFollowerUsers.length; i++) {
            if (state.myFollowerUsers[i].id === action.payload.id) {
              state.myFollowerUsers.splice(i, 1);
    
              break;
            }
          }
    
          for (let i = 0; i < state.yourFollowingUsers.length; i++) {
            if (state.yourFollowingUsers[i].id === action.payload.targetId) {
              state.yourFollowingUsers.splice(i, 1);
    
              break;
            }
          }
    
          for (let i = 0; i < state.yourFollowerUsers.length; i++) {
            if (state.yourFollowerUsers[i].id === action.payload.id) {
              state.yourFollowerUsers.splice(i, 1);
    
              break;
            }
          }
        });

    }
});

export let {} = FollowSlice.actions;
export default FollowSlice.reducer;