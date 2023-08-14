import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

import { useDispatch } from "react-redux";

import { CheckToken } from "../hook/UserApi";

// 임시
interface Users {
  id: number;
  email: string;
  name: string;
  nickname: string | null;
  gender: string | null;
  profileImg: string | null;
  age: number | null;
  role: string | null;
  socialType: string | null;
  socialId: string | null;
  showBadgeType: string | null;
  closetAccess: string | null;
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

interface Feeds {
  userId: number;
  feedId: number;
  feedContent: string | null;
  feedCreatedDate: string | null;
  feedUpdateDate: string | null;
  photoResponseDtoList: Photos[];
  feedLikeCountResponseDto: {
    LOVELY: number;
    NATURAL: number;
    MODERN: number;
    SEXY: number;
  };
}

interface Photos {
  id: number;
  link: string | null;
  hashtagList: string[];
}

interface likeScore {
  id: number;
  lovelyScore: number;
  sexyScore: number;
  naturalScore: number;
  modernScore: number;
}

interface Badges {
  badgeId: number;
  badgeType: string;
  userId: number;
}

interface BadgeReq {
  id: number;
  badge: string;
}

interface Mypage {
  menuMode: number;
  mypageMode: number;
  followMode: number;
  feedReadMode: number;
  followModalOpen: boolean;
  badgeUpdateModalOpen : boolean;
  
  followModalMode: number;
  myFollowerUsers: Followers[]; // 내 팔로워
  myFollowingUsers: Followers[]; // 내 팔로잉
  yourFollowerUsers: Followers[]; // 상대의 팔로워
  yourFollowingUsers: Followers[]; // 상대의 팔로잉

  perfectFollowUsers: PerfectFollow[]; // 맞팔

  blackListUsers: BlackLists[]; // 블랙리스트
  manageType: number;
  followTempUser: Users;
  targetUser: Users;

  feedList: Feeds[];
  likeFeedList: Feeds[];

