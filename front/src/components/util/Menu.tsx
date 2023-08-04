import React, { useState } from "react";

import UtilStyle from "./Util.module.css";


//redux
import { useSelector, useDispatch } from "react-redux";

const NavigationBar: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<number | null>(0);


  //이미 체크된 메뉴냐? 그러면 움직이지 말 것
  //체크된 메뉴가 아니면 index 위치로 움직일 것
  const handleMenuClick = (index: number) => {
    setActiveMenu(index === activeMenu ? null : index);
  };


  const liveMenuItems = ["라이브", "피드", "채팅", "랭킹", "알림"];
  const utilMenuItems = ["방장 옷장", "피드 검색", "세트 전송", "알림", "라이브 정보", "나가기" ];

  const page = useSelector(state=>state.page)

  const menuItems = page === "live" ? utilMenuItems : liveMenuItems ;

  return (
    <div className={`${UtilStyle.navbarContainer}`}>
      {page}
      <div className={`${UtilStyle.navbar}`}>
        {menuItems.map((menuItem, index) => (
          <button key={index} onClick={() => handleMenuClick(index)}>
            {menuItem}
          </button>
        ))}

        {/* 이미 체크된 메뉴가 아닐 경우 클릭한 버튼 위치로 이동 */}
        <div
          className={`${UtilStyle.activeMenuBlock} ${
            activeMenu !== null ? "active" : ""
          }`}
          style={{ top: activeMenu !== null ? `${activeMenu * 20}%` : "0" }}
        >
          {" "}
          {activeMenu !== null && <h2>{menuItems[activeMenu]}</h2>}{" "}
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
