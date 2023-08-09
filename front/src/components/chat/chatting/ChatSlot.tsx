import React, { useState } from 'react';
import chatSlotStyle from './ChatSlot.module.css';
import { useNavigate } from 'react-router-dom';

const ChatSlot = (props) => {
    //oneRoom이 들어옴
    // interface getChatRoomList{
    //     id: number,
    //     userAId: number,
    //     userBId: number,
    //     chatroomCode: string,
    // }


    const navigate = useNavigate();

    const timeSplit = props.oneRoom.lastChatTime.split("T")[0];
    const minutesSplit = props.oneRoom.lastChatTime.split(".")[0].split("T")[1];
    function chatStart(){
        //id는 roomId임
        navigate("/chatroom/" + props.oneRoom.userBId + "/" +props.oneRoom.id+"/"+ props.oneRoom.chatroomCode);
    }



    return(
        <div>
            <div className={`${chatSlotStyle.line}`} style={{borderRadius:"1rem"}}>
                {/* 왼쪽 : 프로필 사진 */}
                <div className={`${chatSlotStyle.profile}`}>
                    <div className={`${chatSlotStyle.profileCircle_G}`}>
                        <img src={process.env.PUBLIC_URL+`/img/user/profileImg.png`}></img>
                        <div className={`${chatSlotStyle.redDot}`}>1</div>
                    </div>
                    
                </div>
                {/* 중앙 */}
                <div className={`${chatSlotStyle.content}`}>
                    {/* 닉네임, 시간 */}
                    <div>
                        <p className={`${chatSlotStyle.nickname}`}>{props.oneRoom.anotherNickName}</p>
                        <p className={`${chatSlotStyle.time}`}>{timeSplit} {minutesSplit}</p>
                    </div>

                    {/* 내용 */}
                    <div>{props.oneRoom.lastChat}</div>
                </div>

                {/* 우측 : 입장 버튼 */}
                <div className={`${chatSlotStyle.enterBnt}`}><button onClick={()=>{chatStart()}}>입장</button></div>
            </div>

        </div>
    );
}

export default ChatSlot;