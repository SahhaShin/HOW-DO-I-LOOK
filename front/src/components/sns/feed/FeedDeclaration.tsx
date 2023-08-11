import React, { useState } from 'react';

//css
import feedDeclarationStyle from "./FeedDeclaration.module.css";

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {changeDeclarationModalOpen} from "../../../store/FeedSlice";


const FeedDeclaration = () => {

    //redux 관리
    let state = useSelector((state:any)=>state.feed);
    let dispatch = useDispatch();
    const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));

    return(
        <div className={`${feedDeclarationStyle.modal}`}>
            {/* 안내문구 */}
            <div className={`${feedDeclarationStyle.statement}`}>
                <p>안녕하세요 {loginUser.nickname}님, 불편을 끼쳐드려 죄송합니다.</p>
                <p>왜 이 게시물을 신고하고 싶으신가요?</p>
            </div>

            {/* 신고 내역 쓰는 창 */}
            <div className={`${feedDeclarationStyle.input}`}>
                <textarea placeholder='이유를 자세히 적어주세요.'></textarea>
            </div>

            {/* 버튼 2개 */}
            <div className={`${feedDeclarationStyle.btns}`}>
                <button>신고하기</button>
                <button onClick={()=>{dispatch(changeDeclarationModalOpen(false))}}>취소</button>
            </div>


        </div>
    );
}

export default FeedDeclaration;