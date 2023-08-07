import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

import {useDispatch} from "react-redux"


export const action = {
    
    // getLoginUser : createAsyncThunk(`MyPageSlice/getLoginUser`, async(userId) => {
    //     try {
    //         const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/user/${userId}`);
 
    //         return response.data;
    //     } catch(e) {
    //         throw e;
    //     }
    // }),
}

// rankMode : lovely, nature, modern, sexy
const initialState = {
    rankMode:"sexy",
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
        
        // builder.addCase(action.getLoginUser.fulfilled, (state, action) => {
        //     state.loginUser = action.payload;
        // })
    }
});

export let {changeRankMode} = RankingSlice.actions;

export default RankingSlice.reducer;