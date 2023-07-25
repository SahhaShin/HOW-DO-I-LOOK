import React, { useState, useRef, useCallback } from 'react';

//css
import closetRegistStyle from "../closet/CLOSETRegist.module.css";
import { AnyAaaaRecord } from 'dns';

const CLOSETRegist = () => {


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

    // select box 메뉴
    interface ClothesType{
        value: string,
        name: string
    };
    const selectList:Array<ClothesType|null> = [
        { value: "top", name: "상의" },
        { value: "bottom", name: "하의" },
        { value: "shoes", name: "신발" },
        { value: "accessory", name: "악세서리" },
    ];   

    const [selected, setSelected] = useState<string>("상의");//선택된 값을 저장

    //select 값이 변하면 선택된 값을 변경
    const handleSelect = (e: any) => {
        setSelected(e.target.value);
    };

    // 옷이름, 브랜드명, 특이사항 저장
    const [clothesName, setClothesName] = useState<string>("");
    const [clothesBrand, setClothesBrand] = useState<string>("");
    const [specialContent, setSpecialContent] = useState<string>("");

    const handleClothesName = (e:any) => {
        setClothesName(e.target.value);
    };

    const handleClothesBrand = (e:any) => {
        setClothesBrand(e.target.value);
    };

    const handleSpecialContent = (e:any) => {
        setSpecialContent(e.target.value);
    }


    return(
        <div>
            {/* 모달 헤더 */}
            <div className={`${closetRegistStyle.modal}`}>
                {/* 옷등록, 닫기버튼 */}
                <div className={`${closetRegistStyle.modalHeader}`}>
                    <p>옷 등록</p>
                    <img src={process.env.PUBLIC_URL+`/img/clothes/closeBtn.png`}/>
                </div>

                {/* 모달 바디 */}
                <div>
                    {/* 이미지 등록 */}
                    <div className={`${closetRegistStyle.imgRegist}`}>
                        {imgSrc?<img className={`${closetRegistStyle.img}`} src={imgSrc}/>:""}
                    </div>
                    <input className={`${closetRegistStyle.selectFile}`} type="file" accept="image/*" ref={inputRef} onChange={(e)=>{onUploadImage(e.target.files[0])}} />

                    {/* input */}
                    <div>
                        {/* 드롭다운 라인 */}
                        <div className={closetRegistStyle.line}>
                            <p>옷 구분</p>
                            <select style={{marginLeft:"2%"}} className={closetRegistStyle.select} onChange={handleSelect} value={selected}>
                                    {selectList.map((item:ClothesType) => {
                                        return(
                                            <option value={item.value} key={item.value}>
                                                {item.name}
                                            </option>
                                        );
                                        
                                    })}
                            </select>
                        </div>

                        {/* 옷이름 라인 */}
                        <div className={closetRegistStyle.line} onChange={handleClothesName} style={{marginTop:"-1%"}}>
                            <p>옷 이름 </p>
                            <input style={{marginLeft:"2%"}} className={closetRegistStyle.input}></input>
                        </div>

                        {/* 브랜드명 라인 */}
                        <div className={closetRegistStyle.line} onChange={handleClothesBrand} style={{marginTop:"-1%"}}>
                            <p>브랜드명 </p>
                            <input className={closetRegistStyle.input}></input>
                        </div>

                        {/* 특이사항 라인 */}
                        <div className={closetRegistStyle.line} onChange={handleSpecialContent} style={{}}>
                            <p>특이사항</p>
                            <textarea className={closetRegistStyle.input} style={{height:"100px"}}/>
                        </div>
                    </div>
                </div>

                {/* 버튼 2개 */}
                <div className={`${closetRegistStyle.buttons}`}>
                    <button>취소</button>
                    <button>업로드</button>
                </div>



            </div>

        </div>
    );
}

export default CLOSETRegist;