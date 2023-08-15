import React, { useEffect, useState } from 'react';

//css
import FeedDetailStyle from "./FeedDetail.module.css";
import styled from "styled-components";

//컴포넌트
import FeedSlot from "./FeedSlot";

//slick import
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// alert창
import Swal from "sweetalert2";

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {action_feed, changeFollow, changeDetailModalOpen, calTotalFeedLikes} from "../../../store/FeedSlice";

const FeedDetail = (props) => {

    console.log(props.feedId);

    //redux 관리
    let state = useSelector((state:any)=>state.feed);
    let dispatch = useDispatch();

    // 유저 정보
    const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));

    // 댓글인풋
    const [commentInput, setCommentInput] = useState<string>("");

    //수정모드 감지
    const [updateMode, setUpdateMode] = useState<boolean>(false);

    // 수정 인풋
    const [updateInput, setUpdateInput] = useState<string>("");

    // 슬라이드 설정
    const settings = {
        dots:true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    // 댓글 타입
    // main은 주 댓글 sub는 대댓글
    interface comment{
        mainCmtNo:number,
        subCmtNo?:number,
        dateTime:string,
        id:string,
        nickname:string,
        profile?:string,
        content:string,
    }




    //개인 like 표시에 따른 요청
    function likeOn(type, status){
        //state.detailObjLikes.lovely

        if(status===0){
            dispatch(action_feed.feedLike({feedId:props.feedId, userId:loginUser.id, type:type}));
        }else{
            dispatch(action_feed.deleteLike({feedId:props.feedId, userId:loginUser.id, type:type}));
        }
    }

    //댓글 등록 
    function addComment(){
        dispatch(action_feed.addComment({
            userId:loginUser.id,
            feedId:state.detailObj.feedId,
            parentId:null,
            content:commentInput,
        }))

        setCommentInput("");
    }

    // 엔터 쳐도 댓글 등록
    function activeEnter(e){
        if(e.key==="Enter"){
            addComment();
        }
    }


    //피드 삭제 함수
    function deleteFeed(feedId){
        Swal.fire({
            icon: "question",
            title: "삭제",
            text: `삭제 하시겠습니까??`,
            showCancelButton: true,
            confirmButtonText: "삭제",
            cancelButtonText: "취소",
            confirmButtonColor:'#4570F5',
            customClass: {
                confirmButton: FeedDetailStyle.confirmButton, // 모듈화된 CSS 파일에 정의된 클래스 이름을 사용합니다.
                cancelButton: FeedDetailStyle.cancelButton // 모듈화된 CSS 파일에 정의된 클래스 이름을 사용합니다.
              }
        }).then((res) => {
            if (res.isConfirmed) {
                dispatch(action_feed.deleteFeed(feedId));
            }
            else{
                
            }
        });
    }

    useEffect(()=>{
        // 내 좋아요 기록
        dispatch(action_feed.getFeedLikeOnMe({userId:loginUser.id, feedId:props.feedId}));

        // 전체 피드 가져옴 (갯수가 있어서)
        let data = {size:0, page:0};
        dispatch(action_feed.getFeedTotalList(data));
        
    },[state.likeOk, state.totalDetailObjLikes])

    useEffect(()=>{
        // 전체 피드 가져오면 그 안에 like 만 추출해서 계산
        dispatch(calTotalFeedLikes());
    },[state.feedTotalList])

    useEffect(()=>{
        // 댓글 가져오기
        dispatch(action_feed.getComment(props.feedId));
    },[state.addCommentOk, state.totalDetailObjLikes])

    console.log(`state.detailObjLikes ${state.detailObjLikes?.lovelyType}`);
    console.log(state.totalDetailObjLikes);

    return(
        <div className={`${FeedDetailStyle.container}`}>
            {/* 왼쪽 페이지 */}
            <div className={`${FeedDetailStyle.left}`}>
                <div className={`${FeedDetailStyle.card}`}>
                    {/* header */}
                    <div className={`${FeedDetailStyle.header}`}>
                        {/* 왼쪽 : 프로필 사진 */}
                        <div className={`${FeedDetailStyle.profile}`}>
                            <div className={`${FeedDetailStyle.profileCircle_G}`}>
                                <img src={process.env.PUBLIC_URL+`/img/user/profileImg.png`}></img>
                            </div>
                                            
                        </div>
                        {/* 중앙 */}
                        <div className={`${FeedDetailStyle.content}`}>
                            {/* 닉네임*/}
                            <div>
                                <p>{state.detailObj?.userNickname}</p>
                            </div>
                        </div>

                        {/* 우측 : 팔로우 언팔로우 & 신고버튼 */}
                        <div className={`${FeedDetailStyle.btns}`}>
                            {state.isFollow?<div><button>Unfollow</button></div>:<div><button>Follow</button></div>}  
                            <div className={`${FeedDetailStyle.alarmBtn}`}><img src={process.env.PUBLIC_URL+`/img/feed/alarm.png`}/></div>
                        </div>
                    </div>

                    {/* image */}
                    <div className={`${FeedDetailStyle.image}`}>
                        {//detailObj
                            <StyledSlider {...settings}>
                            {/* public img는 절대 경로로 가져와야 함 */}
                            {
                                state.detailObj?.photoResponseDtoList?.map((onePhoto)=>{
                                    return(
                                        <div className={`${FeedDetailStyle.slide}`}>
                                            <img src={onePhoto.link}/>
                                        </div>
                                    );
                                })
                            }
                        </StyledSlider>
                        }
                    </div>

                    {/* content */}
                    <div className={`${FeedDetailStyle.content}`}>
                        {state.detailObj?.feedContent}
                    </div>

                    {/* hashtag */}
                    <div className={`${FeedDetailStyle.hashtag}`}>
                        {
                            state.detailObj?.photoResponseDtoList?.map((onePicture)=>{
                                return(
                                    onePicture.hashtagList?.map((oneHash, idxHash)=>{
                                        return <button key={idxHash}>#{oneHash}</button>
                                    })
                                );
                            })
                        }
                    </div>

                    {/* comment, count, button */}
                    <div className={`${FeedDetailStyle.footer}`}>
                        {
                            loginUser.id===state.detailObj?.userId?
                            <div className={`${FeedDetailStyle.feedBtns}`}>
                                <button>수정</button>
                                <button onClick={()=>deleteFeed(state.detailObj?.feedId)}>삭제</button>
                            </div>:null
                        }
                    </div>

                    {/* 날짜 */}
                    <div className={`${FeedDetailStyle.date}`}>23.07.19 09:00</div>
                </div>
            </div>

            {/* 오른쪽 페이지 */}
            <div className={`${FeedDetailStyle.right}`}>
                {/* 유저반응 / x 표시 */}
                <div className={`${FeedDetailStyle.rightHeader}`}>
                    <p>유저 반응</p>
                    <img src={process.env.PUBLIC_URL+`/img/feed/closeBtn.png`} onClick={async()=>{dispatch(changeDetailModalOpen(false))}}/>
                </div>

                {/* 좋아요 4가지 - 0과 1 구분하는 거 다시하고, 좋아요 저장 삭제도 구현해야함 */}
                {/* state.totalDetailObjLikes?.lovely */}
                <div className={`${FeedDetailStyle.likeBtns}`}>
                    {state.detailObjLikes?.lovelyType!==null?<button onClick={()=>{likeOn("LOVELY", 1)}} className={`${FeedDetailStyle.lovelyOn}`}>Lovely ({state.totalDetailObjLikes?.lovely})</button>:<button onClick={()=>{likeOn("LOVELY", 0)}} className={`${FeedDetailStyle.lovelyOff}`}>Lovely ({state.totalDetailObjLikes?.lovely})</button>}
                    {state.detailObjLikes?.naturalType!==null?<button onClick={()=>{likeOn("NATURAL", 1)}} className={`${FeedDetailStyle.naturalOn}`}>Natural ({state.totalDetailObjLikes?.natural})</button>:<button onClick={()=>{likeOn("NATURAL", 0)}} className={`${FeedDetailStyle.naturalOff}`}>Natural ({state.totalDetailObjLikes?.natural})</button>}
                    {state.detailObjLikes?.modernType!==null?<button onClick={()=>{likeOn("MODERN", 1)}} className={`${FeedDetailStyle.modernOn}`}>Modern ({state.totalDetailObjLikes?.modern})</button>:<button onClick={()=>{likeOn("MODERN", 0)}} className={`${FeedDetailStyle.modernOff}`}>Modern ({state.totalDetailObjLikes?.modern})</button>}
                    {state.detailObjLikes?.sexyType!==null?<button onClick={()=>{likeOn("SEXY", 1)}} className={`${FeedDetailStyle.sexyOn}`}>Sexy ({state.totalDetailObjLikes?.sexy})</button>:<button onClick={()=>{likeOn("SEXY", 0)}} className={`${FeedDetailStyle.sexyOff}`}>Sexy ({state.totalDetailObjLikes?.sexy})</button>}
                </div>


                {/* 댓글 대댓글 */}
                <div className={`${FeedDetailStyle.comments}`}>
                    
                    {/* 댓글 상황 */}
                    <div className={`${FeedDetailStyle.commentCnt}`}>
                        <p>유저 댓글</p>
                        {/* <p>2개</p> */}
                    </div>

                    <div className={`${FeedDetailStyle.oneComment}`}>
                        {
                            // 주 댓글
                            state.commentList.map((one)=>{
                                return(
                                    <div>
                                        <div className={`${FeedDetailStyle.cmtLine}`}>
                                            <div className={`${FeedDetailStyle.userInfoWrapper}`}>
                                                <div className={`${FeedDetailStyle.userInfo}`}>
                                                    {/* 왼쪽 : 프로필 사진 */}
                                                    <div className={`${FeedDetailStyle.profile2}`}>
                                                        <div className={`${FeedDetailStyle.profileCircle_G2}`}>
                                                            <img src={process.env.PUBLIC_URL+`/img/user/profileImg.png`}></img>
                                                        </div>
                                                        {/* 백에서 바꿔주면 nickName으로 고쳐야함 */}
                                                        <p style={{width:"100px"}}>{one.userNickname}</p>
                                                    </div>
                                                </div>

                                                {/* 댓글 본문 */}
                                              
                                                    <div className={`${FeedDetailStyle.cmtContent}`}>
                                                        {one.content}
                                                    </div>
                                                
                                            </div>

                                            
                                            <div className={`${FeedDetailStyle.etcBtns}`}>
                                                {/* 답글 달기 보기 */}
                                                {/* <div className={`${FeedDetailStyle.reply}`}>
                                                    <button>답글 달기</button>
                                                    <button>답글 보기</button>
                                                </div> */}

                                                {/* 수정 삭제 시간 */}
                                                <div className={`${FeedDetailStyle.btnAndDate}`}>
                                                    <div className={`${FeedDetailStyle.btnDate}`}>
                                                        {one.modifiedDate?.split("T")[0].split("-")[0][2]}{one.modifiedDate?.split("T")[0].split("-")[0][3]}.
                                                        {one.modifiedDate?.split("T")[0].split("-")[1]}.
                                                        {one.modifiedDate?.split("T")[0].split("-")[2]} &nbsp;   
                                                        {/* {Number(one.modifiedDate?.split("T")[1].split(":")[0])<12?"오전 ":"오후 "} */}
                                                        {one.modifiedDate?.split("T")[1].split(":")[0]}:
                                                        {one.modifiedDate?.split("T")[1].split(":")[1]}   
                                                    </div>

                                                    <div className={`${FeedDetailStyle.rightBtns}`}>
                                                        {/* <button onClick={()=>{updateComment(one.content)}}>수정</button> */}
                                                        <button onClick={()=>dispatch(action_feed.deleteComment(one.commentId))}>삭제</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 대댓글 map */}
                                        {/* <div className={`${FeedDetailStyle.replyTotal}`}>
                                            {
                                                subCmt?.map((oneReple)=>{
                                                    return(
                                                        oneReple.mainCmtNo===one.mainCmtNo?
                                                        <div className={`${FeedDetailStyle.oneReplyTotal}`}>
                                                            <div className={`${FeedDetailStyle.oneReplyStyle}`}>
                                                 */}
                                                                {/* 대댓글 유저 정보 */}
                                                                {/* <div className={`${FeedDetailStyle.profile3}`}> */}
                                                                    {/* 왼쪽 : 프로필 사진 */}
                                                                    {/* <div className={`${FeedDetailStyle.profile3}`}>
                                                                        <div className={`${FeedDetailStyle.profileCircle_G3}`}>
                                                                            <img src={process.env.PUBLIC_URL+`/img/user/profileImg.png`}></img>
                                                                        </div>
                                                                        <p>{one.nickname}</p>
                                                                    </div>
                                                                </div> */}

                                                                {/* 대댓글 내용 */}
                                                                {/* <div className={`${FeedDetailStyle.replyContent}`}>{oneReple.content}</div>
                                                            </div> */}

                                                            {/* 수정 삭제 시간 */}
                                                            {/* <div className={`${FeedDetailStyle.repleBtnsAndTime}`}>
                                                                <div className={`${FeedDetailStyle.repleBtns}`}>
                                                                    <button>수정</button>
                                                                    <button>삭제</button>
                                                                </div>

                                                                <p>{oneReple.dateTime}</p>
                                                                
                                                            </div>
                                                        </div>:null
                                                    );
                                                })
                                            }
                                                        
                                        </div> */}

                                        
                                    </div>
                                    
                                );
                            })
                        }

                    </div>
                    {/* 댓글쓰는 칸 */}
                    <div className={`${FeedDetailStyle.writeCommentWrapper}`}>
                        <div className={`${FeedDetailStyle.writeComment}`}>
                            <input value={commentInput} onChange={(e)=>{setCommentInput(e.target.value)}} onKeyDown={(e)=>{activeEnter(e)}}/>
                            {/* {userId, feedId, parentId, content} */}
                            <button onClick={()=>{addComment()}} >게시</button>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default FeedDetail;


const StyledSlider = styled(Slider)`

  .slick-prev {
    z-index: 1;
    left: 30px;
    top: 50%;
  }

  .slick-next {
    right: 40px;
    top: 50%;
  }

  .slick-prev:before,
  .slick-next:before {
    font-size: 30px;
    opacity: 0.5;
    color: white;
  }

  .slick-dots {
    display: flex;
    justify-content: center;
    bottom: 50px;
    color: black;

    li button:before {
      color: black;
    }

    li.slick-active button:before {
      color: white;
    }
  }
`;