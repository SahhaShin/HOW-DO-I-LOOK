import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// alert창
import Swal from "sweetalert2";

import { CheckToken } from "../hook/UserApi";

// axios
export const action = {
  //방 만들기
  createLiveList: createAsyncThunk(
    "LiveSlice/createLiveList",
    async (formdata: LiveRoom, thunkAPI) => {
      try {
        const token = await CheckToken();
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER}/api/room`,
          { formdata },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        return response.data;
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
  ),

  //방 정보 수정하기
  changeLiveInfo: createAsyncThunk(
    "LiveSlice/changeLiveInfo",
    async (formdata: LiveRoom, thunkAPI) => {
      try {
        const token = await CheckToken();
        const response = await axios.put(
          `${process.env.REACT_APP_SERVER}/api/room`,
          { formdata },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        return response.data;
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
  ),

  //방 정보 조회하기
  getLiveInfo: createAsyncThunk(
    "LiveSlice/getLiveInfo",
    async (roomId: string, thunkAPI) => {
      try {
        const token = await CheckToken();
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER}/api/room/detail/${roomId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        return response.data;
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
  ),

  //방 리스트 조회하기
  getLiveList: createAsyncThunk(
    "LiveSlice/getLiveList",
    async (data: getChatRoomList, thunkAPI) => {
      var url = `${process.env.REACT_APP_SERVER}/api/room/list/`;
      if (data.userId != "") {
        //친구관련인지 확인
        url = url + `following?page=${data.pageNum}&userId=${data.userId}`;
      } else {
        url = url + `all?page=${data.pageNum}`;
      } //type이 있다면 삽입
      if (data.type != "") {
        url = url + `&type=${data.type}`;
      } //키워드로 서치중인지 확인
      if (data.search != "") {
        url = url + `&search=${data.search}`;
      }
      try {
        //리스트 호출 요청문 보내기
        const token = await CheckToken();
        const response = await axios.get(url, {
          headers: {
            Authorization: token,
          },
        });
        return response.data;
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
  ),

  // 스트리밍 참여
  enterLiveRoom: createAsyncThunk(
    "LiveSlice/enterLiveRoom",
    async ({ myId, otherId }: chatRoomParticipant, thunkAPI) => {
      try {
        const token = await CheckToken();
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER}/api/soloChatRoom`,
          { userA: myId, userB: otherId },
          {
            headers: {
              Authorization: token,
            },
          }
        );

        return response.data;
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
  ),
};

//채팅방 - 생성, 조회
interface LiveRoom {
  title: string;
  type: string;
  hostId: string;
  minAge: number;
  maxAge: number;
  gender: string;
}
//채팅방 조회용 조건
interface getChatRoomList {
  userId: string;
  type: string;
  search: string;
  pageNum: number;
}

// 초기화
const initialState = {
  liveList: [],
  chatHistory: null,
  otherNickname: "",
  page: 0,
};

const LiveSlice = createSlice({
  name: "LiveSlice",
  initialState,
  reducers: {
    changePage(state, action) {
      state.page = action.payload;
    },
    changeCreateModalOpen(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(action.getLiveList.fulfilled, (state, action) => {
      state.liveList = action.payload;
      console.log(state.liveList);
    });
  },
});

export let { changePage, changeCreateModalOpen } = LiveSlice.actions;
export default LiveSlice.reducer;
