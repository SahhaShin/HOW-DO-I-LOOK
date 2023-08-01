import React, { useState, useRef, useCallback } from 'react';

//css
import liveStyle from "./Live.module.css";

// 컴포넌트
import LiveMenu from '../../../components/streaming/live/LiveMenu';
import LiveChat from '../../../components/streaming/live/LiveChat';

const Live = () => {
    return(
        <div className={`${liveStyle.total}`}>
            {/* 메인 스트리밍 영역 */}
            <div className={`${liveStyle.main}`}>
                {/* 메뉴 */}
                <div className={`${liveStyle.menu}`}>
                    <LiveMenu/>
                </div>

                {/* 스트리밍 영상 */}
                <div className={`${liveStyle.video}`}></div>

                {/* 채팅 */}
                <div className={`${liveStyle.chat}`}>
                    <LiveChat/>
                </div>
            </div>

            {/* 참여자 영역 */}
            <div className={`${liveStyle.advisor}`}></div>
        </div>
    );
}

export default Live;