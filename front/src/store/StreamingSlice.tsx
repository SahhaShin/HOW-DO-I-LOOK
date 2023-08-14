//유저와 페이지 정보 저장

import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import {CheckToken} from "../hook/UserApi"

// axios
export const action_live = {

  // 방 상세 정보
  getInfo : createAsyncThunk("FeedSlice/getInfo", async(roomId, thunkAPI)=>{
    try{
        const token = await CheckToken();
        const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/room/detail/${roomId}`,{
            headers:{"Authorization":token}
        });

        console.log(response.data);
        return response.data;
    } catch(e){
        console.log(e);
        throw e;
    }
  }),

  //참여자 목록
  peopleList : createAsyncThunk("FeedSlice/peopleList", async({userId, roomId}, thunkAPI)=>{
    try{
        const token = await CheckToken();
        const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/roomuser/list?userId=${userId}&roomId=${roomId}`,{
            headers:{"Authorization":token}
        });

        console.log(response.data);
        return response.data;
    } catch(e){
        console.log(e);
        throw e;
    }
  }),
  
}


//새로운 정보 가공 이미지와 채팅 모두 필요하기 때문
interface anyChatList{
  nickname:string,
  chatContent : string|null,
  image:[
      {
          type:string|null, //CLOTHES OR FEED
          photoLink:string|null
      }
  ]
}

interface roomInfo{
  "title": string,
  "hostAge": number,
  "hostGender": string,
  "roomMinAge": number,
  "roomMaxAge": number,
  "roomGender": string,
}

// 초기화
//loginYN : 로그인 여부에 따라 헤더가 로그인 혹은 내옷장 마이페이지 버튼이 뜬다.
const initialState = {
  publisher: "",
  anyChatList:[],
  roomInfo:null,
  pickList:[],
  sendImg:false,
  roomPeopleList:[],
  menuModalOpen:false,
  selectAdvisor:null,
  otherClosetOpen:false,
  scoreModalOpen:false,
};

const StreamingSlice = createSlice({
  name: "StreamingSlice",
  initialState,
  reducers: {
    changepublisher(state, action) {
      state.publisher = action.payload;
    },
    pushAnyChatList(state,action){
      state.anyChatList.push(action.payload);
    },
    addPickList(state, action){
      state.pickList.push(action.payload);
    },
    rearrangePickList(state, action){
      state.pickList=action.payload;
    },
    sendPickListChat(state, action){
      state.sendImg=action.payload;
    },
    changeMenuModalOpen(state, action){
      state.menuModalOpen = action.payload;
    },
    changeSelectAdvisor(state, action){
      state.selectAdvisor=action.payload;
    },
    changeOtherClosetOpen(state, action){
      state.selectAdvisor=action.payload;
    },
    changeScoreModalOpen(state, action){
      state.scoreModalOpen=action.payload;
    }
  },

  extraReducers:(builder) => {
    builder.addCase(action_live.getInfo.fulfilled,(state,action)=>{
      state.roomInfo = action.payload; //내가 누른 좋아요 정보
    })

    builder.addCase(action_live.peopleList.fulfilled,(state,action)=>{
      state.roomPeopleList = action.payload; //방 참가자들
      
    })
  }
  
});

export let {changeScoreModalOpen,changeOtherClosetOpen,changeSelectAdvisor,changeMenuModalOpen, sendPickListChat,addPickList,rearrangePickList, changepublisher, pushAnyChatList } = StreamingSlice.actions;
export default StreamingSlice.reducer;
