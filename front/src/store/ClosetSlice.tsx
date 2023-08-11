import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// alert창
import Swal from "sweetalert2";

import {CheckToken} from "../hook/UserApi"

// axios
export const action = {
    // 옷 분야별 리스트 O
    getClothesListByType : createAsyncThunk("ClosetSlice/getClothesListByType", async({clothesType, userId, pageNum}:ClothesListByTypeReq, thunkAPI)=>{
        try{
            console.log(`${clothesType} ${userId} ${pageNum}`);
            const token = await CheckToken();
            const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/clothes/list?type=${clothesType}&userId=${userId}&page=${pageNum}`,{
                headers: {
                  "Authorization" : token
                }
                
              });

              let data = {
                type : clothesType,
                response : response.data
              }


            return data; // 액션의 payload로 값을 반환해야 합니다.
        } catch (e) {
            console.log(e);
            throw e;
        }
    }),
    //OOTD O
    //옷 id 같은 것끼리도 저장 가능
    OOTDSave: createAsyncThunk("ClosetSlice/OOTDSave",async ({userId, order, slotIds}:saveOOTD,thunkAPI) =>{
        try{
            console.log(`${userId} ${order} ${slotIds.ACCESSORY1}`);
            const token = await CheckToken();
            const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/ootd`,{userId,order,slotIds},{
                headers: {
                  "Authorization" : token
                }
                
            });

            let saveOOTD = {
                userId,
                order,
                slotIds,
            }

            return saveOOTD;

        } catch (e) {
            console.log(e);
            throw e;
        }
    }),

    //OOTD 리스트 불러오기 -> 진행중
    OOTDList: createAsyncThunk("ClosetSlice/OOTDList",async (userId,thunkAPI) =>{
        console.log(userId);
        try{
            const token = await CheckToken();
            const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/ootd/list/${userId}`,{
                headers: {
                  "Authorization" : token
                }
                
            });

            return response.data;

        } catch (e) {
            console.log(e);
            throw e;
        }
    }),
 
    // 새로운 옷 등록 O
    saveClothes : createAsyncThunk("ClosetSlice/saveClothes", async(formdata, thunkAPI)=>{

        const token = await CheckToken();
        await axios.post(`${process.env.REACT_APP_SERVER}/api/clothes`, formdata, {
        headers: {
          "Authorization" : token,
          "Content-Type": "multipart/form-data",
        }
      }).then((res)=>{
        Swal.fire({
            icon: 'success',
            title: '등록 완료',
            text: '옷이 성공적으로 등록되었습니다.',
            confirmButtonColor: '#4570F5',
        })

        return res.data;
      })
    }),

    //특정 옷 정보 가져오기 O
    getClothInfo : createAsyncThunk("ClosetSlice/getClothInfo", async(clothesId, thunkAPI)=>{

        try{
            console.log(clothesId);
            const token = await CheckToken();
            const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/clothes/detail/${clothesId}`,{
                headers: {
                  "Authorization" : token,
                }
            });
            
            console.log(response.data);
            return response.data; // 액션의 payload로 값을 반환해야 합니다.
        } catch (e) {
            console.log(e);
            throw e;
        }
    }),

    //특정 옷 수정하기 O -> 이미지는 수정 안되는 걸로
    updateClothInfo : createAsyncThunk("ClosetSlice/updateClothInfo", async({userId,type,name,brand,info,clothesId}, thunkAPI)=>{

        try{
            console.log(userId);
            const token = await CheckToken();
            const response = await axios.put(`${process.env.REACT_APP_SERVER}/api/clothes/${clothesId}`,{userId,type,name,brand,info},{
                headers: {
                  "Authorization" : token,
                }
            });
            console.log(response.data);
            return response.data; // 액션의 payload로 값을 반환해야 합니다.
        } catch (e) {
            console.log(e);
            throw e;
        }
    }), 

    //특정 옷 삭제하기 O
    deleteClothInfo : createAsyncThunk("ClosetSlice/deleteClothInfo", async(clothesId, thunkAPI)=>{
        try{
            const token = await CheckToken();
            const response = await axios.delete(`${process.env.REACT_APP_SERVER}/api/clothes/${clothesId}`,{
                headers: {
                  "Authorization" : token,
                }
            });
    
        } catch (e) {
            console.log(e);
            throw e;
        }
    }), 

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

