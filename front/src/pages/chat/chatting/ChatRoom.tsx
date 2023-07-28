import React, { useEffect, useState } from "react";

//css
import chatRoomStyle from "./ChatRoom.module.css";

//컴포넌트
import ChatHistory from "../../../components/chat/chatting/ChatHistory";


const ChatRoom = () => {

    const nickname:string = "user3";

    return(
        <div className={`${chatRoomStyle.total}`}>
            {/* 헤더 */}
            <div className={`${chatRoomStyle.header}`}>헤더</div>

            {/* 메인 */}
            <div className={`${chatRoomStyle.main}`}>
                {/* 좌측 메뉴 */}
                <div className={`${chatRoomStyle.menuArea}`}></div>

                {/* 우측 채팅하는 ui */}
                <div className={`${chatRoomStyle.mid}`}>
                    <div className={`${chatRoomStyle.chatArea}`}>
                        <div>
                            <div className={`${chatRoomStyle.chatHeader}`}>
                                <div className={`${chatRoomStyle.nickname}`}>{nickname}</div>
                                <div className={`${chatRoomStyle.exitWrapper}`}><button className={`${chatRoomStyle.exit}`}>나가기</button></div>
                            </div>
                            
                        </div>
                        <div className={`${chatRoomStyle.chatting}`}><ChatHistory/></div>

                        {/* input과 전송 */}
                        <div className={`${chatRoomStyle.sendArea}`}>
                            <input type="text" placeholder="메세지를 입력하세요."/>
                            <button>전송</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 푸터 */}
            <div className={`${chatRoomStyle.footer}`}></div>
        </div>
    );
}


export default ChatRoom;