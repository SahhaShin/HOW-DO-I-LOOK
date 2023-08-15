import React, { useState, useEffect } from 'react';

//css
import feedSlotStyle from './FeedSlot.module.css';
import styled from "styled-components";

//slick import
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {action_feed, changeModifyModalOpen, changeDetailFeedId, changeFollow, changeDetailModalOpen,changeDeclarationModalOpen, changeFollowingCheckToTrue, changeFollowingCheckToFalse} from "../../../store/FeedSlice";
import {action_follow} from "../../../store/FollowSlice";

// alert창
import Swal from "sweetalert2";

const FeedSlot = () => {
    //redux 관리
    let state = useSelector((state:any)=>state.feed);
    let dispatch = useDispatch();

    //유저정보
    const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));

    // 슬라이드 설정
    const settings = {
        dots:true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    };


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
                confirmButton: feedSlotStyle.confirmButton, // 모듈화된 CSS 파일에 정의된 클래스 이름을 사용합니다.
                cancelButton: feedSlotStyle.cancelButton // 모듈화된 CSS 파일에 정의된 클래스 이름을 사용합니다.
              }
        }).then((res) => {
            if (res.isConfirmed) {
                dispatch(action_feed.deleteFeed(feedId));
            }
            else{
                
            }
        });
    }

    // 팔로잉 데이터
    const [followingData, setFollowingData] = useState({
        id: 0,
        targetId: 0,
        nickname: "",
        profileImg: ""
      });

    const changeFollowingData = (feed) => {
        console.log(feed)
    setFollowingData({
        id: loginUser.id,
        targetId: feed.userId,
        nickname: feed.userNickname,
        profileImg: feed.userProfileImg
    });
    };

    // 언팔로잉 데이터
    const [deleteFollowingData, setDeleteFollowingData] = useState({
        id: 0,
        targetId: 0,
        nickname: "",
        profileImg: ""
      });
    
      const changeDeleteFollowingData = (feed) => {
        console.log(feed)
        setDeleteFollowingData({
            id: loginUser.id,
            targetId: feed.userId,
            nickname: feed.userNickname,
            profileImg: feed.userProfileImg
        });
      };

    // 팔로우
    useEffect(
        () => {
        if (followingData.id === 0 || followingData.targetId === 0) return;

        dispatch(action_follow.follow(followingData));
        },
        [followingData]
    );

    // 팔로우 끊기
    useEffect(
        () => {
        if (deleteFollowingData.id === 0 || deleteFollowingData.targetId === 0)
            return;

        dispatch(action_follow.unfollow(deleteFollowingData));
        },
        [deleteFollowingData]
    );

    const changeFollowingCheckFalse = ((idx) => {
        console.log(idx)
        console.log(state.feedFollowingCheck)
        dispatch(changeFollowingCheckToFalse(idx));
        console.log(state.feedFollowingCheck);
    })

    const changeFollowingCheckTrue = ((idx) => {
        console.log(idx)
        console.log(state.feedFollowingCheck);
        dispatch(changeFollowingCheckToTrue(idx));
        console.log(state.feedFollowingCheck);
    })

    return(   
        <>
            {  state.feedTotalObj?.length!==0?
                state.feedTotalObj?.map((oneFeed, idx)=>{
                    if(state.feedMode === 2 && !state.feedFollowingCheck[idx]) {
                        return null;
                    }

                    if(state.feedMode === 3 && oneFeed.userId !== loginUser.id) {
                        return null;
                    }

                    return(
                        <div key={idx} className={`${feedSlotStyle.card}`}>
                            {/* header */}
                            <div className={`${feedSlotStyle.header}`}>
                                {/* 왼쪽 : 프로필 사진 -- 이미지 아직 저장 안함 */}
                                <div className={`${feedSlotStyle.profile}`}>
                                    <div className={`${feedSlotStyle.profileCircle_G}`}>
                                        <img src={loginUser.profileImg}></img>
                                    </div>
                                                    
                                </div>
                                {/* 중앙 */}
                                <div className={`${feedSlotStyle.content}`}>
                                    {/* 닉네임 */}
                                    <div>
                                        <p>{oneFeed.userNickname}</p>
                                    </div>
                                </div>
                                {/* 우측 : 팔로우 언팔로우 & 신고버튼 */}
                                <div className={`${feedSlotStyle.btns}`}>
                                    
                                    {oneFeed.userId === loginUser.id
                                    ?
                                    null
                                    :
                                    state.feedFollowingCheck[idx]?
                                    // state.feedTotalObj[idx].followingCheck?
                                    <div>
                                        <button onClick={async()=>{
                                            changeFollowingCheckFalse(idx);
                                            changeDeleteFollowingData(oneFeed)
                                            // dispatch(action_follow.followCheck(false))
                                            dispatch(action_follow.getMyFollowingList(loginUser.id));
                                        }}>Unfollow</button>
                                    </div>
                                    :
                                    <div>
                                        <button onClick={async()=>{
                                            changeFollowingCheckTrue(idx);
                                            changeFollowingData(oneFeed)
                                            // dispatch(changeFollow(true))
                                            dispatch(action_follow.getMyFollowingList(loginUser.id));
                                        }}>Follow</button>
                                    </div>
                                    }
                                    
                                    
                                    {/* {state.oneFeed.followingCheck?
                                    <div>
                                        <button onClick={async()=>{
                                            changeDeleteFollowingData(oneFeed)
                                            // dispatch(action_follow.followCheck(false))
                                            // dispatch(action_follow.getMyFollowingList(loginUser.id));
                                        }}>Unfollow</button>
                                    </div>
                                    :
                                    <div>
                                        <button onClick={async()=>{
                                            changeFollowingData(oneFeed)
                                            // dispatch(changeFollow(true))
                                            // dispatch(action_follow.getMyFollowingList(loginUser.id));
                                        }}>Follow</button>
                                    </div>}   */}
                                    <div onClick={()=>{dispatch(changeDeclarationModalOpen(true))}} className={`${feedSlotStyle.alarmBtn}`}><img src={process.env.PUBLIC_URL+`/img/feed/alarm.png`}/></div>
                                </div>
                            </div>

                            {/* image */}
                            <div className={`${feedSlotStyle.image}`}>
                                <StyledSlider {...settings}>
                                    {
                                        oneFeed.photoResponseDtoList?.map((onePhoto, idx)=>{
                                            return(
                                                <div key={idx} className={`${feedSlotStyle.slide}`}>
                                                    <img src={onePhoto.link}/>
                                                </div>
                                            );
                                        })
                                    }
                                </StyledSlider>
                            </div>

                            {/* content */}
                            <div className={`${feedSlotStyle.content}`}>
                                {oneFeed.feedContent}
                            </div>

                            {/* hashtag */}
                            <div className={`${feedSlotStyle.hashtag}`}>
                                {
                                    oneFeed.photoResponseDtoList?.map((dtoList, idx) => {
                                        return (
                                            <div key={idx} className={`${feedSlotStyle.onehash}`}>
                                                {dtoList.hashtagList?.map((oneHash, idx2) => (
                                                    <button key={idx2}>#{oneHash}</button>
                                                ))}
                                            </div>
                                        );
                                    })
                                }
                            </div>

                            {/* comment, count, button */}
                            <div className={`${feedSlotStyle.footer}`}>
                                <div className={`${feedSlotStyle.comment}`}>
                                    {/* 이 버튼을 누르면 댓글 창으로 이동 -> 특정 피드 아이디 전달 */}
                                    {/* dispatch(action.getFeedLikeOnMe({"userId":loginUser.id, "feedId":oneFeed.feedId})); 이거 제외 */}
                                    <img src={process.env.PUBLIC_URL+`/img/feed/comment.png`} onClick={async()=>{dispatch(changeDetailModalOpen(true)); dispatch(changeDetailFeedId(oneFeed.feedId));}}/>
                                    <p>{oneFeed.commentCount}</p>
                                </div>
                                {oneFeed.userId===loginUser.id?<div className={`${feedSlotStyle.feedBtns}`}>

                                    {/* 수정 기능 임시 폐쇄 */}
                                    {/* <button onClick={()=>{dispatch(changeModifyModalOpen(true));dispatch(changeDetailFeedId(oneFeed.feedId)); dispatch(action_feed.getFeedLikeOnMe({userId:oneFeed.userId,feedId:oneFeed.feedId}));}}>수정</button> */}
                                    <button onClick={()=>deleteFeed(oneFeed.feedId)}>삭제</button>
                                </div>:null}
                            </div>

                            {/* 날짜 */}
                            <div className={`${feedSlotStyle.date}`}>{oneFeed.feedCreatedDate.split("T")[0]} {oneFeed.feedCreatedDate.split("T")[1].split(".")[0]}</div>

                            {/* 구분선 */}
                            <div className={`${feedSlotStyle.hr}`}></div>
                        </div>
                    );
                }):<div className={`${feedSlotStyle.noresult}`}>검색 결과가 없습니다.</div>
                
            }
        </>     
    );
}


export default FeedSlot;

const StyledSlider = styled(Slider)`

  .slick-prev {
    z-index: 1;
    left: 30px;
    top: 200px;
  }

  .slick-next {
    right: 40px;
    top: 200px;
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
    bottom: 70px;
    color: black;

    li button:before {
      color: black;
    }

    li.slick-active button:before {
      color: white;
    }
  }
`;