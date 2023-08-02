import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// axios
export const action = {
    // 초기 api
    getClothesListByType : createAsyncThunk(`ClosetSlice/getClothesListByType`, async({clothesType, userId, pageNum}:ClothesListByTypeReq,thunkAPI)=>{
        return await axios({
            method: "get",
            url:`http://localhost:8081/api/clothes/list?type=${clothesType}&userId=${userId}&page=${pageNum}`,
           
        }).then(response=>{
            console.log(response.data);
            return response.data; //return을 꼭 해줘야 extraReducer에서 에러가 안난다.
        }).catch((e)=>{
            console.log(e);
        })
    }),
    getOOTDList: createAsyncThunk("ClosetSlice/getOOTDList",async (userId,thunkAPI) => {
        return await axios({
            method: "get",
            url:`http://localhost:8081/api/ootd/list/${userId}`,
           
        }).then(response=>{
            console.log(response.data);
        }).catch((e)=>{
            console.log(e);
        })
    }),
    saveClothes : createAsyncThunk("ClosetSlice/saveClothes", async({clothesSaveRequestDto,s3upload}:saveClothes, thunkAPI)=>{
        return await axios({
            method: "post",
            url:"/clothes",
            params:{
                clothesSaveRequestDto,
                s3upload,
            }
        }).then(response => {
            console.log(response.data);
            alert("옷이 등록되었습니다.");
        }).catch((e)=>{
            console.log(e);
        });
    }),
}



// 유저가 옷을 등록하려고 입력한 정보들
interface saveClothes{
    clothesSaveRequestDto:{
        userId:number,
        type:string,
        name:string,
        brand:string,
        info:string,
    },
    s3upload:File,
}


// 타입별 옷 요청 요청 api에 필요한 변수
// 1. clothesType은 “ALL, TOP, BOTTOM, SHOE, ACCESSORY” 중 하나만 올 수 있다!
// 2. pageNum은 페이지 번호!(페이지 순서는 0부터 시작)
interface ClothesListByTypeReq{ //response
    clothesType : string,
    userId : number,
    pageNum : number,
}

interface ClothesListByTypeRes{ //response
    clothesId : number,
    photoLink : string
}

// 초기값 인터페이스
interface closet{
    modalOpen:boolean,
    mode:number, 

    // 옷 타입과 리스트
    clothesType:string,
    clothesListByType:ClothesListByTypeRes[],
    newClothes? : saveClothes|null,
}


// 초기화
//mode는 c(1) r(2) u(3) 중 어떤 모드인지를 뜻한다.
const initialState:closet = {
    modalOpen : false,
    mode : 0,
    clothesType : "상의",
    clothesListByType : [],
    newClothes : null,
}


const ClosetSlice = createSlice({
    name:'ClosetSlice',
    initialState,
    reducers:{
        changeModalOpen(state, action){
            state.modalOpen = action.payload;
        },

        changeMode(state, action){
            state.mode = action.payload;
        },
        setNewClothes(state, action){
            state.newClothes=action.payload;
            
        },
        changeClothesType(state, action){
            state.clothesType=action.payload;
        }
    },
    extraReducers:(builder) => {
        builder.addCase(action.getClothesListByType.fulfilled,(state,action)=>{
            state.clothesListByType=action.payload;
        })
        // builder.addCase(action.saveClothes.fulfilled, (state, action) => {
        //     Add user to the state array
        //     state.newClothes?.push(action.payload);
        // })
    }
});

export let {changeModalOpen, changeMode, setNewClothes,changeClothesType} = ClosetSlice.actions;
export default ClosetSlice.reducer;