import React, { useState,useRef,useCallback, useEffect } from 'react';

//css
import feedStyle from "../../../pages/sns/feed/Feed.module.css";
import styled from "styled-components";

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {action_follow} from "../../../store/FollowSlice";

import FollowSlot from "../../../components/util/FollowSlot";

const FeedFollow = () => {

    //redux 관리
    let state_follow = useSelector((state:any)=>state.follow);
    let dispatch = useDispatch();

    const loginUser = JSON.parse(window.sessionStorage.getItem("loginUser"));

    useEffect(() => {
        dispatch(action_follow.getMyFollowingList(loginUser.id));
    }, [])

    return(
        <div className={`${feedStyle.menuArea}`}>
            {/* floating menu start */}
            <div className={`${feedStyle.followArea}`}>
                <div className={`${feedStyle.followAreaTitle}`}>Following</div>
                
                    {state_follow.myFollowingUsers?.map((one, idx) => (
                        <FollowSlot one={one} key={idx}/>  
                    ))}
            </div>
        </div>
    );
}

export default FeedFollow;