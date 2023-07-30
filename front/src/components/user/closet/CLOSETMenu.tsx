import React, { useState } from 'react';
import closetMenuStyle from './CLOSETMenu.module.css';

const NavigationBar: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<number | null>(0);

  //이미 체크된 메뉴냐? 그러면 움직이지 말 것
  //체크된 메뉴가 아니면 index 위치로 움직일 것
  const handleMenuClick = (index: number) => {
    setActiveMenu(index === activeMenu ? null : index);
  };

  const menuItems = ['상의', '하의', '신발', '악세서리', '전체'];

  return (
    <div className={`${closetMenuStyle.navbarContainer}`}>
      <div className={`${closetMenuStyle.navbar}`}>
        {menuItems.map((menuItem, index) => (
          <button key={index} onClick={() => handleMenuClick(index)}>
            {menuItem}
          </button>
        ))}


        {/* 이미 체크된 메뉴가 아닐 경우 클릭한 버튼 위치로 이동 */}
        <div
          className={`${closetMenuStyle.activeMenuBlock} ${activeMenu !== null ? 'active' : ''}`}
          style={{ left: activeMenu !== null ? `${activeMenu * 20}%` : '0' }}
        > {activeMenu !== null && <h2>{menuItems[activeMenu]}</h2>} </div>
      </div>

      
    </div>
  );
};

export default NavigationBar;