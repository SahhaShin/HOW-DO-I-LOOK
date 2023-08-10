import React, { useState,useRef,useCallback, useEffect } from 'react';

//css
import feedModifyStyle from "./FeedModify.module.css";
import styled from "styled-components";

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {action, changeModifyModalOpen,changeFollow} from "../../../store/FeedSlice";

//slick import
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const FeedCreate = () => {

    //redux 관리
    let state = useSelector((state:any)=>state.feed);
    let dispatch = useDispatch();

    // 슬라이드 설정
    const settings = {
        dots:true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    //유저정보
    const userId = 1;

    //사진 등록 시 피드 해시태그 관리
    let [inputHash, setInputHash] = useState<string>("");//input에서 쓰고 있는 해시태그
    let [hashtags, setHashtags] = useState<string[]>([]);
    let [objectListHash, setObjectListHash] = useState([]);

  
    //문구 입력
    let[statement, setStatement] = useState<string>("");
    //statement 변화 감지 함수
    const inputStatement = (e: any) => {
        setStatement(e.target.value);
    }

    //피드 생성
    //해시태그 input 변화 감지 함수
    const inputHashtag = (e: any) => {
        setInputHash(e.target.value);
    }

    //추가버튼을 누르면 해시태그 리스트에 추가됨
    const addHashtag = (e) => {
        e.preventDefault();
        if(inputHash==="") return;

        setHashtags((hashtags)=>[...hashtags, inputHash]);

        // dispatch(addHashtagList(inputHash));
        setInputHash("");
    }

    useEffect(()=>{
        setStatement(state.detailObj.feedContent);
        setHashtags();
    },[])
  

    return(
        <div className={`${feedModifyStyle.createTotal}`}>

            {/* left */}
            <StyledSlider {...settings} className={`${feedModifyStyle.leftSlider}`}>
                {
                    state.detailObj?.photoResponseDtoList?.map((onePicture,index)=>{
                        return(
                            <div className={`${feedModifyStyle.picture}`} key={index}>
                                <img className={`${feedModifyStyle.img}`} src={onePicture.link}/>
                            </div>
                        );
                    })
                }
            </StyledSlider>

            {/* right */}
            <div className={`${feedModifyStyle.right}`}>
                {/* x표 */}
                <div className={`${feedModifyStyle.closeBtn}`}>
                    <img src={process.env.PUBLIC_URL+`/img/feed/closeBtn.png`} onClick={()=>{dispatch(changeModifyModalOpen(false))}}/>
                </div>

                <div className={`${feedModifyStyle.makeTag}`}>
                    <div>해시태그 생성</div>
                    <form onSubmit={addHashtag} className={`${feedModifyStyle.makeTagInput}`}> 
                        <input onChange={(e)=>inputHashtag(e)} value={inputHash} type='text' placeholder='ex) 여름'/>
                        <button>추가</button>
                    </form>
                </div>

                
                {/* 추가된 해시태그 */}
               
                <div className={`${feedModifyStyle.addedTag}`}>
                    <div>추가된 해시태그</div>
                    <p>삭제하고 싶은 해시태그를 클릭해주세요</p>
                    <div className={`${feedModifyStyle.tags}`}>
                    {
                        state.modifyHashtagList?.map((onePhoto)=>{
                            return(onePhoto.hashtagList?.map((oneHash, idx)=>{
                                return(
                                    <div className={`${feedModifyStyle.oneTag}`} key={idx} >
                                        #{oneHash}
                                    </div>
                                );
                            }));
                        })
                    }

                    </div>
                </div>
                
                <div className={feedModifyStyle.textAreaWrap}>
                    <div>문구 입력</div>
                    <textarea onChange={(e)=>inputStatement(e)} className={`${feedModifyStyle.textAreaSize}`} placeholder='어떤 기분을 공유하고 싶으신가요?' value={statement}/>
                </div>
              

                {/* 버튼 2개 or 1개  */}
                
                <div className={`${feedModifyStyle.rightBtns}`}>
                    <button onClick={()=>{dispatch(changeModifyModalOpen(false))}}>취소</button>
                    <button onClick={()=>makeNewFeed()}>수정</button> 
                    {/* 수정 부분 함수짜서 api 날려야함 */}
                </div>

            </div>
        </div>
    );
}

export default FeedCreate;

const StyledSlider = styled(Slider)`

  .slick-prev {
    z-index: 1;
    left: 30px;
    top: 50%;
  }

  .slick-next {
    z-index: 1;
    right: 40px;
    top: 50%;
  }

  .slick-prev:before,
  .slick-next:before {
    font-size: 30px;
    opacity: 1;
    color: black;
  }

  .slick-dots {
    display: flex;
    justify-content: center;
    bottom: 100px;
    color: black;

    li button:before {
      color: black;
    }

    li.slick-active button:before {
      color: white;
    }
  }
`;