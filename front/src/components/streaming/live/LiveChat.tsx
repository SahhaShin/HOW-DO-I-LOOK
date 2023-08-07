import React, { useState, useRef, useCallback } from 'react';

//css
import liveChatStyle from "./LiveChat.module.css";

const LiveChat = () => {
    return(
        <div className={`${liveChatStyle.total}`}>
            {/* 해더 */}
            <div className={`${liveChatStyle.chatHeader}`}>CHAT</div>
            {/* 채팅 본문 */}
            <div className={`${liveChatStyle.chatArea}`}>
                <div>본문</div>
                <div className={`${liveChatStyle.chatContent}`}>
                    <input placeholder="메세지를 입력하세요" type='text'/>
                    <button>전송</button>
                </div>
            </div>
        </div>
    );
    
}

export default LiveChat;