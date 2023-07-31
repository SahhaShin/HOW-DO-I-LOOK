import {createSlice} from "@reduxjs/toolkit";

interface Followers{
    id:number,
    nickname:string,
    profileImg:string|null,
}

// menuMode : 1(main), 2(feed), 3(내정보)
// followMode : 1(팔로워), 2(팔로잉), 3(블랙리스트)
// mypageMode : 1(나 자신), 2(타인)
interface Mypage{
    menuMode:number,
    mypageMode:number,
    followModalOpen : false,
    followUsers:Followers[],
    followMode:number,
}

// 초기화
const initialState:Mypage = {
    menuMode:2,
    mypageMode:1,
    followModalOpen : false,
    followUsers:[],
    followMode:1,
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
        }
        
    }
});

export let {changeFollowModalOpen,addFollowUsers,removeFollowUsers,changeFollowMode} = MypageSlice.actions;
export default MypageSlice.reducer;