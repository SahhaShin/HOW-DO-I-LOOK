import React, { useState,useRef,useCallback } from 'react';

//css
import feedCreateStyle from "./FeedCreate.module.css";

import { AnyAaaaRecord } from 'dns';

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {changeFollow, changeCreateModalOpen} from "../../../store/FeedSlice";


const FeedCreate = () => {

    //redux 관리
    let state = useSelector((state:any)=>state.feed);
    let dispatch = useDispatch();

    // 파일등록 관련 코드
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [imgSrc, setImgSrc] = useState<string>('');

    const onUploadImage = useCallback((e: AnyAaaaRecord) => {
        console.log(e);
        if (!e) {
          return;
        }else{ 
            // file, Blob 객체를 핸들링하는데 사용
            // File, Blob 객체를 사용해 특정 파일을 읽어들여 js에서 파일에 접근할 수 있게 도와줌
            const reader = new FileReader();

            // File 혹은 Blob 을 읽은 뒤 base64로 인코딩한 문자열을
            //FileReader 인스턴스의 result라는 속성에 담아줌
            reader.readAsDataURL(e);
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


    // 해시태그 등록 관리
    let [hash, setHash] = useState<string[]|null>(null);

    //사진 등록 관리

    return(
        <div className={`${feedCreateStyle.createTotal}`}>

            {/* left */}
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

            {/* right */}
            <div className={`${feedCreateStyle.right}`}>
                {/* x표 */}
                <div className={`${feedCreateStyle.closeBtn}`}>
                    <img src={process.env.PUBLIC_URL+`/img/feed/closeBtn.png`} onClick={()=>{dispatch(changeCreateModalOpen(false))}}/>
                </div>

                {/* 해시태그 생성 */}
                <div className={`${feedCreateStyle.makeTag}`}>
                    <div>해시태그 생성</div>
                    <div className={`${feedCreateStyle.makeTagInput}`}> 
                        <input type='text' placeholder='ex) #여름'/>
                        <button>추가</button>
                    </div>
                </div>

                {/* 추가된 해시태그 */}
                <div className={`${feedCreateStyle.addedTag}`}>
                    <div>추가된 해시태그</div>
                    <div className={`${feedCreateStyle.tags}`}></div>
                </div>

                {/* 버튼 2개 or 1개  */}
                <div className={`${feedCreateStyle.rightBtns}`}>
                    <button>사진추가</button>
                    <button>마무리</button>
                </div>
            </div>
        </div>
    );
}

export default FeedCreate;