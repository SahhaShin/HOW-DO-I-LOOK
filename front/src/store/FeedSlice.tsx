import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// alert창
import Swal from "sweetalert2";

// axios
export const action = {

    // 새로운 피드 등록 X : formdata에 아무것도 안들어옴 
    addFeed : createAsyncThunk("FeedSlice/addFeed", async(newFeed, thunkAPI)=>{
        console.log(newFeed);
        await axios.post(`${process.env.REACT_APP_SERVER}/api/feed`, newFeed, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
        
      }).then((res)=>{
        Swal.fire({
            icon: 'success',
            title: '등록 완료',
            text: '피드가 성공적으로 등록되었습니다.',
            confirmButtonColor: '#4570F5',
        })

        return res.data;
      }).catch((e)=>{console.log(e)})
    }),


    //피드 전체 리스트 가져오기 O
    getFeedTotalList : createAsyncThunk("FeedSlice/getFeedList", async({size, page}, thunkAPI)=>{
        
        try{
            console.log(`${size} ${page}`);
            const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/feed?size=${size}&page=${page}`);
            return response.data;
        } catch(e){
            console.log(e);
            throw e;
        }
    }),

    //피드 하나 지우기 O
    deleteFeed : createAsyncThunk("FeedSlice/deleteFeed", async(feedId, thunkAPI)=>{
       
        try{
            const response = await axios.delete(`${process.env.REACT_APP_SERVER}/api/feed/${feedId}`);
            console.log(`${process.env.REACT_APP_SERVER}/api/feed/${feedId}`);
            return response.data;
        } catch(e){
            console.log(e);
            throw e;
        }
    }),


    //특정 피드 정보 불러오기 X
    readFeed : createAsyncThunk("FeedSlice/readFeed", async(feedId, thunkAPI)=>{
       
        try{
            const response = await axios.delete(`${process.env.REACT_APP_SERVER}/api/feed/${feedId}`);
            console.log(`${process.env.REACT_APP_SERVER}/api/feed/${feedId}`);
            return response.data;
        } catch(e){
            console.log(e);
            throw e;
        }
    }),

    //내가 피드를 눌렀을 때 내가 누른 좋아요 상황을 가져온다. X
    getFeedLikeOnMe : createAsyncThunk("FeedSlice/getFeedLikeOnMe", async({userId, feedId}, thunkAPI)=>{
        console.log(`${userId} ${feedId}`);
        try{
            
            // http://localhost:8081/api/feedlike?userId=1&feedId=3
            const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/feedlike?userId=${userId}&feedId=${feedId}`);
            return response.data;
        } catch(e){
            console.log(e);
            throw e;
        }
    }),

}

//새로운 사진 등록 시 폼
interface newFeed{
    feedSaveRequestDto:{
        userId:number,
        content: string,
        photoSaveRequestDtoList:[
            {
                hashtagList:string[]
            },
        ]
    },
    s3upload:File[],
}

interface specificFeedLikes{
    feedLikeCountResponseDto:{
        natural:string|null,
        lovely:string|null,
        sexy:string|null,
        modern:string|null
    }
}
interface specificFeed{
    content: {
            userId: number,
            feedId: number,
            feedContent: string,
            feedCreatedDate: string,
            feedUpdateDate: string,
            photoResponseDtoList: [
                {
                    id: number,
                    link: string,
                    hashtagList: string[]
                },

            ],
            feedLikeCountResponseDto: {
                natural: number,
                modern: number,
                lovely: number,
                sexy: number
            }
        }
}
interface totalFeed{
    content: [
        {
            userId: number,
            feedId: number,
            feedContent: string,
            feedCreatedDate: string,
            feedUpdateDate: string,
            photoResponseDtoList: [
                {
                    id: number,
                    link: string,
                    hashtagList: string[]
                },

            ],
            feedLikeCountResponseDto: {
                natural: number,
                modern: number,
                lovely: number,
                sexy: number
            }
        }
    ],
    pageable: {
        sort: {
            empty: boolean,
            unsorted : boolean,
            sorted: boolean
        },
        offset: number,
        pageSize: number,
        pageNumber: number,
        paged: boolean,
        unpaged: boolean
    },
    last: boolean,
    totalElements: number,
    totalPages: number,
    size: number,
    number: number,
    sort: {
        empty: boolean,
        unsorted: boolean,
        sorted: boolean
    },
    first: boolean,
    numberOfElements: number,
    empty: boolean
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
    feedTotalObj:totalFeed|null,
    detailFeedId : number,
    detailObj:specificFeed|null, //특정 피드 정보
    detailObjLikes:specificFeedLikes|null,
    totalDetailObjLikes : specificFeedLikes|null,
    modifyModalOpen:boolean,
    modifyHashtagList:string[],
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
    feedTotalObj:null,
    detailFeedId:0,
    detailObj:null,
    detailObjLikes:null,
    totalDetailObjLikes:null,
    modifyModalOpen:false,
    modifyHashtagList:[]
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
        },
        changeDetailFeedId(state, action){
            state.detailFeedId=action.payload;

            //세부피드 오브젝트도 채워준다. -> 이미 피드창 들어올 때 리스트는 채워져있음
            for(let i=0;i<state.feedTotalObj?.content.length;i++){
                if(state.feedTotalObj?.content[i].feedId===action.payload){
                    state.detailObj = state.feedTotalObj?.content[i];
                }
            }
        },
        changeModifyModalOpen(state, action){
            state.modifyModalOpen=action.payload;
        },
        setModifyHashtagList(state, action){
            //피드 순서대로 붙은 해시태그 리스트가 저장되어 있음 [["하늘", "바다"], ["노인"], ["새"]]
            for(let i=0;i<state.detailObj?.photoResponseDtoList.length;i++){
                state.modifyHashtagList.push(state.detailObj?.photoResponseDtoList[i]);
            }
        },
        calTotalFeedLikes(state){
            state.totalDetailObjLikes = state.detailObj.feedLikeCountResponseDto;
            console.log(state.totalDetailObjLikes);
        }
    },
    extraReducers:(builder) => {
        builder.addCase(action.addFeed.fulfilled,(state,action)=>{
            console.log(`11 ${action.payload}`);
            state.createModalOpen=false;
        })

        builder.addCase(action.getFeedTotalList.fulfilled,(state,action)=>{
            state.feedTotalObj = action.payload;
        })

        builder.addCase(action.deleteFeed.fulfilled,(state,action)=>{
            Swal.fire({
                icon: 'success',
                title: '삭제 완료',
                text: '피드가 성공적으로 삭제되었습니다.',
                confirmButtonColor: '#4570F5',
            })
        })

        builder.addCase(action.getFeedLikeOnMe.fulfilled,(state,action)=>{
            state.detailObjLikes = action.payload; //내가 누른 좋아요 정보
            console.log(state.detailObjLikes);
        })
    }
});

export let {calTotalFeedLikes, changeModifyModalOpen,changeDetailFeedId,changeFollow, changeDetailModalOpen, changeSortType, changeCreateModalOpen, changeCreateType, changeDeclarationModalOpen} = FeedSlice.actions;
export default FeedSlice.reducer;