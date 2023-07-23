import React, { useEffect, useState } from "react";

//css
import closetStyle from "./Closet.module.css";

//컴포넌트
import OOTDWeather from "../../../components/user/closet/OOTDWeather";
import OOTDCoordi from "../../../components/user/closet/OOTDCoordi";


const Closet = () => {
    return(
        <div>
            <div className={`${closetStyle.header}`}>header</div>
            
            <div className={`${closetStyle.main}`}>
                
                {/* 메인은 두 영역으로 나뉨 */}
                
                <div className={`${closetStyle.menuArea}`}>
                    {/* floating menu start */}
                    menu area
                </div>

                <div className={`${closetStyle.contentsArea}`}>
                   
                    {/* main contents start */}

                    <div className={`${closetStyle.title}`}>OOTD</div>

                    <OOTDWeather/>
                    <div className={`${closetStyle.closetContainer}`}>
                        <div className={`${closetStyle.closet}`}><OOTDCoordi/></div>
                        <div className={`${closetStyle.closet}`}><OOTDCoordi/></div>
                    </div>
                    
                </div>
            </div>

            <div className={`${closetStyle.footer}`}>footer</div>

            
        </div>
    );
}


export default Closet;