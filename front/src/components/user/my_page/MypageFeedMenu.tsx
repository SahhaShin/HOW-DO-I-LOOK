import React, { useState } from 'react';
import mypageFeedMenuStyle from './MypageFeedMenu.module.css';

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {action_mypage,changeFeedReadMode} from "../../../store/MypageSlice";

//changeFeedReadMode

const NavigationBar: React.FC = () => {

  //redux 관리
  let state = useSelector((state:any)=>state.mypage);
  let dispatch = useDispatch();

  //로그인 유저
  let loginUser = JSON.parse(sessionStorage.getItem("loginUser"));


  const [activeMenu, setActiveMenu] = useState<number | null>(0);

  //이미 체크된 메뉴냐? 그러면 움직이지 말 것
  //체크된 메뉴가 아니면 index 위치로 움직일 것
  const handleMenuClick = (index: number) => {
    setActiveMenu(index === activeMenu ? null : index);
  };

  const menuItems = ['MY', 'REACTION'];

  return (
    <div className={`${mypageFeedMenuStyle.navbarContainer}`}>
      <div className={`${mypageFeedMenuStyle.navbar}`}>
        {menuItems.map((menuItem, index) => (
          <button key={index} onClick={() => {handleMenuClick(index); dispatch(changeFeedReadMode(index)); dispatch(action_mypage.getFeedList(loginUser.id)); dispatch(action_mypage.getLikeFeedList(loginUser.id))}}>
            {menuItem}
          </button>
        ))}


        {/* 이미 체크된 메뉴가 아닐 경우 클릭한 버튼 위치로 이동 */}
        <div
          className={`${mypageFeedMenuStyle.activeMenuBlock} ${activeMenu !== null ? 'active' : ''}`}
          style={{ left: activeMenu !== null ? `${activeMenu * 50}%` : '0' }}
        > {activeMenu !== null && <h2>{menuItems[activeMenu]}</h2>} </div>
      </div>

      
    </div>
  );
};

export default NavigationBar;