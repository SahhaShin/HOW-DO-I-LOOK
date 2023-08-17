import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// alert창
import Swal from "sweetalert2";

import {CheckToken} from "../hook/UserApi"

// axios
export const action = {

    //채팅 리스트 불러오기 O
    getChatList : createAsyncThunk("ChatSlice/getChatList", async({userId, page}, thunkAPI)=>{
        try{
            const token = await CheckToken();
            const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/soloChatRoom/${userId}?page=${page}`,{
                headers: {
                  "Authorization" : token
                }
                
              });
            return response.data;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }), 

    // 방입장 O (없으면 새로 만들고 ,있으면 채팅 기록을 가져온다.)
    //파라미터 명은 dispatch 보내는 이름과 똑같아야 한다.
    enterChatRoom : createAsyncThunk("ChatSlice/enterChatRoom", async({myId, otherId}:chatRoomParticipant, thunkAPI)=>{
        try{
            const token = await CheckToken();
            const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/soloChatRoom`,{userA:myId, userB:otherId},{
                headers: {
                  "Authorization" : token
                }
                
              }
            );

            return response.data;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }), 

}


//채팅방 리스트 객체 타입
// userAProfileImg, userBProfileImg, userAGender, userBGender
interface getChatRoomList{
    id: number,
    userAId: number,
    userBId: number,
    chatroomCode: string,
    userAProfileImg : string|null,
    userBProfileImg : string|null,
    userAGender : string|null,
    userBGender : string|null
}

//방에 들어가면 그 방에 있던 채팅 정보와 상대방 정보가 보임
interface enterRoom{
    "chatRoomId": number,
    "userNickName": string,
    "userProfile": string|null,
    "time": string,
    "content": string
}

interface chatRoomParticipant{
    userA : number,
    userB : number
}


// 초기값 인터페이스
interface chat{
    chatList : getChatRoomList[],
    chatHistory : enterRoom|null,
    otherNickname: string,
    page:number,
}


// 초기화
const initialState:chat = {
    chatList : [],
    chatHistory : null,
    otherNickname: "",
    page:0,
}


const ChatSlice = createSlice({
    name:'ChatSlice',
    initialState,
    reducers:{

        addChatHistory(state, action){
            state.chatHistory?.push(action.payload);
        },
        
        changePage(state, action) {
            state.page = action.payload;
        },


    },
    extraReducers:(builder) => {
        builder.addCase(action.getChatList.fulfilled, (state, action) => {
            state.chatList = action.payload;

        })

        builder.addCase(action.enterChatRoom.fulfilled, (state, action) => {
            state.chatHistory = action.payload.chatContext;
        })

    },
    
});

export let {changePage,addChatHistory} = ChatSlice.actions;
export default ChatSlice.reducer;