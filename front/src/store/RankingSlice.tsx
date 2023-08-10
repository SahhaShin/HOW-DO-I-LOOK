import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

import { useDispatch } from "react-redux";

import { CheckToken } from "../hook/UserApi";

interface Ranking {
  rankMode: string;
  rankingList: rank[];
  partRankingList: rank[];
  myRank: rank;
  top3RankingList: rank[];
}

interface rank {
  userId: number;
  email: string;
  score: number;
  nickname: string;
  profileImg: string | null;
  rank: number;
  likeType: string;
}

const initialState: Ranking = {
  // rankMode : lovely, nature, modern, sexy
  rankMode: "lovely",
  rankingList: [],
  partRankingList: [],
  myRank: {
    userId: 0,
    email: "",
    score: 0,
    nickname: "",
    profileImg: "",
    rank: 0,
    likeType: ""
  },
  top3RankingList: [],
};

export const action_ranking = {
  getRankingList: createAsyncThunk(
    `RankingSlice/getRankingList`,
    async type => {
      const token = await CheckToken();

      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/ranking/list/${type}`,
        {
          headers: {
            Authorization: token
          }
        }
      );

      return response.data;
    }
  ),

  getPartRankingList: createAsyncThunk(
    `RankingSlice/getPartRankingList`,
    async ({ type, page, limit }) => {
      try {
        const token = await CheckToken();

        const response = await axios.get(
          `${process.env
            .REACT_APP_SERVER}/api/ranking/list/pagination/${type}/${page}/${limit}`,
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

  getMyRank: createAsyncThunk(`RankingSlice/getMyRank`, async({type, loginUserId}) => {
    try {
      const token = await CheckToken();

      const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/ranking/${loginUserId}/${type}`, {
        headers: {
          Authorization: token
        }
      })
      
      return response.data;
    } catch(e) {
      throw e;
    }
  }),

  getTop3Rank: createAsyncThunk(`RankingSlice/getTop3Rank`, async(type) => {
    try {
      const token = await CheckToken();

      const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/ranking/list/top/${type}`, {
        headers: {
          Authorization: token
        }
      })

      return response.data;
    } catch(e) {
      throw e;
    }
  })
};

const RankingSlice = createSlice({
  name: "RankingSlice",
  initialState,
  reducers: {
    changeRankMode(state, action) {
      state.rankMode = action.payload;
    }
  },

  extraReducers: builder => {
    builder.addCase(
      action_ranking.getRankingList.fulfilled,
      (state, action) => {
        state.rankingList = action.payload;
      }
    );

    builder.addCase(
      action_ranking.getPartRankingList.fulfilled,
      (state, action) => {
        state.partRankingList = action.payload;
      }
    );

    builder.addCase(action_ranking.getMyRank.fulfilled, (state, action) => {
      state.myRank = action.payload;
    })

    builder.addCase(action_ranking.getTop3Rank.fulfilled, (state, action) => {
      state.top3RankingList = action.payload;
    })
  }
});

export let { changeRankMode } = RankingSlice.actions;

export default RankingSlice.reducer;