interface ClothesOOTDList{
    clothesId:number,
    clothesPhotoLink:string,
    clothesOotdId:number
}

// 유저가 옷을 등록하려고 입력한 정보들
interface saveClothes{ //request
    clothesSaveRequestDto:{
        userId:number,
        type:string,
        name:string,
        brand:string,
        info:string,
    },
    s3upload:File,
}

//특정 옷 정보
interface getClothes{
    type:string,
    photoLink:string,
    name:string,
    brand:string,
    info:string
}

// 유저가 ootd를 등록하려고 입력한 정보들
interface saveOOTD{
    userId:number,
    order:number,
    slotIds:{
        TOP:number,
        BOTTOM:number,
        SHOE:number,
        ACCESSORY1:number,
        ACCESSORY2:number,
        ACCESSORY3:number
    }
}



// 초기값 인터페이스
interface closet{
    modalOpen:boolean,
    mode:number, 

    // 옷 타입과 리스트
    clothesTypeKo:string,
    clothesTypeEn:string,

    clothesListByType:ClothesListByTypeRes[],
    clothesTop:ClothesListByTypeRes[],
    clothesBottom:ClothesListByTypeRes[],
    clothesShoe:ClothesListByTypeRes[],
    clothesAccessory:ClothesListByTypeRes[],
    clothesAll:ClothesListByTypeRes[],

    clothesOOTDTop_1:ClothesOOTDList[],
    clothesOOTDBottom_1:ClothesOOTDList[],
    clothesOOTDShoe_1:ClothesOOTDList[],
    clothesOOTDAccessory1_1:ClothesOOTDList[],
    clothesOOTDAccessory2_1:ClothesOOTDList[],
    clothesOOTDAccessory3_1:ClothesOOTDList[],

    clothesOOTDTop_2:ClothesOOTDList[],
    clothesOOTDBottom_2:ClothesOOTDList[],
    clothesOOTDShoe_2:ClothesOOTDList[],
    clothesOOTDAccessory1_2:ClothesOOTDList[],
    clothesOOTDAccessory2_2:ClothesOOTDList[],
    clothesOOTDAccessory3_2:ClothesOOTDList[],

    // 옷 id, link
    clothesId : number,
    clothesLink : string,

    clothInfo? : getClothes|null,

    // 페이지네이션
    page:number,

    clothRegistOk:boolean,

    OOTD1 : saveOOTD|null,
    OOTD2 : saveOOTD|null,
}


