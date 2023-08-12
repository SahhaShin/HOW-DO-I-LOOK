import React, { useState, useRef, useCallback } from 'react';

//css
import liveMenuStyle from "./LiveMenu.module.css";

const LiveMenu = () => {

    const [selectedMenu, setSelectedMenu] = useState(null);

    const handleMenuClick = (menu) => {
      setSelectedMenu(menu);
    };
  
    return (
      <div className={`${liveMenuStyle.sidebar}`}>
        <div>
            <button onClick={() => handleMenuClick("Menu 1")}><img src={process.env.PUBLIC_URL + '/img/menuIcon/menu1_closet.png'}/></button>
            <button onClick={() => handleMenuClick("Menu 2")}><img src={process.env.PUBLIC_URL + '/img/menuIcon/menu2_search.png'}/></button>
            <button onClick={() => handleMenuClick("Menu 3")}><img src={process.env.PUBLIC_URL + '/img/menuIcon/menu3_set.png'}/></button>
            <button onClick={() => handleMenuClick("Menu 4")}><img src={process.env.PUBLIC_URL + '/img/menuIcon/menu4_info.png'}/></button>
            <button onClick={() => handleMenuClick("Menu 5")}><img src={process.env.PUBLIC_URL + '/img/menuIcon/menu5_exit.png'}/></button>
        </div>
        {selectedMenu === "Menu 1" && <div className={`${liveMenuStyle.menuContent}`}>
            <div className={`${liveMenuStyle.contentHeader}`}>
                <div><p>HOST CLOSET</p></div>
                <img onClick={()=>{setSelectedMenu(null)}} src={process.env.PUBLIC_URL + '/img/menuIcon/closeBtn.png'}/>
            </div>  

            {/* 전체 옷 리스트 */}
            <div className={`${liveMenuStyle.closetList}`}>
                {
                    [1,2,3,4,5,6,7].map((item)=>{
                        return(
                            <div className={`${liveMenuStyle.clothItem}`}>
                                item
                            </div>
                        );
                    })
                }    
            </div>  
        </div>}
        {selectedMenu === "Menu 2" && <div className={`${liveMenuStyle.menuContent}`}>
            <div className={`${liveMenuStyle.contentHeader}`}>
                <p>SEARCH</p>
                <img onClick={()=>{setSelectedMenu(null)}} src={process.env.PUBLIC_URL + '/img/menuIcon/closeBtn.png'}/>
            </div> 
        </div>}
        {selectedMenu === "Menu 3" && <div className={`${liveMenuStyle.menuContent}`}>
            <div className={`${liveMenuStyle.contentHeader}`}>
                <p>SET</p>
                <img onClick={()=>{setSelectedMenu(null)}} src={process.env.PUBLIC_URL + '/img/menuIcon/closeBtn.png'}/>
            </div> 
        </div>}
        {selectedMenu === "Menu 4" && <div className={`${liveMenuStyle.menuContent}`}>
            <div className={`${liveMenuStyle.contentHeader}`}>
                <p>INFO</p>
                <img onClick={()=>{setSelectedMenu(null)}} src={process.env.PUBLIC_URL + '/img/menuIcon/closeBtn.png'}/>
            </div>    
        </div>}
      </div>
    );
    
}

export default LiveMenu;