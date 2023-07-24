import React, { useState, useRef, useCallback } from 'react';

//css
import closetRegistStyle from "../closet/CLOSETRegist.module.css";

const CLOSETRegist = () => {


    // 파일등록 관련 코드
    const inputRef = useRef<HTMLInputElement | null>(null);

    const onUploadImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
          return;
        }
        console.log(e.target.files[0].name);
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
        { value: "total", name: "전체" },
    ];   

    const [selected, setSelected] = useState<string>("상의");

    const handleSelect = (e: any) => {
        setSelected(e.target.value);
    };


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
                        <input type="file" accept="image/*" ref={inputRef} onChange={onUploadImage} />
                        {/* <button  onClick={onUploadImageButtonClick} >파일 업로드</button> */}
                    </div>

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
                        <div className={closetRegistStyle.line} style={{marginTop:"-1%"}}>
                            <p>옷 이름 </p>
                            <input style={{marginLeft:"2%"}} className={closetRegistStyle.select}></input>
                        </div>

                        {/* 브랜드명 라인 */}
                        <div className={closetRegistStyle.line} style={{marginTop:"-1%"}}>
                            <p>브랜드명 </p>
                            <input className={closetRegistStyle.select}></input>
                        </div>

                        {/* 특이사항 라인 */}
                        <div className={closetRegistStyle.line} style={{}}>
                            <p>특이사항</p>
                            <input className={closetRegistStyle.select} style={{height:"100px"}}></input>
                        </div>
                    </div>
                </div>

                {/* 버튼 2개 */}
                <div></div>



            </div>

        </div>
    );
}

export default CLOSETRegist;