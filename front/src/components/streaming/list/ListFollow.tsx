import React, {useState, useEffect} from 'react';

import chatStyle from "../../../pages/chat/chatting/ChatList.module.css";

import { useSelector, useDispatch } from "react-redux"; 
import {action_follow} from "../../../store/FollowSlice";

import FollowSlot from "../../util/FollowSlot";


const ChatFollow = () => {
    let state_follow = useSelector((state:any)=>state.follow);
    let dispatch = useDispatch();

    const loginUser = JSON.parse(window.sessionStorage.getItem("loginUser"));

    useEffect(() => {
        dispatch(action_follow.getMyFollowingList(loginUser.id));
    }, [])

    return (
        <div className={`${chatStyle.menuArea}`}>
            {/* floating menu start */}
            <div className={`${chatStyle.followArea}`}>
                <div className={`${chatStyle.followAreaTitle}`}>Following</div>
                    {state_follow.myFollowingUsers?.map((one, idx) => (
                        <FollowSlot one={one} key={idx}/>                            
                    ))}
            </div>
        </div>
    );
};

export default ChatFollow;