// 초기화
//mode는 c(1) r(2) u(3) 중 어떤 모드인지를 뜻한다.
const initialState:closet = {
    modalOpen : false,
    mode : 1,
    clothesTypeKo : "상의",
    clothesTypeEn : "TOP",
    clothesListByType : [],

    clothesTop:[],
    clothesBottom:[],
    clothesShoe:[],
    clothesAccessory:[],
    clothesAll:[],

    clothesOOTDTop_1:[],
    clothesOOTDBottom_1:[],
    clothesOOTDShoe_1:[],
    clothesOOTDAccessory1_1:[],
    clothesOOTDAccessory2_1:[],
    clothesOOTDAccessory3_1:[],

    clothesOOTDTop_2:[],
    clothesOOTDBottom_2:[],
    clothesOOTDShoe_2:[],
    clothesOOTDAccessory1_2:[],
    clothesOOTDAccessory2_2:[],
    clothesOOTDAccessory3_2:[],


    clothesId : 0,
    clothesLink : "",

    clothInfo : null,
    page:0,

    clothRegistOk : false,

    // OOTD 저장 옷 번호
    OOTD1 : null,
    OOTD2 : null,
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
        changeClothesType(state, action){
            state.clothesTypeKo=action.payload;

            if(state.clothesTypeKo==="상의"){
                state.clothesTypeEn="TOP";
            }else if(state.clothesTypeKo==="하의"){
                state.clothesTypeEn="BOTTOM";
            }else if(state.clothesTypeKo==="신발"){
                state.clothesTypeEn="SHOE";
            }else if(state.clothesTypeKo==="악세서리"){
                state.clothesTypeEn="ACCESSORY";
            }else{
                state.clothesTypeEn="ALL";
            }
        },
        changePage(state, action){
            state.page = action.payload;
        },
        changeClothesId(state, action){
            state.clothesId = action.payload;
        },
        changeClothesLink(state, action){
            state.clothesLink = action.payload;
        }
    },
    extraReducers:(builder) => {
        builder.addCase(action.getClothesListByType.fulfilled,(state,action)=>{
            console.log(`!!!${action.payload.type}`);
            if(action.payload?.type==="TOP"){
                state.clothesTop = [...action.payload.response];
            }else if(action.payload?.type==="BOTTOM"){
                state.clothesBottom = [...action.payload.response];
            }else if(action.payload?.type==="SHOE"){
                state.clothesShoe = [...action.payload.response];
            }else if(action.payload?.type==="ACCESSORY"){
                state.clothesAccessory = [...action.payload.response];
            }else{
                // all
                state.clothesAll = [...action.payload.response];
            }

            state.clothesListByType = [...action.payload.response];

            console.log(state.clothesTop.length);
        })
        builder.addCase(action.getClothInfo.fulfilled, (state, action) => {
            //옷 특정 정보 결과
            state.clothInfo=action.payload;
        })
        builder.addCase(action.saveClothes.fulfilled, (state, action) => {

            //옷등록하고, 새로고침되면 all 옷들을 다 불러올텐데 구지 여기서 처리해줘야할까라는 의문
            //여기서 처리는 전체 옷 리스트에 추가된 옷을 넣어줘야 하냐이다.saveClothes
            if(state.clothRegistOk===true)state.clothRegistOk=false;
            else state.clothRegistOk=true;
        })
        builder.addCase(action.deleteClothInfo.fulfilled, (state, action) => {
            //옷 삭제하고 리스트에서 삭제하기
            if(state.clothRegistOk===true)state.clothRegistOk=false;
            else state.clothRegistOk=true;

        })
        builder.addCase(action.updateClothInfo.fulfilled, (state, action) => {
            //옷 수정하고 alert
            Swal.fire({
                icon: 'success',
                title: '수정 완료',
                text: '옷이 성공적으로 수정되었습니다.',
                confirmButtonColor: '#4570F5',
            })

        })
        builder.addCase(action.OOTDSave.fulfilled, (state, action) => {
            //ootd 저장
            if(action.payload.order==1){
                state.OOTD1 = action.payload;
            }else{
                state.OOTD2 = action.payload;
            }

            Swal.fire({
                icon: 'success',
                title: '등록 완료',
                text: 'OOTD를 성공적으로 등록하였습니다.',
                confirmButtonColor: '#4570F5',
            })

        })

        builder.addCase(action.OOTDList.fulfilled, (state, action) => {

            //옷장 1개씩 돔
            console.log(action.payload);
            for(let i=0;i<action.payload.length;i++){
                
                if(action.payload.ootdId===1){
                    state.clothesOOTDTop_1 = action.payload.tops;
                    state.clothesOOTDBottom_1 = action.payload.bottoms;
                    state.clothesOOTDShoe_1 = action.payload.shoes;
                    state.clothesOOTDAccessory1_1 = action.payload.accessories1;
                    state.clothesOOTDAccessory2_1 = action.payload.accessories2;
                    state.clothesOOTDAccessory3_1 = action.payload.accessories3;
                }

                else if(action.payload.ootdId===1){
                    state.clothesOOTDTop_2 = action.payload.tops;
                    state.clothesOOTDBottom_2 = action.payload.bottoms;
                    state.clothesOOTDShoe_2 = action.payload.shoes;
                    state.clothesOOTDAccessory1_2 = action.payload.accessories1;
                    state.clothesOOTDAccessory2_2 = action.payload.accessories2;
                    state.clothesOOTDAccessory3_2 = action.payload.accessories3;
                }
            }

            console.log(state.clothesOOTDTop_1);
            console.log(state.clothesOOTDTop_2);
          
            

        })


    }
});

export let {changeModalOpen, changeMode,changeClothesType,changePage, changeClothesId, changeClothesLink} = ClosetSlice.actions;
export default ClosetSlice.reducer;