  likeScore: likeScore;
  badgeList: Badges[];
}

// 초기화
// menuMode : 1(main), 2(feed), 3(내정보)
// followMode : 1(팔로워), 2(팔로잉), 3(블랙리스트)
// mypageMode : 1(나 자신), 2(타인)
// manageType : 1(비번 인증), 2(read), 3(update)
// followModalMode : 1(팔로워), 2(팔로잉), 3(블랙리스트)
// feedReadMode : 1(전체) 2(좋아요)
const initialState: Mypage = {
  menuMode: 1,
  mypageMode: 1,
  followMode: 2,
  feedReadMode:0,
  manageType: 1,
  followModalOpen: false,
  badgeUpdateModalOpen : false,

  myFollowerUsers: [], // 내 팔로워
  myFollowingUsers: [], // 내 팔로잉
  yourFollowerUsers: [], // 상대의 팔로워
  yourFollowingUsers: [], // 상대의 팔로잉

  perfectFollowUsers: [], // 맞팔 리스트

  blackListUsers: [], // 블랙리스트

  feedList: [],
  likeFeedList: [],

  likeScore: {
    id: 0,
    lovelyScore: 0,
    sexyScore: 0,
    naturalScore: 0,
    modernScore: 0,
  },
  badgeList: [],

  followTempUser: {
    id: 0,
    email: "",
    name: "",
    nickname: null,
    gender: null,
    profileImg: null,
    age: null,
    role: null,
    socialType: null,
    socialId: null,
    showBadgeType: null,
    closetAccess: null,
  },
  targetUser: {
    id: 0,
    email: "",
    name: "",
    nickname: null,
    gender: null,
    profileImg: null,
    age: 0,
    role: null,
    socialType: null,
    socialId: null,
    showBadgeType: null,
    closetAccess: null,
  },
};

export const action_mypage = {
  // 임시로 로그인 유저
  getLoginUser: createAsyncThunk(`MypageSlice/getLoginUser`, async (userId) => {
    try {
      const token = await CheckToken();

      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/user/${userId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      return response.data;
    } catch (e) {
      throw e;
    }
  }),

  // 임시로 타겟 유저
  getTargetUser: createAsyncThunk(
    `MypageSlice/getTargetUser`,
    async (userId) => {
      try {
        const token = await CheckToken();

        const response = await axios.get(
          `${process.env.REACT_APP_SERVER}/api/user/${userId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        return response.data;
      } catch (e) {
        throw e;
      }
    }
  ),

  // id로 유저 찾기
  getUserById: createAsyncThunk(`MypageSlice/getUserById`, async (id) => {
    try {
      const token = await CheckToken();

      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/user/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      return response.data;
    } catch (e) {
      throw e;
    }
  }),

  updateUserInfo: createAsyncThunk(
    `MypageSlice/updateUserInfo`,
    async ({ targetUserId, userUpdateData }) => {
      try {
        const token = await CheckToken();

        let temp = userUpdateData.age;
        userUpdateData.age = Number(temp);

        const response = await axios.put(
          `${process.env.REACT_APP_SERVER}/api/user/update/info/${targetUserId}`,
          userUpdateData,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        return userUpdateData;
      } catch (e) {
        throw e;
      }
    }
  ),

  quitUser: createAsyncThunk(`MypageSlice/quitUser`, async (user_id) => {
    try {
      const token = await CheckToken();

      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER}/api/user/quit/${user_id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      return response.data;
    } catch (e) {
      throw e;
    }
  }),

  // 내 팔로잉 리스트
  getMyFollowingList: createAsyncThunk(
    `MypageSlice/getMyFollowingList`,
    async (myId) => {
      try {
        const token = await CheckToken();

        const response = await axios.get(
          `${process.env.REACT_APP_SERVER}/api/follow/list/my/followee/${myId}`,
          {
            headers: {
              Authorization: token,
            },
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
    `MypageSlice/getMyFollowerList`,
    async (myId) => {
      try {
        const token = await CheckToken();

        const response = await axios.get(
          `${process.env.REACT_APP_SERVER}/api/follow/list/my/follower/${myId}`,
          {
            headers: {
              Authorization: token,
            },
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
    `MypageSlice/getYourFollowingList`,
    async (yourId) => {
      try {
        const token = await CheckToken();

        const response = await axios.get(
          `${process.env.REACT_APP_SERVER}/api/follow/list/your/followee/${yourId}`,
          {
            headers: {
              Authorization: token,
            },
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
    `MypageSlice/getYourFollowerList`,
    async (yourId) => {
      try {
        const token = await CheckToken();

        const response = await axios.get(
          `${process.env.REACT_APP_SERVER}/api/follow/list/your/follower/${yourId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        return response.data;
      } catch (e) {
        throw e;
      }
    }
  ),

  // 블랙리스트
  getBlackList: createAsyncThunk(`MypageSlice/getBlackList`, async (myId) => {
    try {
      const token = await CheckToken();

      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/blacklist/list/${myId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      return response.data;
    } catch (e) {
      throw e;
    }
  }),

  // 블랙리스트 등록
  addBlackList: createAsyncThunk(
    `MypageSlice/addBlackList`,
    async (addBlackListData) => {
      try {
        const token = await CheckToken();

        const dto = {
          userId: addBlackListData.id,
          targetUserId: addBlackListData.targetId,
        };

        const response = await axios.post(
          `${process.env.REACT_APP_SERVER}/api/blacklist`,
          dto,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        return addBlackListData;
      } catch (e) {
        throw e;
      }
    }
  ),

  // 블랙리스트 삭제(취소)
  deleteBlackList: createAsyncThunk(
    `MypageSlice/deleteBlackList`,
    async (deleteBlackListData) => {
      try {
        const token = await CheckToken();

        const dto = {
          userId: deleteBlackListData.id,
          targetUserId: deleteBlackListData.targetId,
        };

        const response = await axios.delete(
          `${process.env.REACT_APP_SERVER}/api/blacklist`,
          {
            data: dto,
            headers: {
              Authorization: token,
            },
          }
        );

        return deleteBlackListData;
      } catch (e) {
        throw e;
      }
    }
  ),

  // 맞팔 리스트
  getPerfectFollowList: createAsyncThunk(
    `MypageSlice/getPerfectFollowList`,
    async () => {
      try {
        const token = await CheckToken();

        const response = await axios.get(
          `${process.env.REACT_APP_SERVER}/api/follow/list/perfectfollow`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        return response.data;
      } catch (e) {
        throw e;
      }
    }
  ),

  // 팔로우
  follow: createAsyncThunk(`MypageSlice/follow`, async (followingData) => {
    const token = await CheckToken();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/follow`,
        followingData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      return followingData;
    } catch (e) {
      throw e;
    }
  }),

  // 언팔로우
  unfollow: createAsyncThunk(
    `MypageSlice/unfollow`,
    async (deleteFollowingData) => {
      try {
        const token = await CheckToken();

        const response = await axios.delete(
          `${process.env.REACT_APP_SERVER}/api/follow`,
          {
            data: deleteFollowingData,
            headers: {
              Authorization: token,
            },
          }
        );

        return deleteFollowingData;
      } catch (e) {
        throw e;
      }
    }
  ),

  // 내 피드 리스트
  getFeedList: createAsyncThunk(`MypageSlice/getFeedList`, async (id) => {
    try {
      const token = await CheckToken();

      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/feed/${id}?page=0&size=10000`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log(response.data);

      return response.data;
    } catch (e) {
      throw e;
    }
  }),

  // 내가 좋아요 누른 피드 리스트1
  getLikeFeedList: createAsyncThunk(`MypageSlice/getLikeFeedList`, async id => {
    try {
      const token = await CheckToken();

      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/feed/liked/${id}?page=0&size=10000`,
        {
          headers: {
            Authorization: token
          },
        }
      );

      console.log(response.data);

      return response.data;
    } catch (e) {
      throw e;
    }
  }),

  // 보고있는 사람의 좋아요 점수 표시
  getLikeScore: createAsyncThunk(
    `MypageSlice/getLikeScore`,
    async (user_id) => {
      try {
        const token = await CheckToken();

        const response = await axios.get(
          `${process.env.REACT_APP_SERVER}/api/ranking/score/${user_id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        return response.data;
      } catch (e) {
        throw e;
      }
    }
  ),

  getBadgeList: createAsyncThunk(
    `MypageSlice/getBadgeList`,
    async (user_id) => {
      try {
        const token = await CheckToken();

        const response = await axios.get(
          `${process.env.REACT_APP_SERVER}/api/badge/list/${user_id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        return response.data;
      } catch (e) {
        throw e;
      }
    }),

  updateBadge : createAsyncThunk(`MypageSlice/updateBadge`, async ({id, badge}:BadgeReq) => {
    try {

      console.log(`id = ${id}, badge = ${badge}`);
      const token = await CheckToken();

      const response = await axios.put(
        `${process.env.REACT_APP_SERVER}/api/user/update/${id}/${badge}`,
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
  })
};

const MypageSlice = createSlice({
  name: "MypageSlice",
  initialState,
  reducers: {
    changeFollowModalOpen(state, action) {
      state.followModalOpen = action.payload;
    },
    changeBadgeUpdateModalOpen(state, action){
      state.badgeUpdateModalOpen = action.payload;
    },
    // addFollowUsers(state, action){
    //     // 내가 아닌 다른 유저가 마이페이지에 들어왔을 때 follow 가능
    //     state.followMeUsers?.push(action.payload);
    // },
    // removeFollowUsers(state, action){
    //     //action.payload는 id:number
    //     //내가 내 마이페이지에 들어갔을 때 unfollow 가능
    //     let followNumber = state.followMeUsers?.length;

    //     if(followNumber!==null && followNumber>0){
    //         for(let i=0;i<followNumber;i++){
    //             if(state.followMeUsers[i].id===action.payload){
    //                 state.followMeUsers.splice(action.payload,1);
    //             }
    //         }
    //     }
    // },
    changeFollowMode(state, action) {
      state.followMode = action.payload;
    },
    changeMypageMode(state, action) {
      state.mypageMode = action.payload;
    },
    changeManageType(state, action) {
      state.manageType = action.payload;
    },
    changeMenuMode(state, action) {
      state.menuMode = action.payload;
    },
    changeFollowModalMode(state, action) {
      state.followModalMode = action.payload;
    },
    changeFeedReadMode(state, action){
      state.feedReadMode = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder.addCase(action_mypage.getTargetUser.fulfilled, (state, action) => {
      state.targetUser = action.payload;
    });

    builder.addCase(action_mypage.getUserById.fulfilled, (state, action) => {
      state.targetUser = action.payload;
    });

    builder.addCase(action_mypage.updateUserInfo.fulfilled, (state, action) => {
      state.targetUser.age = action.payload.age;
      state.targetUser.gender = action.payload.gender;
      state.targetUser.name = action.payload.name;
      state.targetUser.nickname = action.payload.nickname;
      state.targetUser.closetAccess = action.payload.closetAccess;
    });

    builder.addCase(
      action_mypage.getMyFollowingList.fulfilled,
      (state, action) => {
        state.myFollowingUsers = action.payload;
      }
    );

    builder.addCase(
      action_mypage.getMyFollowerList.fulfilled,
      (state, action) => {
        state.myFollowerUsers = action.payload;
      }
    );

    builder.addCase(
      action_mypage.getYourFollowingList.fulfilled,
      (state, action) => {
        state.yourFollowingUsers = action.payload;
      }
    );

    builder.addCase(
      action_mypage.getYourFollowerList.fulfilled,
      (state, action) => {
        state.yourFollowerUsers = action.payload;
      }
    );

    builder.addCase(action_mypage.getBlackList.fulfilled, (state, action) => {
      state.blackListUsers = action.payload;
    });

    builder.addCase(action_mypage.follow.fulfilled, (state, action) => {
      const loginUser = JSON.parse(window.sessionStorage.getItem("loginUser"));

      if (action.payload.id === loginUser.id) {
        state.myFollowingUsers.push({
          id: action.payload.targetId,
          nickname: action.payload.nickname,
          profileImg: action.payload.profileImg,
        });

        state.yourFollowerUsers.push({
          id: action.payload.id,
          nickname: loginUser.nickname,
          profileImg: loginUser.profileImg,
        });
      } else if (action.payload.targetId === loginUser.id) {
        state.myFollowerUsers.push({
          id: action.payload.targetId,
          nickname: action.payload.nickname,
          profileImg: action.payload.profileImg,
        });

        state.yourFollowingUsers.push({
          id: action.payload.id,
          nickname: loginUser.nickname,
          profileImg: loginUser.profileImg,
        });
      }

      Swal.fire({
        icon: 'success',
        title: '팔로우 완료',
        text: '팔로우 등록이 완료되었습니다 :)',
        confirmButtonColor: '#4570F5',
      })

    });

    builder.addCase(action_mypage.follow.rejected, (state, action) => {
      Swal.fire({
        icon: 'info',
        title: '이미 팔로우를 하셨어요!',
        text: '팔로우 등록이 이미 완료되었습니다 :)',
        confirmButtonColor: '#4570F5',
      })
    })

    builder.addCase(action_mypage.unfollow.fulfilled, (state, action) => {
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

    builder.addCase(action_mypage.addBlackList.fulfilled, (state, action) => {
      state.blackListUsers.push({
        id: action.payload.id,
        targetUserId: action.payload.targetId,
        nickname: action.payload.nickname,
        profileImg: action.payload.profileImg,
      });
    });

    builder.addCase(
      action_mypage.deleteBlackList.fulfilled,
      (state, action) => {
        for (let i = 0; i < state.blackListUsers.length; i++) {
          if (
            state.blackListUsers[i].targetUserId === action.payload.targetId
          ) {
            state.blackListUsers.splice(i, 1);

            break;
          }
        }
      }
    );

    builder.addCase(action_mypage.getFeedList.fulfilled, (state, action) => {
      state.feedList = action.payload;
      console.log(state.feedList);
    });

    builder.addCase(
      action_mypage.getLikeFeedList.fulfilled,(state, action) => {
        state.likeFeedList = action.payload;
        console.log(state.likeFeedList);
      }
    );

    builder.addCase(action_mypage.getLikeScore.fulfilled, (state, action) => {
      state.likeScore = action.payload;
    });

    builder.addCase(
      action_mypage.getPerfectFollowList.fulfilled,
      (state, action) => {
        state.perfectFollowUsers = action.payload;
      }
    );

    builder.addCase(action_mypage.getBadgeList.fulfilled, (state, action) => {
      state.badgeList = action.payload;
    });

    builder.addCase(action_mypage.updateBadge.fulfilled, (state, action) => {
      //저절로 session에 등록되나? 

      Swal.fire({
        icon: 'success',
        title: '교체 완료',
        text: '뱃지가 교체되었습니다',
        confirmButtonColor: '#4570F5',
    })
    });
  }
});

export let {
  changeFollowModalOpen,
  addFollowUsers,
  removeFollowUsers,
  changeFollowMode,
  changeMypageMode,
  changeManageType,
  changeMenuMode,
  changeFollowModalMode,
  changeFeedReadMode,
  changeBadgeUpdateModalOpen
} = MypageSlice.actions;

export default MypageSlice.reducer;
