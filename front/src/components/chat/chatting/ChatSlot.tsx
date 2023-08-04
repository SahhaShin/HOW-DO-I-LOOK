import React, { useState } from 'react';
import chatSlotStyle from './ChatSlot.module.css';
import { useNavigate } from 'react-router-dom';

const ChatSlot = (props) => {

    console.log(props);

    const navigate = useNavigate();

    function chatStart(){
        //props.oneRoom.chatRoomCode
        navigate("/chatroom/" + props.oneRoom.userBId + "/" + props.oneRoom.id);
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
                        <p>닉네임 안줌</p>
                        <p>오후 3:12</p>
                    </div>

                    {/* 내용 */}
                    <div>피드 잘보고 있어요~</div>
                </div>

                {/* 우측 : 입장 버튼 */}
                <div className={`${chatSlotStyle.enterBnt}`}><button onClick={()=>{chatStart()}}>입장</button></div>
            </div>

        </div>
    );
}

export default ChatSlot;