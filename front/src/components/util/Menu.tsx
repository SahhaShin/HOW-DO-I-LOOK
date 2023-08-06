import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import UtilStyle from "./Util.module.css";

//redux
import { useSelector, useDispatch } from "react-redux";
import { changeMenuItemNum } from "../../store/UtilSlice";

const NavigationBar: React.FC = () => {
  const navigate = useNavigate();

  //redux 관리
  let state = useSelector((state: any) => state.util);
  let dispatch = useDispatch();

  const [activeMenu, setActiveMenu] = useState<number | null>(0);

  //이미 체크된 메뉴냐? 그러면 움직이지 말 것
  //체크된 메뉴가 아니면 index 위치로 움직일 것
  const handleMenuClick = (index: number) => {
    setActiveMenu(index === activeMenu ? null : index);
  };

  useEffect(() => {
    setActiveMenu(state.menuItemNum);
  }, []);

  const liveMenuItems = ["라이브", "피드", "채팅", "랭킹", "알림"];
  const liveMenuLink = ["liveList", "feed", "chatList", "rank", "alarm"];

  return (
    <div className={`${UtilStyle.navbarContainer}`}>
      <div className={`${UtilStyle.navbar}`}>
        {liveMenuItems.map((menuItem, index) =>
          <button
            key={index}
            onClick={() => {
              handleMenuClick(index);
              dispatch(changeMenuItemNum(index));
              navigate(`/${liveMenuLink[index]}`);
            }}
          >
            {menuItem}
          </button>
        )}

        {/* 이미 체크된 메뉴가 아닐 경우 클릭한 버튼 위치로 이동 */}
        <div
          className={`${UtilStyle.activeMenuBlock} ${activeMenu !== null
            ? "active"
            : ""}`}
          style={{ top: activeMenu !== null ? `${activeMenu * 20}%` : "0" }}
        >
          {" "}{activeMenu !== null &&
            <h2>
              {liveMenuItems[activeMenu]}
            </h2>}{" "}
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
