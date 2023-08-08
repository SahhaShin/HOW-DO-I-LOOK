import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

import { useDispatch } from "react-redux";

import { CheckToken } from "../hook/UserApi";

interface Ranking {
  rankMode: string;
  rankingList: rank[];
  partRankingList: rank[];
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
  partRankingList: []
};

export const action_ranking = {
  getRankingList: createAsyncThunk(
    `RankingSlice/getRankingList`,
    async type => {
      const token = await CheckToken();

      console.log(type);

      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/ranking/list/${type}`,
        {
          headers: {
            Authorization: token
          }
        }
      );

      console.log(response.data);

      return response.data;
    }
  ),

  getPartRankingList: createAsyncThunk(
    `RankingSlice/getPartRankingList`,
    async ({ type, page, limit }) => {
      try {
        console.log(page);
        console.log(limit);
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
  )
};

const RankingSlice = createSlice({
  name: "RankingSlice",
  initialState,
  reducers: {
    changeRankMode(state, action) {
      state.rankMode = action.payload;
      console.log(state.rankMode);
    }
  },

  extraReducers: builder => {
    builder.addCase(
      action_ranking.getRankingList.fulfilled,
      (state, action) => {
        state.rankingList = action.payload;

        console.log(action.payload);
        console.log(state.rankingList);
      }
    );

    builder.addCase(
      action_ranking.getPartRankingList.fulfilled,
      (state, action) => {
        state.partRankingList = action.payload;
      }
    );
  }
});

export let { changeRankMode } = RankingSlice.actions;

export default RankingSlice.reducer;
