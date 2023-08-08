import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

import {useDispatch} from "react-redux"

import {CheckToken} from "../hook/UserApi"

interface Ranking {
    rankMode : string,
    rankingList : rank[]
}

interface rank {
    userId : number,
    email : string, 
    score : number,
    nickname : string,
    profileImg : string | null,
    rank : number,
    likeType : string
}

const initialState:Ranking = {
    // rankMode : lovely, nature, modern, sexy
    rankMode:"lovely",
    rankingList:[],
}

export const action_ranking = {
    
    getRankingList : createAsyncThunk(`RankingSlice/getRankingList`, async(type) => {
        const token = await CheckToken();

        console.log(type)

        const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/ranking/list/${type}`, {
            headers : {
                "Authorization" : token,
            }
        });

        console.log(response.data);

        return response.data;
    })
}

const RankingSlice = createSlice({
    name:'RankingSlice',
    initialState,
    reducers:{
        changeRankMode(state, action){
            state.rankMode=action.payload;
            console.log(state.rankMode);
        },
    },

    extraReducers: (builder) => {
        
        builder.addCase(action_ranking.getRankingList.fulfilled, (state, action) => {
            state.rankingList = action.payload;

            console.log(action.payload)
            console.log(state.rankingList)
        })
    }
});

export let {changeRankMode} = RankingSlice.actions;

export default RankingSlice.reducer;