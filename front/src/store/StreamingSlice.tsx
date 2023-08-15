//유저와 페이지 정보 저장

import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import {CheckToken} from "../hook/UserApi"

// alert창
import Swal from "sweetalert2";


// axios
export const action_live = {

  // 방 상세 정보
  getInfo : createAsyncThunk("FeedSlice/getInfo", async(roomId, thunkAPI)=>{
    try{
        const token = await CheckToken();
        const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/room/detail/${roomId}`,{
            headers:{"Authorization":token}
        });
        return response.data;
    } catch(e){
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
        return response.data;
    } catch(e){
        throw e;
    }
  }),

  // 점수주기 (슬래시를 붙여야 한다.)
  giveScore : createAsyncThunk("FeedSlice/giveScore", async({targetUserId, roomId, type, score}, thunkAPI)=>{
    try{
        const token = await CheckToken();
        const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/userlike/`,{targetUserId, roomId, type, score},{
            headers:{"Authorization":token}
        });
        return response.data;
    } catch(e){
        throw e;
    }
  }),


  //참여자 강퇴/삭제라고 볼 수 있겠다. -> 소켓 백에서 자동으로 해줘서 이거 안씀
  kickUser : createAsyncThunk("FeedSlice/kickUser", async({userId, roomId}, thunkAPI)=>{
    try{
        const token = await CheckToken();
        const response = await axios.delete(`${process.env.REACT_APP_SERVER}/api/roomuser/kick?userId=${userId}&roomId=${roomId}`,{
            headers:{"Authorization":token}
        });

        console.log(response.data);
        return userId;
    } catch(e){
        console.log(e);
        throw e;
    }
  }),

  // 라이브 종료
  liveEnd : createAsyncThunk("FeedSlice/liveEnd", async({userId, roomId}, thunkAPI)=>{
    try{
        const token = await CheckToken();
        const response = await axios.delete(`${process.env.REACT_APP_SERVER}/api/roomuser/kick?userId=${userId}&roomId=${roomId}`,{
            headers:{"Authorization":token}
        });

        console.log(response.data);
        return userId;
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
  selectAdvisor:null, //id, nickname, profileImg
  otherClosetOpen:false,
  scoreModalOpen:false,
  pickBadge:null,
  
  kickUser:null, //방장이 강퇴하고 싶은 유저, userId/ roomId
  areYouKick:false,//소켓으로 킥당한 유저
  
  liveEndByHost : false,//호스트가 라이브 종료
  liveEndRoomNo : null, //호스트가 라이브 종료하는 방 번호
  liveEndAlert:false, //방이 폭파되고 리스트 창에서 알리는 alert 유무

  exitLiveByUser : false,//방장이 아닌 유저가 방 나가는 여부
  exitRoomNo : null, //방장이 아닌 유저가 나가는 방 번호
  exitAlam : false,
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
      state.otherClosetOpen=true;
    },
    changeScoreModalOpen(state, action){
      state.scoreModalOpen=action.payload;
    },
    changepPickBadge(state,action){
      state.pickBadge=action.payload
      console.log(action.payload);
    },
    setKickUser(state,action){
      state.kickUser=action.payload; //userId, roomId
    },
    changeAreYouKick(state, action){
      state.areYouKick=action.payload;
    },
    changeLiveEndByHost(state,action){
      state.liveEndByHost=action.payload;
    },
    changeLiveEndRoomNo(state, action){
      state.liveEndRoomNo=action.payload;
    },
    changeLiveEndAlert(state, action){
      state.liveEndAlert=action.payload;
    },
    changeExitLiveByUser(state, action){
      state.exitLiveByUser=action.payload;
    },
    changeExitRoomNo(state, action){
      state.exitRoomNo=action.payload;
    },
    changeExitAlam(state, action){
      state.exitAlam=action.payload;
    }
  },

  extraReducers:(builder) => {
    builder.addCase(action_live.getInfo.fulfilled,(state,action)=>{
      state.roomInfo = action.payload; //내가 누른 좋아요 정보
    })

    builder.addCase(action_live.peopleList.fulfilled,(state,action)=>{
      console.log(action.payload);
      state.roomPeopleList = action.payload; //방 참가자들
      
    })

    builder.addCase(action_live.giveScore.fulfilled,(state,action)=>{
      Swal.fire({
        icon: 'success',
        title: '마스터 점수 주기 성공!',
        text: '마스터 점수가 제공되었습니다 :)',
        confirmButtonColor: '#4570F5',
      })
      
    })

    builder.addCase(action_live.giveScore.rejected,(state,action)=>{
      Swal.fire({
        icon: 'info',
        title: '마스터 점수를 이미 주셨어요!',
        text: '마스터 점수는 1번만 주실 수 있습니다 :)',
        confirmButtonColor: '#4570F5',
      })
      
    })

    builder.addCase(action_live.kickUser.fulfilled,(state,action)=>{
      // Swal.fire({
      //   icon: 'info',
      //   title: '',
      //   text: '강퇴되었습니다.',
      //   confirmButtonColor: '#4570F5',
      // })
      console.log(action.payload);
      
      for(let i=0;i<state.roomPeopleList.length;i++){
        if(state.roomPeopleList?.userId === action.payload){
          state.roomPeopleList.splice(i,1);
          return;
        }
      }

      console.log(state.roomPeopleList);
      
    })

    builder.addCase(action_live.liveEnd.fulfilled,(state,action)=>{
      Swal.fire({
        icon: 'info',
        title: '라이브 종료',
        text: '라이브가 종료되었습니다 :)',
        confirmButtonColor: '#4570F5',
      })
      
    })
  }
  
});

export let {changeExitAlam,changeExitRoomNo,changeExitLiveByUser,changeLiveEndAlert,changeLiveEndRoomNo,changeLiveEndByHost,changeAreYouKick,setKickUser,changepPickBadge,changeScoreModalOpen,changeOtherClosetOpen,changeSelectAdvisor,changeMenuModalOpen, sendPickListChat,addPickList,rearrangePickList, changepublisher, pushAnyChatList } = StreamingSlice.actions;
export default StreamingSlice.reducer;
