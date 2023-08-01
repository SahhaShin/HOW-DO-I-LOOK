import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// axios
export const action = {
    uploadImg : createAsyncThunk("api/image/save", async()=>{
        return await axios({
            method: "post",
            url:process.env.REACT_APP_API_URL,
        }).then(response => {
            console.log(response.data);
        });
    }),
    getClothesListByType : createAsyncThunk(`/api/clothes/list`, async({clothesType, userId, pageNum}:ClothesListByType)=>{
        return await axios({
            method: "get",
            url:process.env.REACT_APP_API_URL+`/api/clothes/list?type=${clothesType}&userId=${userId}&page=${pageNum}`,
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
interface inputClothesInfo{
    image : File,
    type:string,
    name : string,
    brand : string,
    comment : string,
}

// 초기값 인터페이스
interface closet{
    modalOpen:boolean,
    mode:number,
    newClothes : inputClothesInfo|null
}

interface ClothesListByType{
    // 타입별 옷 요청 요청 api에 필요한 변수
    // 1. clothesType은 “ALL, TOP, BOTTOM, SHOE, ACCESSORY” 중 하나만 올 수 있다!
    // 2. pageNum은 페이지 번호!(페이지 순서는 0부터 시작)
    clothesType : string,
    pageNum : number,
    userId : number,
}

// 초기화
//mode는 c(1) r(2) u(3) 중 어떤 모드인지를 뜻한다.
const initialState:closet = {
    modalOpen : false,
    mode : 0,
    newClothes : null,

    // 타입별 옷 리스트에 필요한 변수 (유저 아이디는 세션에서 가져와야함)
    clothesType:"TOP",
    pageNum:0,
    userId:0,
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
    }
});

export let {changeModalOpen, changeMode, setNewClothes} = ClosetSlice.actions;
export default ClosetSlice.reducer;