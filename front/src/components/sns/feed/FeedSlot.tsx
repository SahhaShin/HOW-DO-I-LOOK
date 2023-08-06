import React, { useState } from 'react';

//css
import feedSlotStyle from './FeedSlot.module.css';
import styled from "styled-components";

//slick import
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {changeFollow, changeDetailModalOpen,changeDeclarationModalOpen} from "../../../store/FeedSlice";

const FeedSlot = () => {
    //redux 관리
    let state = useSelector((state:any)=>state.feed);
    let dispatch = useDispatch();

    // 유저 정보
    const nickname:string = "user3";

    // 슬라이드 설정
    const settings = {
        dots:true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    // 몇개의 피드가 있는가?
    let [feedCount, setFeedCount] = useState<any|null>([1,2,3,4,5,6,7,8,9,10]);

    return(   
        <>
            {
                state.feedTotalList?.map((oneFeed)=>{
                    console.log(`야호 !! ${oneFeed}`);
                    return(
                        <div className={`${feedSlotStyle.card}`}>
                            {/* header */}
                            <div className={`${feedSlotStyle.header}`}>
                                {/* 왼쪽 : 프로필 사진 -- 이미지 아직 저장 안함 */}
                                <div className={`${feedSlotStyle.profile}`}>
                                    <div className={`${feedSlotStyle.profileCircle_G}`}>
                                        <img src={process.env.PUBLIC_URL+`/img/user/profileImg.png`}></img>
                                    </div>
                                                    
                                </div>
                                {/* 중앙 */}
                                <div className={`${feedSlotStyle.content}`}>
                                    {/* 닉네임 -- 현재는 아이디로 대체 */}
                                    <div>
                                        <p>{oneFeed.userId}</p>
                                    </div>
                                </div>

                                {/* 우측 : 팔로우 언팔로우 & 신고버튼 */}
                                <div className={`${feedSlotStyle.btns}`}>
                                    {state.isFollow?<div><button onClick={async()=>{dispatch(changeFollow(false))}}>Unfollow</button></div>:<div><button onClick={async()=>{dispatch(changeFollow(true))}}>Follow</button></div>}  
                                    <div onClick={()=>{dispatch(changeDeclarationModalOpen(true))}} className={`${feedSlotStyle.alarmBtn}`}><img src={process.env.PUBLIC_URL+`/img/feed/alarm.png`}/></div>
                                </div>
                            </div>

                            {/* image */}
                            <div className={`${feedSlotStyle.image}`}>
                                <StyledSlider {...settings}>
                                    {

                                    }
                                    {/* public img는 절대 경로로 가져와야 함 */}
                                    <div className={`${feedSlotStyle.slide}`}>
                                        <img src={process.env.PUBLIC_URL+`/img/feed/fasion1.jpg`}/>
                                    </div>

                                    <div className={`${feedSlotStyle.slide}`}>
                                        <img src={process.env.PUBLIC_URL+`/img/feed/fasion2.jpg`}/>
                                    </div>

                                </StyledSlider>
                            </div>

                            {/* content */}
                            <div className={`${feedSlotStyle.content}`}>
                                햇볕에 타는 게 싫어 ㅠㅠ
                            </div>

                            {/* hashtag */}
                            <div className={`${feedSlotStyle.hashtag}`}>
                                <button>#여름</button>
                                <button>#해변</button>
                            </div>

                            {/* comment, count, button */}
                            <div className={`${feedSlotStyle.footer}`}>
                                <div className={`${feedSlotStyle.comment}`}>
                                    <img src={process.env.PUBLIC_URL+`/img/feed/comment.png`} onClick={async()=>{dispatch(changeDetailModalOpen(true))}}/>
                                    <p>1개</p>
                                </div>
                                <div className={`${feedSlotStyle.feedBtns}`}>
                                    <button>수정</button>
                                    <button>삭제</button>
                                </div>
                            </div>

                            {/* 날짜 */}
                            <div className={`${feedSlotStyle.date}`}>23.07.19 09:00</div>

                            {/* 구분선 */}
                            <div className={`${feedSlotStyle.hr}`}></div>
                        </div>
                    );
                })
                
            }
        </>     
    );
}


export default FeedSlot;

const StyledSlider = styled(Slider)`

  .slick-prev {
    z-index: 1;
    left: 30px;
    top: 35%;
  }

  .slick-next {
    right: 40px;
    top: 35%;
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
    bottom: 200px;
    color: black;

    li button:before {
      color: black;
    }

    li.slick-active button:before {
      color: white;
    }
  }
`;