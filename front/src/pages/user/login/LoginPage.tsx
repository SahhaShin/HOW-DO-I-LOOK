import React, { useState, useEffect } from 'react';

//css
import mypageStyle from "./LoginPage.module.css";

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {action_mypage, changeBadgeUpdateModalOpen, changeFollowModalOpen} from "../../../store/MypageSlice";
import {changeDetailModalOpen} from "../../../store/FeedSlice";

import {useParams} from 'react-router-dom'

//컴포넌트

import Header from "../../../components/util/Header";
import Menu from "../../../components/util/Menu";
import Footer from "../../../components/util/Footer";


import Login from '../../../components/user/login/login';


const LoginPage = () => {





    return(
        <div className={`${mypageStyle.wrapper}`}>

            <div className={`${mypageStyle.total}`}>
                
                {/* 헤더 */}
                {/* <div className={`${mypageStyle.header}`}><Header/></div> */}

                {/* 메인 */}
                <div className={`${mypageStyle.main}`}>
                    {/* 좌측 메뉴 */}
                    {/* <div className={`${mypageStyle.menuArea}`}><div><Menu/></div></div> */}

                    {/* 우측 마이페이지 컴포넌트 */}
                    <div className={`${mypageStyle.mid}`}>
                        
                        
                        <Login/>
                        
                        

                    </div>
                </div>

                {/* 푸터 */}
                {/* <div className={`${mypageStyle.footer}`}><Footer/></div> */}

            </div>

        </div>
    );
}

export default LoginPage;