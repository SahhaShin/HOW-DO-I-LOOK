import { createSlice} from "@reduxjs/toolkit";

// axios
export const action = {
    
    //특정 옷 정보 가져오기 O
    getClothInfo : createAsyncThunk("ClosetSlice/getClothInfo", async(clothesId, thunkAPI)=>{

        try{
            const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/clothes/detail/${clothesId}`);
            // console.log(response.data);
            return response.data; // 액션의 payload로 값을 반환해야 합니다.
        } catch (e) {
            console.log(e);
            throw e;
        }
    }),


}



interface Feed{
    isFollow:boolean,
    detailModalOpen:boolean,
    sortType:number,
    createModalOpen:boolean,
    createType:number,
    uploadHashtags:string[],
    uploadPictures:string[],
    declarationModalOpen:boolean,
}

// 초기화
//isFollow : 팔로우 여부
//sortType : 1 all 2 following
//createType : 1 사진추가 2 마무리
const initialState:Feed = {
    isFollow : false,
    detailModalOpen : false,
    sortType:1,
    createModalOpen:false,
    createType:1,
    uploadHashtags:[],
    uploadPictures:[],
    declarationModalOpen:false,
}


const FeedSlice = createSlice({
    name:'FeedSlice',
    initialState,
    reducers:{
        changeFollow(state, action){
            state.isFollow = action.payload;
        },
        changeDetailModalOpen(state, action){
            state.detailModalOpen = action.payload;
        },
        changeSortType(state, action){
            state.sortType = action.payload;
        },
        changeCreateModalOpen(state, action){
            state.createModalOpen = action.payload;
        },
        changeCreateType(state, action){
            state.createType = action.payload;
        },

        addHashTag(state, action){
            let hash:string = action.payload;
            state.uploadHashtags.push(hash);
        },
        addPicture(state, action){
            let url:string = action.payload;
            state.uploadPictures.push(url);
        },
        changeDeclarationModalOpen(state, action){
            state.declarationModalOpen=action.payload;
        }

    },
    extraReducers:(builder) => {
        // builder.addCase(action.getClothesListByType.fulfilled,(state,action)=>{
        //     if(action.payload.type==="TOP"){
        //         state.clothesTop=action.payload.content;
        //     }else if(action.payload.type==="BOTTOM"){
        //         state.clothesBottom=action.payload.content;
        //     }else if(action.payload.type==="SHOE"){
        //         state.clothesShoe=action.payload.content;
        //     }else if(action.payload.type==="ACCESSORY"){
        //         state.clothesAccessory=action.payload.content;
        //     }else{
        //         // all
        //         state.clothesAll=action.payload.content;
        //     }

        //     state.clothesListByType=action.payload.content;
        // })
        
    }
});

export let {changeFollow, changeDetailModalOpen, changeSortType, changeCreateModalOpen, changeCreateType, changeDeclarationModalOpen} = FeedSlice.actions;
export default FeedSlice.reducer;