import React, { useState,useRef,useCallback, useEffect } from 'react';

//css
import feedCreateStyle from "./FeedCreate.module.css";
import styled from "styled-components";

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {action, changeFollow, changeCreateModalOpen} from "../../../store/FeedSlice";

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

    // 파일등록 관련 코드
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [imgSrc, setImgSrc] = useState<string>('');//미리보기 사진 url 저장용
    const [imgSrcList, setImgSrcList] = useState<string[]>([]); //업로드하기로 결정한 이미지
    const [imageFile, setImageFile] : any = useState();  //backend에 전달할 이미지 파일

    //사진추가 페이지 0부터 시작
    const [page, setPage] = useState<number>(0);
    //사진등록 마무리 눌렀을 경우 업로드 버튼 생성
    let [uploadEnd, setUploadEnd] = useState<boolean>(false);

    // 이전 페이지로 이동
    function prevPage(){
        setUploadEnd(false);
        if(page>0) setPage(page-1);
    }

    //다음 페이지로 이동
    function nextPage(){
        setUploadEnd(false);
        if(page<5) setPage(page+1);
        else{
            alert('5개까지 업로드 가능합니다 :)');
            setUploadEnd(false);
            return;
        }
    }


    const onUploadImage = useCallback((file: any) => {
       
        setImageFile(file);
        
        if (!file) {
          return;
        }else{ 
            // file, Blob 객체를 핸들링하는데 사용
            // File, Blob 객체를 사용해 특정 파일을 읽어들여 js에서 파일에 접근할 수 있게 도와줌
            const reader = new FileReader();

            // File 혹은 Blob 을 읽은 뒤 base64로 인코딩한 문자열을
            //FileReader 인스턴스의 result라는 속성에 담아줌
            reader.readAsDataURL(file);
            console.log(reader);

            return new Promise((resolve) => {
                reader.onload = () => {       // FileReader가 성공적으로 파일을 읽어들였을 때 트리거 되는 이벤트 핸들러
                                              // 이 내부에 우리가 원하는 로직을 넣어주면 됨
                                              // 이번과 같은 경우는 setState로 img값 받기
                    setImgSrc(reader.result);
                    resolve();
                };
            });

        }
    }, []);

    const onUploadImageButtonClick = useCallback(() => {
        if (!inputRef.current) {
          return;
        }
        inputRef.current.click();
    }, []);

    //사진 등록 관리
    let [picture, setPicture] = useState<string[]|null>();

    //유저정보
    const userId = 1;

    //사진 등록 시 피드 해시태그 관리
    let [inputHash, setInputHash] = useState<string>("");
    let [hashtags, setHashtags] = useState<string[]>([]);


    //피드 생성
    //해시태그 input 변화 감지 함수
    const inputHashtag = (e: any) => {
        setInputHash(e.target.value);
    }

    const addHashtag = (e) => {
        e.preventDefault();
        if(inputHash==="") return;

        setHashtags((currentList)=>[inputHash, ...currentList]);

        // dispatch(addHashtagList(inputHash));
        setInputHash("");
    }

    function makeNewFeed(){
        //피드 생성 state
        let newFeed = {
            feedSaveRequestDto:{
                userId:userId,
                content: "",
                photoSaveRequestDtoList:[
                    {
                        hashtagList:[]
                    }
                ]
            },
            s3upload:[]
        }
            dispatch(action.addFeed(newFeed));   
        }


    

    return(
        <div className={`${feedCreateStyle.createTotal}`}>

            {/* left */}
            {   uploadEnd?
                <div className={`${feedCreateStyle.left}`}>
                    {/* 사진 등록 */}
                    <div className={`${feedCreateStyle.picture}`}>
                        {/* 이미지 등록 */}
                        <div className={`${feedCreateStyle.imgRegist}`}>
                            {imgSrc?<img className={`${feedCreateStyle.img}`} src={imgSrc}/>:""}
                        </div>
                    </div>
                    {/* 파일선택 */}
                    <input className={`${feedCreateStyle.selectFile}`} type="file" accept="image/*" ref={inputRef} onChange={(e)=>{onUploadImage(e.target.files[0])}} />
                </div>:

                <StyledSlider {...settings} className={`${feedCreateStyle.left}`}>
                    {
                        imgSrcList?.map((oneSrc)=>{
                            return(
                                <div className={`${feedCreateStyle.picture}`}>
                                    <img className={`${feedCreateStyle.img}`} src={oneSrc}/>
                                </div>
                            );
                        })
                    }
                </StyledSlider>


            } 

            {/* right */}
            <div className={`${feedCreateStyle.right}`}>
                {/* x표 */}
                <div className={`${feedCreateStyle.closeBtn}`}>
                    <img src={process.env.PUBLIC_URL+`/img/feed/closeBtn.png`} onClick={()=>{dispatch(changeCreateModalOpen(false))}}/>
                </div>

                {/* 해시태그 생성 */}
                {   uploadEnd?
                    <div className={`${feedCreateStyle.makeTag}`}>
                        <div>추가된 해시태그</div>
                        {
                            hashtags?.map((one, idx)=>{
                                return(
                                    <div className={`${feedCreateStyle.oneTag}`} key={idx} >
                                        #{one}
                                    </div>
                                );
                            })
                        }
                    </div>:
                    <div className={`${feedCreateStyle.makeTag}`}>
                        <div>해시태그 생성</div>
                        <form onSubmit={addHashtag} className={`${feedCreateStyle.makeTagInput}`}> 
                            <input onChange={(e)=>inputHashtag(e)} value={inputHash} type='text' placeholder='ex) 여름'/>
                            <button>추가</button>
                        </form>
                    </div>

                }
                {/* 추가된 해시태그 */}
                {   uploadEnd?
                <div className={`${feedCreateStyle.addedTag}`}>
                    <div>문구 입력</div>
                        <textarea className={`${feedCreateStyle.textAreaSize}`} placeholder='어떤 기분을 공유하고 싶으신가요?'/>
                    </div>:
                    <div className={`${feedCreateStyle.addedTag}`}>
                        <div>추가된 해시태그</div>
                        <div className={`${feedCreateStyle.tags}`}>
                            {
                                hashtags?.map((one, idx)=>{
                                    return(
                                        <div className={`${feedCreateStyle.oneTag}`} key={idx} >
                                            #{one}
                                        </div>
                                    );
                                })
                            }

                        </div>
                    </div>
                }

                {/* 버튼 2개 or 1개  */}
                {   uploadEnd?
                    <div className={`${feedCreateStyle.rightBtns}`}>
                        {page>0?<button onClick={()=>{prevPage()}}>이전</button>:null}
                        <button>업로드</button>
                    </div>:
                    <div className={`${feedCreateStyle.rightBtns}`}>
                        {page>0?<button onClick={()=>{prevPage()}}>이전</button>:null}
                        <button onClick={()=>{nextPage()}}>사진추가</button>
                        {page>=1?<button onClick={()=>{setUploadEnd(true)}}>마무리</button>:null}
                    </div>
                }
            </div>
        </div>
    );
}

export default FeedCreate;

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