import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// alert창
import Swal from "sweetalert2";

import {CheckToken} from "../hook/UserApi"

// axios
export const action = {

    // 새로운 피드 등록
    addFeed : createAsyncThunk("FeedSlice/addFeed", async(newFeed, thunkAPI)=>{
        const token = await CheckToken();
        await axios.post(`${process.env.REACT_APP_SERVER}/api/feed`, newFeed, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization" : token
        }
        
      }).then((res)=>{
        Swal.fire({
            icon: 'success',
            title: '등록 완료',
            text: '피드가 성공적으로 등록되었습니다.',
            confirmButtonColor: '#4570F5',
        })

        // return res.data;
        return newFeed;
      }).catch((e)=>{console.log(e)})
    }),


    //피드 전체 리스트 가져오기 O
    getFeedTotalList : createAsyncThunk("FeedSlice/getFeedList", async({size, page}, thunkAPI)=>{
        try{
            const token = await CheckToken();
            const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/feed?size=${size}&page=${page}`,{
                headers:{"Authorization":token}
            });

            console.log(response.data);
            return response.data;
        } catch(e){
            console.log(e);
            throw e;
        }
    }),

    //피드 하나 지우기 O
    deleteFeed : createAsyncThunk("FeedSlice/deleteFeed", async(feedId, thunkAPI)=>{
       
        try{
            const token = await CheckToken();
            const response = await axios.delete(`${process.env.REACT_APP_SERVER}/api/feed/${feedId}`,{
                headers:{"Authorization":token}
            });

            return feedId;
        } catch(e){
            console.log(e);
            throw e;
        }
    }),


    //특정 피드 정보 불러오기 X
    readFeed : createAsyncThunk("FeedSlice/readFeed", async(feedId, thunkAPI)=>{
       
        try{
            const token = await CheckToken();
            const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/feed/${feedId}`,{
                headers:{"Authorization":token}
            });
            
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
            const token = await CheckToken();
            // http://localhost:8081/api/feedlike?userId=1&feedId=3
            //sexyType:SEXY, lovelyType:null 등으로 보여짐
            const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/feedlike?userId=${userId}&feedId=${feedId}`,{
                headers:{"Authorization":token}
            });

            console.log(`내가 조아한다고!! ${response.data}`);
            return response.data;
        } catch(e){
            console.log(e);
            throw e;
        }
    }),


    // 피드 좋아요 등록 post O
    feedLike : createAsyncThunk("FeedSlice/feedLike", async({feedId, userId, type}:registLike, thunkAPI)=>{
        console.log(`post ${feedId} ${userId} ${type}`);
        const token = await CheckToken();
        await axios.post(`${process.env.REACT_APP_SERVER}/api/feedlike`, {feedId, userId, type}, {
        headers: {
          "Authorization" : token,
        }
        
      }).then((res)=>{
        return type;
      }).catch((e)=>{console.log(e)})
    }),


    // 피드 좋아요 취소 delete O
    deleteLike : createAsyncThunk("FeedSlice/feedNoLike", async({feedId, userId, type}:registLike, thunkAPI)=>{
       console.log(`delete ${feedId} ${userId} ${type}`);
        try{
            const token = await CheckToken();
            const response = await axios.delete(`${process.env.REACT_APP_SERVER}/api/feedlike`,{
                headers:{"Authorization":token},
                data : {"feedId":feedId, "userId":userId, "type":type},
            });
            
            return type;
        } catch(e){
            console.log(e);
            throw e;
        }
    }),


    //댓글 읽어들이기 O
    getComment : createAsyncThunk("FeedSlice/getComment", async(feedId, thunkAPI)=>{
        console.log(`${feedId}`);
        try{
            const token = await CheckToken();

            const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/comment/${feedId}?size=20&page=0`,{
                headers:{"Authorization":token}
            });

            return response.data;
        } catch(e){
            console.log(e);
            throw e;
        }
    }),

    //댓글 수정 X
    updateComment : createAsyncThunk("FeedSlice/updateComment", async({commentId, comment}, thunkAPI)=>{
        console.log(`${commentId}`);
        try{
            const token = await CheckToken();

            const response = await axios.put(`${process.env.REACT_APP_SERVER}/api/comment/${commentId}`,{comment},{
                headers:{"Authorization":token}
            });

            return response.data;
        } catch(e){
            console.log(e);
            throw e;
        }
    }),

    // 댓글 삭제 O
    deleteComment : createAsyncThunk("FeedSlice/deleteComment", async(commentId, thunkAPI)=>{
        try{
            const token = await CheckToken();

            const response = await axios.delete(`${process.env.REACT_APP_SERVER}/api/comment/${commentId}`,{
                headers:{"Authorization":token}
            });

            return commentId;
        } catch(e){
            console.log(e);
            throw e;
        }
    }),

    //댓글 등록 O
    addComment : createAsyncThunk("FeedSlice/addComment", async({userId, feedId, parentId, content}, thunkAPI)=>{
        try{
            const token = await CheckToken();

            const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/comment`,{userId, feedId, parentId, content},{
                headers:{"Authorization":token}
            });

            return response.data;
        } catch(e){
            console.log(e);
            throw e;
        }
    }),


    // 피드 해시태그 검색
    //querystring으로 offset,page, hashtag 값 넘겨주기, hashtag 값은 중복해서 넘기기 가능
    // ex)?hashtag=신발&hashtag=조던&size=2&page=0
    searchHash : createAsyncThunk("FeedSlice/searchHash", async({hashtag, size, page}:search, thunkAPI)=>{
        try{
            const token = await CheckToken();
            console.log(`${process.env.REACT_APP_SERVER}/api/feed/hashtag?${hashtag}`);

            const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/feed/hashtag?${hashtag}`,{
                headers:{"Authorization":token}
            });

            return response.data;
        } catch(e){
            console.log(e);
            throw e;
        }
    }),

}


