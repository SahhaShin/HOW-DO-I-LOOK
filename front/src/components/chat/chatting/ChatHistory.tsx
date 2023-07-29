import React, { useState, useEffect } from 'react';

//css
import chatHistoryStyle from "./ChatHistory.module.css";

const ChatHistory = () => {

    //지금 내가 어떤 id를 가진 유저인지 확인
    const myId:string = "ssafy";

    // a유저와 b유저가 나눈 채팅 기록
    interface ChatList{
        date:string,
        id:string,
        nickname:string,
        profile?:string,
        content:string,
        time:string
    }
    let [chatList, setChatList] = useState<ChatList[]>([
        {
            date:"2023년 7월 15일 토요일",
            id:"user3",
            nickname:"user3",
            // profile:null,
            content:"피드 잘보고 있어요~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
            time:"오후 3:12"
        },{
            date:"2023년 7월 15일 토요일",
            id:"user3",
            nickname:"user3",
            // profile:null,
            content:"저랑 팔로우 해요!",
            time:"오후 3:13"
        },
        {
            date:"2023년 7월 16일 일요일",
            id:"ssafy",
            nickname:"미팅만 50번",
            // profile:null,
            content:"좋아요! 팔로우해요!",
            time:"오전 8:10"
        },
        {
            date:"2023년 7월 16일 일요일",
            id:"ssafy",
            nickname:"미팅만 50번",
            // profile:null,
            content:"좋게 봐주셔서 감사합니다!!",
            time:"오전 8:11"
        },
        {
            date:"2023년 7월 16일 토요일",
            id:"user3",
            nickname:"user3",
            // profile:null,
            content:"꺅 너무 감사합니다 ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ",
            time:"오후 3:12"
        },{
            date:"2023년 7월 17일 일요일",
            id:"ssafy",
            nickname:"미팅만 50번",
            // profile:null,
            content:"저번에 해드린 코디는 어떠셨나요?",
            time:"오전 8:10"
        },{
            date:"2023년 7월 17일 일요일",
            id:"ssafy",
            nickname:"미팅만 50번",
            // profile:null,
            content:"반응이 좋았나요?",
            time:"오전 8:10"
        },
        {
            date:"2023년 7월 17일 일요일",
            id:"ssafy",
            nickname:"미팅만 50번",
            // profile:null,
            content:"반응이 좋았나요?",
            time:"오전 8:10"
        },
    ]);

    // 현재 채팅이 들어오는 날짜
    let [curDate, setCurDate] = useState<string|null>("");
    useEffect(()=>{
        setCurDate(null);
    },[]);
    
    function changeCurDate(newDate:string){
        setCurDate(newDate);
    }

    return(
        <div>
            {chatList.map((one)=>{
                return(
                    <div className={`${chatHistoryStyle.chatArea}`}>
                        {/* 날짜 */}
                        {curDate!==one.date?<div className={`${chatHistoryStyle.date}`}><div>{one.date}</div></div>:null}
                        {myId!==one.id?<div className={`${chatHistoryStyle.oneChat}`}>
                            {/* 유저 프로필 */}
                            <div className={`${chatHistoryStyle.profile}`}>
                                <div className={`${chatHistoryStyle.profileCircle_G}`}>
                                    <img src={process.env.PUBLIC_URL+`/img/user/profileImg.png`}></img>
                                </div>
                            </div>

                            {/* 유저 닉네임, 내용/시간 */}
                            <div className={`${chatHistoryStyle.mid}`}>
                                <div>{one.nickname}</div>
                                <div>
                                    <div className={`${chatHistoryStyle.midContent}`}>{one.content}</div>
                                    <div className={`${chatHistoryStyle.midTime}`}>{one.time}</div>
                                </div>
                            </div>
                        </div> :
                        <div className={`${chatHistoryStyle.oneChat2}`}>
                            <div className={`${chatHistoryStyle.mid2}`}>    
                                <div className={`${chatHistoryStyle.midTime}`}>{one.time}</div>
                                <div className={`${chatHistoryStyle.midContent}`}>{one.content}</div>
                            </div>
                        </div>}

                    </div>
                );
            })}
        </div>
    );
}


export default ChatHistory;