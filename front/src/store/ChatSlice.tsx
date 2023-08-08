import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// alert창
import Swal from "sweetalert2";

// axios
export const action = {

    //채팅 리스트 불러오기 O
    getChatList : createAsyncThunk("ChatSlice/getChatList", async(userId, thunkAPI)=>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/soloChatRoom/${userId}`);
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
            const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/soloChatRoom`,
                {userA:myId, userB:otherId}
            );

            return response.data;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }), 

}


//채팅방 리스트 객체 타입
interface getChatRoomList{
    id: number,
    userAId: number,
    userBId: number,
    chatroomCode: string,
}

//방에 들어가면 그 방에 있던 채팅 정보와 상대방 정보가 보임
interface enterRoom{
    chatContext: [
        {
            chatRoomId: number,
            chatId: number|null,
            userNickName: string,
            userProfile: string|null,
            createTime: string,
            content: string
        }
    ],
    chatRoomCode: string
}

interface chatRoomParticipant{
    userA : number,
    userB : number
}


// 초기값 인터페이스
interface chat{
    chatList : getChatRoomList[],
    chatHistory : enterRoom|null,
    chatHistoryTime : string|null,
    chatHistoryDate : string|null,
}


// 초기화
const initialState:chat = {
    chatList : [],
    chatHistory : null,
}


const ChatSlice = createSlice({
    name:'ChatSlice',
    initialState,
    reducers:{

        addChatHistory(state, action){
            state.chatHistory?.chatContext.push(action.payload);
        }

    },
    extraReducers:(builder) => {
        builder.addCase(action.getChatList.fulfilled, (state, action) => {
            state.chatList = action.payload;
            console.log(state.chatList);
        })

        builder.addCase(action.enterChatRoom.fulfilled, (state, action) => {
            state.chatHistory = action.payload;
        })

    }
});

export let {addChatHistory} = ChatSlice.actions;
export default ChatSlice.reducer;