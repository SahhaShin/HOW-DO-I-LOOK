import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import UtilStyle from "./Util.module.css";


//redux
import { useSelector, useDispatch } from "react-redux";
import {changeMenuItemNum} from "../../store/UtilSlice";

const NavigationBar: React.FC = () => {

  const navigate = useNavigate();

  //redux 관리
  let state = useSelector((state:any)=>state.util);
  let dispatch = useDispatch();

  const [activeMenu, setActiveMenu] = useState<number | null>(0);




  //이미 체크된 메뉴냐? 그러면 움직이지 말 것
  //체크된 메뉴가 아니면 index 위치로 움직일 것
  const handleMenuClick = (index: number) => {
    setActiveMenu(index === activeMenu ? null : index);
  };

  useEffect(()=>{

    setActiveMenu(state.menuItemNum)
  },[state.menuItemNum])
  const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));


  const liveMenuItems = ["라이브", "피드", "채팅", "랭킹", "옷장", "프로필"];
  const liveMenuLink = ["liveList", "feed", "chatList", "ranking", `closet/${loginUser.id}`,`mypage/${loginUser.id}` ];


  return (
    <div className={`${UtilStyle.navbarContainer}`}>
        <div className={`${UtilStyle.navbar}`}>
            {liveMenuItems.map((menuItem, index) => (
            <button key={index} onClick={() => {handleMenuClick(index); dispatch(changeMenuItemNum(index));navigate(`/${liveMenuLink[index]}`)}}>
                {menuItem}
            </button>
            ))}

            {/* <button className={`${UtilStyle.menuBtn}`} key={0} onClick={() => {handleMenuClick(0); dispatch(changeMenuItemNum(0));navigate(`/${liveMenuLink[0]}`)}}>
                <div><img src={`${process.env.PUBLIC_URL}/img/menuIcon/liveMenu.png`}/></div>
                <p>라이브</p>
            </button>

            <button className={`${UtilStyle.menuBtn}`} key={1} onClick={() => {handleMenuClick(1); dispatch(changeMenuItemNum(1));navigate(`/${liveMenuLink[1]}`)}}>
                <div><img src={`${process.env.PUBLIC_URL}/img/menuIcon/feedMenu.png`}/></div>
                <p>피드</p>
            </button>

            <button className={`${UtilStyle.menuBtn}`} key={2} onClick={() => {handleMenuClick(2); dispatch(changeMenuItemNum(2));navigate(`/${liveMenuLink[2]}`)}}>
                <div><img src={`${process.env.PUBLIC_URL}/img/menuIcon/chatMenu.png`}/></div>
                <p>채팅</p>
            </button>

            <button className={`${UtilStyle.menuBtn}`} key={3} onClick={() => {handleMenuClick(3); dispatch(changeMenuItemNum(3));navigate(`/${liveMenuLink[3]}`)}}>
                <div><img src={`${process.env.PUBLIC_URL}/img/menuIcon/rankMenu.png`}/></div>
                <p>랭킹</p>
            </button> */}

            {/* <button className={`${UtilStyle.menuBtn}`} key={4} onClick={() => {handleMenuClick(4); dispatch(changeMenuItemNum(4));navigate(`/${liveMenuLink[4]}`)}}>
                <div><img src={`${process.env.PUBLIC_URL}/img/menuIcon/closetMenu.png`}/></div>
                <p>옷장</p>
            </button>

            <button className={`${UtilStyle.menuBtn}`} key={4} onClick={() => {handleMenuClick(5); dispatch(changeMenuItemNum(5));navigate(`/${liveMenuLink[5]}`)}}>
                <div><img src={`${process.env.PUBLIC_URL}/img/menuIcon/myMenu.png`}/></div>
                <p>마이페이지</p>
            </button> */}

            {/* 이미 체크된 메뉴가 아닐 경우 클릭한 버튼 위치로 이동 */}
            {state.menuItemNum!==-1?<div
              className={`${UtilStyle.activeMenuBlock} ${activeMenu !== null ? 'active' : ''}`}
              style={{ top: activeMenu !== null ? `${activeMenu * 70}px` : '0' }}
              > {activeMenu !== null && <h2>{liveMenuItems[activeMenu]}</h2>} 
            </div>:null}
          </div>

        
        </div>
    );
};

export default NavigationBar;
