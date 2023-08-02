import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// axios
export const action = {
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
    getClothesListByType : createAsyncThunk(`ClosetSlice/getClothesListByType`, async({clothesType, userId, pageNum}:ClothesListByType,thunkAPI)=>{
        return await axios({
            method: "get",
            url:`http://localhost:8081/api/clothes/list?type=${clothesType}&userId=${userId}&page=${pageNum}`,
            params:{
                type:clothesType,
                userId:userId,
                page:pageNum,
            }
        }).then(response=>{
            console.log(response.data);
        }).catch((e)=>{
            console.log(e);
        })
    })
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
interface ClothesListByType{
    clothesType : string,
    pageNum : number,
    userId : number,
}

// 초기값 인터페이스
interface closet{
    modalOpen:boolean,
    mode:number,
    newClothes? : saveClothes|null
}


// 초기화
//mode는 c(1) r(2) u(3) 중 어떤 모드인지를 뜻한다.
const initialState:closet = {
    modalOpen : false,
    mode : 0,
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
            
        }
    },
    extraReducers:(builder) => {
        builder.addCase(action.saveClothes.fulfilled, (state, action) => {
            // Add user to the state array
            // state.newClothes?.push(action.payload);
        })
    }
});

export let {changeModalOpen, changeMode, setNewClothes} = ClosetSlice.actions;
export default ClosetSlice.reducer;