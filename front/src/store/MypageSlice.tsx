import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

interface Followers{
    id:number,
    nickname:string,
    profileImg:string|null,
}

interface Mypage{
    menuMode:number,
    mypageMode:number,
    followModalOpen : boolean,
    followUsers:Followers[],
    followMode:number,
    manageType:number,
}

interface FollowerListInterface {
    loginUserId : number
}


// 초기화
// menuMode : 1(main), 2(feed), 3(내정보)
// followMode : 1(팔로워), 2(팔로잉), 3(블랙리스트)
// mypageMode : 1(나 자신), 2(타인)
// manageType : 1(비번 인증), 2(read), 3(update)
const initialState:Mypage = {
    menuMode:1,
    mypageMode:1,
    followModalOpen : false,
    followUsers:[], // 팔로워 / 팔로잉 / 블랙리스트 그릇
    followMode:2,
    manageType:1,
}

export const action = {
    // 내(내가 보고 있는 사람)가 팔로우한 사람들 리스트
    getFollowerList : createAsyncThunk(`MypageSlice/getFollowerList`, async(userId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/follow/list/follower/${userId}`);

            return response.data;
        } catch(e) {
            throw e;
        }
    }),


    // 나(내가 보고있는 사람)를 팔로우한 사람들 리스트
    getFolloweeList : createAsyncThunk(`MypageSlice/getFolloweeList`, async(userId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/follow/list/followee/${userId}`);

            return response.data;
        } catch(e) {
            throw e;
        }
    }),

    // 블랙리스트
    getBlackList : createAsyncThunk(`MypageSlice/getBlackList`, async(userId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/blacklist/list/${userId}`);

            return response.data;
        } catch(e) {
            throw e;
        }
    })
}


const MypageSlice = createSlice({
    name:'MypageSlice',
    initialState,
    reducers:{
        changeFollowModalOpen(state, action){
            state.followModalOpen=action.payload;
        },
        addFollowUsers(state, action){
            // 내가 아닌 다른 유저가 마이페이지에 들어왔을 때 follow 가능
            state.followUsers?.push(action.payload);
        },
        removeFollowUsers(state, action){
            //action.payload는 id:number
            //내가 내 마이페이지에 들어갔을 때 unfollow 가능
            let followNumber = state.followUsers?.length;

            if(followNumber!==null && followNumber>0){
                for(let i=0;i<followNumber;i++){
                    if(state.followUsers[i].id===action.payload){
                        state.followUsers.splice(action.payload,1);
                    }
                }
            }
        },
        changeFollowMode(state, action){
            state.followMode=action.payload
        }
        ,changeMypageMode(state, action){
            state.mypageMode=action.payload;
        },
        changeManageType(state, action){
            state.manageType=action.payload;
        },
        changeMenuMode(state, action){
            state.menuMode=action.payload;
        },
    },

    extraReducers: (builder) => {
        
        builder.addCase(action.getFollowerList.fulfilled, (state, action) => {
            state.followUsers = action.payload;
        })

        builder.addCase(action.getFolloweeList.fulfilled, (state, action) => {
            state.followUsers = action.payload;
        })

        builder.addCase(action.getBlackList.fulfilled, (state, action) => {
            state.followUsers = action.payload;
        })
    }
});

export let {changeFollowModalOpen,addFollowUsers,removeFollowUsers,changeFollowMode, changeMypageMode, changeManageType, changeMenuMode} = MypageSlice.actions;
export default MypageSlice.reducer;