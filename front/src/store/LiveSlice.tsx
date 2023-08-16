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
        const responseCreate = await axios.post(
          `${process.env.REACT_APP_SERVER}/api/room`,
          {
            title: formdata.title,
            type: formdata.type,
            hostId: formdata.hostId,
            minAge: formdata.minAge,
            maxAge: formdata.maxAge,
            gender: formdata.gender,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log("hostId : " + formdata.hostId);
        console.log("roomId : " + responseCreate.data);
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER}/api/roomuser?userId=${formdata.hostId}&roomId=${responseCreate.data}`,
          {},
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const roomCode = response.data.roomCode;
        const chatCode = response.data.chatCode;
        window.sessionStorage.setItem("roomCode", JSON.stringify(roomCode));
        window.sessionStorage.setItem("chatCode", JSON.stringify(chatCode));
        window.sessionStorage.setItem(
          "hostId",
          JSON.stringify(formdata.hostId)
        );
          const url =  `${process.env.REACT_APP_FRONT}/live/${responseCreate.data}/${formdata.hostId}`;
          console.log(url)
        // window.location.href = `${process.env.REACT_APP_FRONT}/live/${responseCreate.data}/${formdata.hostId}`;
        return url;
      } catch (e) {
        console.log(e);
        alert(e.response.data.message);
        throw e;
      }
    }
  ),

  //방 정보 수정하기
  changeLiveInfo: createAsyncThunk(
    "LiveSlice/changeLiveInfo",
    async (formdata: LiveRoom, thunkAPI) => {
      console.log(formdata.gender);
      try {
        const token = await CheckToken();
        const response = await axios.put(
          `${process.env.REACT_APP_SERVER}/api/room/${formdata.roomId}`,
          {
            title: formdata.title,
            type: formdata.type,
            hostId: formdata.hostId,
            minAge: formdata.minAge,
            maxAge: formdata.maxAge,
            gender: formdata.gender,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        window.location.href = `${process.env.REACT_APP_FRONT}/livelist`;

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
      if (data.following) {
        //친구관련인지 확인
        url = url + `following?page=${data.pageNum}&userId=${data.userId}`;
      } else {
        url = url + `all?page=${data.pageNum}&userId=${data.userId}`;
      } //type이 있다면 삽입
      if ( !(typeof data.type == "undefined" || data.type == null || data.type == "")) {
        url = url + `&type=${data.type}`;
      } //키워드로 서치중인지 확인
      if (!(typeof data.search == "undefined" || data.search == null || data.search == "")) {
        url = url + `&search=${data.search}`;
      }
      console.log(url);
      try {
        //리스트 호출 요청문 보내기
        const token = await CheckToken();
        const response = await axios.get(url, {
          headers: {
            Authorization: token,
          },
        });
        console.log(response.data);
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
    async (formdata: joinRoom, thunkAPI) => {
      try {
        const token = await CheckToken();
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER}/api/roomuser?userId=${formdata.userId}&roomId=${formdata.roomId}`,
          {},
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const roomCode = response.data.roomCode;
        const chatCode = response.data.chatCode;
        window.sessionStorage.setItem("roomCode", JSON.stringify(roomCode));
        window.sessionStorage.setItem("chatCode", JSON.stringify(chatCode));
        window.sessionStorage.setItem(
          "hostId",
          JSON.stringify(formdata.hostId)
        );

        const url = `${process.env.REACT_APP_FRONT}/live/${formdata.roomId}/${formdata.hostId}`;
        return url;
      } catch (e) {
        alert(e.response.data.message);
        throw e;
      }
    }
  ),
};

//방송 - 생성, 조회
interface LiveRoom {
  roomId: string;
  title: string;
  type: string;
  hostId: string;
  minAge: number;
  maxAge: number;
  gender: string;
}
//방송 조회용 조건
interface getChatRoomList {
  following : boolean;
  userId: string;
  type: string;
  search: string;
  pageNum: number;
}
//방송 입장용
interface joinRoom {
  userId: string;
  roomId: string;
  hostId: string;
}

// 초기화
const initialState = {
  liveList: [],
  chatHistory: null,
  otherNickname: "",
  page: 0,
  pageAll: 0,
  ModalOpen: false,
  create: false,

  userId: "",
  type: "",
  search: "",
};

const LiveSlice = createSlice({
  name: "LiveSlice",
  initialState,
  reducers: {
    setUserId(state, action) {
      state.userId = action.payload;
    },
    setListType(state, action) {
      state.type = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
    setAllPage(state, action) {
      state.pageAll = action.payload;
    },
    changePage(state, action) {
      state.page = action.payload;
      console.log("action.paload : " + action.payload)
      console.log("changde : " + state.page)
    },
    changeModalOpen(state, action) {
      state.ModalOpen = action.payload;
    },
    isCreate(state, action) {
      state.create = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(action.getLiveList.fulfilled, (state, action) => {
      console.log(state);
      state.pageAll = action.payload.totalPage;
      state.liveList = action.payload.roomList;
    });

    builder.addCase(action.createLiveList.fulfilled, (state, action) => {
      state.ModalOpen = false;
      console.log(state.liveList);
        window.location.href = action.payload;      
    });

    builder.addCase(action.enterLiveRoom.fulfilled, (state, action) => {
        window.location.href = action.payload;      
    });

    builder.addCase(action.changeLiveInfo.fulfilled, (state, action) => {
      state.ModalOpen = false;
      console.log(state.liveList);
    });
  },
});

export let {
  changePage,
  changeModalOpen,
  isCreate,
  setUserId,
  setListType,
  setSearch,
  setAllPage,
} = LiveSlice.actions;
export default LiveSlice.reducer;
