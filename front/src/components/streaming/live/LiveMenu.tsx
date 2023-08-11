import React, { useState, useRef, useCallback } from 'react';

//css
import liveMenuStyle from "./LiveMenu.module.css";

const LiveMenu = () => {
   
        const [activeMenu, setActiveMenu] = useState<number | null>(0);

        //이미 체크된 메뉴냐? 그러면 움직이지 말 것
        //체크된 메뉴가 아니면 index 위치로 움직일 것
        const handleMenuClick = (index: number) => {
            setActiveMenu(index === activeMenu ? null : index);
        };

        const menuItems = ['방장 옷장', '피드 검색', '세트 전송', '라이브 정보', '나가기'];

        return (
            <div className={`${liveMenuStyle.navbarContainer}`}>

                    {/* 새로운 메뉴 */}
                    <div>
                        <div>방장 옷장</div>
                        <div>피드 검색</div>
                        <div>세트 전송</div>
                        <div>라이브 정보</div>
                        <div>나가기</div>
                    </div>

                
                </div>
            );
    
}

export default LiveMenu;