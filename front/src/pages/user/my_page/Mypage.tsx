import React, { useState } from 'react';

//css
import mypageStyle from "./Mypage.module.css";

//컴포넌트
import MypageMain from '../../../components/user/my_page/MypageMain';

const Mypage = () => {
    return(
        <div className={`${mypageStyle.total}`}>
            {/* 헤더 */}
            <div className={`${mypageStyle.header}`}>헤더</div>

            {/* 메인 */}
            <div className={`${mypageStyle.main}`}>
                {/* 좌측 메뉴 */}
                <div className={`${mypageStyle.menuArea}`}></div>

                {/* 우측 마이페이지 컴포넌트 */}
                <div className={`${mypageStyle.mid}`}>
                    <MypageMain/>
                </div>
            </div>

            {/* 푸터 */}
            <div className={`${mypageStyle.footer}`}>푸터</div>
        </div>
    );
}

export default Mypage;