//검색 폼
interface search{
    hashtag:string, //해시태그 리스트형이 아닌 정제한 줄줄이 스테이트먼트
    size:number,
    page:number
}


// 피드 좋아요 취소 폼
interface registLike{
    feedId : number,
    userId : number,
    type : string
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

// 피드 내가 누른 좋아요 현황
interface specificFeedLikes{
    feedLikeCountResponseDto:{
        natural:string|null,
        lovely:string|null,
        sexy:string|null,
        modern:string|null
    }
}

// 피드 전체 좋아요 수
interface specificFeedTotalLikes{
    feedLikeCountResponseDto:{
        natural:number,
        lovely:number,
        sexy:number,
        modern:number
    }
}
interface specificFeed{
    content: {
            userId: number,
            userNickname:string,
            feedId: number,
            feedContent: string,
            commentCount : number,
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
interface comment{
    "commentId": number,
    "userId": number,
    "feedId": number,
    "parentCommentId": number|null, //대댓글일 때만 작성
    "content": string
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
    totalDetailObjLikes : specificFeedTotalLikes|null,
    modifyModalOpen:boolean,
    modifyHashtagList:string[],
    commentList: comment[],
    feedAddOk:boolean,
    likeOk:boolean,
    addCommentOk:boolean
}

// 초기화
//isFollow : 팔로우 여부
//sortType : 1 all 2 following
//createType : 1 사진추가 2 마무리
// detailObjLikes : 나만 누른 라이크 갯수 정보
// totalDetailObjLikes : 모든 사람이 누른 라이크 갯수 정보
// feedTotalObj : 피드 정보를 받아오면 오브젝트 형태로 들어감 (주로 content를 씀)
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
    modifyHashtagList:[],
    commentList :[], //댓글 리스트
    feedAddOk:false, //피드 등록 시 ok라는 신호를 보내는 용도
    likeOk:false,
    addCommentOk:false,
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
                    console.log(`여기야!! ${i}`);
                    break;
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
            state.totalDetailObjLikes = state.detailObj?.feedLikeCountResponseDto;
            console.log(state.totalDetailObjLikes);
        }
    },
    extraReducers:(builder) => {
        builder.addCase(action.addFeed.fulfilled,(state,action)=>{
            state.createModalOpen=false;
            state.feedAddOk = true;
        })

        builder.addCase(action.getFeedTotalList.fulfilled,(state,action)=>{
            state.feedTotalObj = action.payload;
        })

        builder.addCase(action.deleteFeed.fulfilled,(state,action)=>{
            Swal.fire({
                icon: 'success',
                title: '삭제 완료',
                text: '피드가 삭제되었습니다.',
                confirmButtonColor: '#4570F5',
            })

            console.log(action.payload);

            // 리스트에서 제거
            for(let i=0;i<state.feedTotalObj?.content.length;i++){
                if(state.feedTotalObj?.content[i].feedId==action.payload){
                    state.feedTotalObj?.content.splice(i,1);
                    console.log(i);
                }
            }
        })

        builder.addCase(action.getComment.fulfilled,(state,action)=>{
            state.commentList=action.payload.content;
        })

        builder.addCase(action.deleteComment.fulfilled,(state,action)=>{

            //리스트에서 해당 댓글 삭제
            console.log(action.payload);
            for(let i=0;i<state.commentList.length;i++){
                if(state.commentList[i].commentId == action.payload){
                    console.log(i);
                    state.commentList.splice(i,1);
                    break;
                }
            }

            Swal.fire({
                icon: 'success',
                title: '삭제 완료',
                text: '댓글이 삭제되었습니다.',
                confirmButtonColor: '#4570F5',
            })
        })

        //댓글달기
        builder.addCase(action.addComment.fulfilled,(state,action)=>{
            //commentPK값 준다.
            console.log(action.payload);
            if(state.addCommentOk===true) state.addCommentOk=false;
            else state.addCommentOk=true;
        })


        builder.addCase(action.getFeedLikeOnMe.fulfilled,(state,action)=>{
            state.detailObjLikes = action.payload; //내가 누른 좋아요 정보
        })

        builder.addCase(action.feedLike.fulfilled,(state,action)=>{
            if(state.likeOk===true) state.likeOk = false;
            else state.likeOk = true;
        })

        builder.addCase(action.deleteLike.fulfilled,(state,action)=>{
            if(state.likeOk===true) state.likeOk = false;
            else state.likeOk = true;
        })

        // 해시태그 검색 
        builder.addCase(action.searchHash.fulfilled,(state,action)=>{
            state.feedTotalObj = action.payload;
            console.log(state.feedTotalObj);
        })

       
    }
});

export let {calTotalFeedLikes, changeModifyModalOpen,changeDetailFeedId,changeFollow, changeDetailModalOpen, changeSortType, changeCreateModalOpen, changeCreateType, changeDeclarationModalOpen} = FeedSlice.actions;
export default FeedSlice.reducer;