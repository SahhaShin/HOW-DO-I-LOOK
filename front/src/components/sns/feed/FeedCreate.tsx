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

    //유저정보
    const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));

    //사진 등록 시 피드 해시태그 관리
    let [inputHash, setInputHash] = useState<string>("");//input에서 쓰고 있는 해시태그
    let [hashtags, setHashtags] = useState<string[]>([]);
    let [objectListHash, setObjectListHash] = useState([]);

    // 파일등록 관련 코드
    const inputRef = useRef<HTMLInputElement | null>(null);
    
    //현 이미지 src, file 상태 저장용
    const [imgSrc, setImgSrc] = useState<string>('');//미리보기 사진 url 저장용, 업로드하기로 결정한 이미지
    const [imgFile, setImaFile] = useState<any|null>(null);

    //백엔드 전달용 리스트
    const [imageSrcList, setImageSrcList] : string[] = useState([]);  //backend에 전달할 이미지 파일리스트
    const [imageFileList, setImageFileList] : any[] = useState([]);  //backend에 전달할 이미지 파일리스트

    //사진추가 페이지 0부터 시작
    const [page, setPage] = useState<number>(0);
    //사진등록 마무리 눌렀을 경우 업로드 버튼 생성
    let [uploadEnd, setUploadEnd] = useState<boolean>(false);

    //문구 입력
    let[statement, setStatement] = useState<string>("");

    // 이전 페이지로 이동
    function prevPage(){
        if(page>0) {
            setPage(page-1);
            setUploadEnd(false);

            //이전으로 이동한 페이지가 0보다 작지 않으면,
            //이전에 등록했던 사진과 해시태그가 있다면 셋팅해준다.
            if(page>=0){
                // console.log(page);//0
                setImgSrc(imageSrcList[page-1]);
                setHashtags(objectListHash[page-1].hashtagList); //null 문제
            }
        }
    }

    //다음 페이지로 이동
    // 다음누르고 이전갔다가 업로드 누르면 해시태그가 2번 저장되는 이슈가 있다.
    function nextPage(end:boolean){
        // 페이지 이동 전에 사진이 등록되었는지 확인한다.
        if(imgSrc===''){
            alert('사진 등록은 필수입니다 :)');
            return;
        }

        if(page<5) {
            //다음 페이지가 이미 사진이 등록된 page라면 
            //현재 페이지 정보를 저장하고, 다음 페이지 정보 가져오기
            if(imageSrcList.length>page){

                // 사진 등록(백엔드에 보낼 사진리스트에)
                if(imgSrc!==null){
                    const newImageSrcList = [...imageSrcList];
                    newImageSrcList.splice(page,1,imgSrc);
                    setImageSrcList(newImageSrcList);
                    console.log(newImageSrcList);
                }

                if(imgFile!==null){

                    const newImageFileList = [...imageFileList];
                    newImageFileList.splice(page,1,imgFile);
                    setImageFileList(newImageFileList);
                    console.log(newImageFileList);


                    // 해시태그 리스트에 등록 -> 리스트에 객체 형식으로 들어가야함
                    //해시태그 하나도 안달았을 때 빈리스트 들어가는지 확인해야함
                    const newObjectListHash = [...objectListHash];
                    newObjectListHash.splice(page,1,{hashtagList:hashtags});
                    setObjectListHash(newObjectListHash);
                    console.log(`현재 내가 지우는 페이지는! ${page}`);
                    console.log(newObjectListHash);
                }

  
                // console.log(page); //1

                //다음페이지 정보 가져오기
                if(imageSrcList.length>page+1){
                    setUploadEnd(false);
                    setImgSrc(imageSrcList[page+1]);
                    console.log(imageSrcList[page+1]);
                    setHashtags(objectListHash[page+1].hashtagList); //null 문제 주의
                }else{
                    setImgSrc('');
                    setImaFile(null);
                    setHashtags([]);
                }

                if(end) {
                    setUploadEnd(true);
                    return;
                }  

                setPage(page+1);

            }else{
                //새로운 페이지라 사진을 등록해야함
                setImageSrcList((imageSrcList)=>[...imageSrcList, imgSrc]);
                setImageFileList((imageFileList)=>[...imageFileList, imgFile]);

                //objectListHash = [{"여름", "더워"}]
                const obj = {hashtagList:hashtags};//객체 안의 리스트로 만들기
                setObjectListHash((objectListHash)=>[...objectListHash,obj]);

                // 마무리 버튼을 눌렀다.
                if(end) {
                    setUploadEnd(true);
                    return;
                }

                setPage(page+1);
                setUploadEnd(false);

                setImgSrc('');
                setImaFile(null);
                setHashtags([]);
            }
        }
        else{
            alert('5개까지 업로드 가능합니다 :)');
            setUploadEnd(false);
            return;
        }
    }

    //마지막 페이지로 이동
    function endPage(){

        if(page<5) {
            nextPage(true);
        }
        //마지막 이전 페이지 내용까지 저장

        setPage(page+1);
        

        //전체 해시태그를 넣어줘야 한다.
        setHashtags([]); // 마지막으로 본게 hashtag에 남아있어서 계속 마지막으로 본 해시태그가 하나 더 추가되는 이슈가 있었다. 빈 어레이로 만들어주면 해결
        for(let i=0;i<objectListHash.length;i++){
            for(let j in objectListHash[i].hashtagList){
                setHashtags((hashtags)=>[...hashtags, objectListHash[i].hashtagList[j]]);
            }
        }
        
    }

    const onUploadImage = useCallback((file: any) => {
        setImaFile(file);
        
        if (!file) {
          return;
        }else{ 
            // file, Blob 객체를 핸들링하는데 사용
            // File, Blob 객체를 사용해 특정 파일을 읽어들여 js에서 파일에 접근할 수 있게 도와줌
            const reader = new FileReader();

            // File 혹은 Blob 을 읽은 뒤 base64로 인코딩한 문자열을
            //FileReader 인스턴스의 result라는 속성에 담아줌
            reader.readAsDataURL(file);

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

    //statement 변화 감지 함수
    const inputStatement = (e: any) => {
        setStatement(e.target.value);
    }

    async function makeNewFeed(){
        //피드 생성 state
        let newFeed = {
            feedSaveRequestDto:{
                userId:loginUser?.id,
                content: statement,
                photoSaveRequestDtoList:objectListHash
            },
            s3upload:imageFileList
        }
        
        // 이미지 폼데이터로 저장
        const formdata = new FormData();

        console.log(imageFileList);
        console.log(objectListHash);
        console.log(statement);
        console.log(newFeed.feedSaveRequestDto);

        if(newFeed.feedSaveRequestDto.photoSaveRequestDtoList.length>0){
            formdata.append("feedSaveRequestDto", new Blob([JSON.stringify(newFeed.feedSaveRequestDto)],{type: "application/json"}));

            // imageFileList를 순회하며 formdata에 이미지 파일들을 추가
            for (let i = 0; i < imageFileList.length; i++) {
                const file = imageFileList[i];
                if (file instanceof File) {
                    console.log(file);
                    formdata.append("s3upload", file);
                }
            }
            

            // 폼 객체 key 와 value 값을 순회.
            let entries = formdata.entries();
            for (const pair of entries) {
                console.log(pair[0]+ ', ' + pair[1]); 
            }
            sendFormdata(formdata);
        }
    }

    async function sendFormdata(formdata){
        console.log(formdata);
        dispatch(action.addFeed(formdata));

        let data = {size:0, page:0};
        dispatch(action.getFeedTotalList(data));
    }




    useEffect(()=>{
        // console.log("render");
    },[page, uploadEnd, hashtags])


    

    return(
        <div className={`${feedCreateStyle.createTotal}`}>

            {/* left */}
            {   uploadEnd?
                <StyledSlider {...settings} className={`${feedCreateStyle.leftSlider}`}>
                    {
                        imageSrcList?.map((oneSrc,index)=>{
                            return(
                                <div className={`${feedCreateStyle.picture}`} key={index}>
                                    <img className={`${feedCreateStyle.img}`} src={oneSrc}/>
                                </div>
                            );
                        })
                    }
                </StyledSlider>:
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
                </div>


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
                        <textarea onChange={(e)=>inputStatement(e)} className={`${feedCreateStyle.textAreaSize}`} placeholder='어떤 기분을 공유하고 싶으신가요?'/>
                    </div>:
                    <div className={`${feedCreateStyle.addedTag}`}>
                        <div>추가된 해시태그</div>
                        <div className={`${feedCreateStyle.tags}`}>
                            {
                                hashtags?.map((one, idx)=>{
                                    return(
                                        <div className={`${feedCreateStyle.oneTag2}`} key={idx} >
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
                        {page>=0?<button onClick={()=>{prevPage()}}>이전</button>:null}
                        <button onClick={()=>makeNewFeed()}>업로드</button>
                    </div>:
                    <div className={`${feedCreateStyle.rightBtns}`}>
                        {page>0?<button onClick={()=>{prevPage()}}>이전</button>:null}
                        <button onClick={()=>{nextPage(false)}}>다음</button>
                        <button onClick={()=>{endPage();}}>마무리</button>
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