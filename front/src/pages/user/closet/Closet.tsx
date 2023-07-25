import React, { useEffect, useState } from "react";

//css
import closetStyle from "./Closet.module.css";

//컴포넌트
import OOTDWeather from "../../../components/user/closet/OOTDWeather";
import OOTDCoordi from "../../../components/user/closet/OOTDCoordi";
import CLOSETMenu from "../../../components/user/closet/CLOSETMenu";
import CLOSETSlot from "../../../components/user/closet/CLOSETSlot";
import Pagination from "../../../components/util/Pagination";




const Closet = () => {

    // 페이지네이션, 옷 관리
    const [clothes, setPosts] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;


    return(
        <div>
            <div className={`${closetStyle.header}`}>header</div>
            
            <div className={`${closetStyle.main}`}>
                
                {/* 메인은 두 영역으로 나뉨 */}
                
                <div className={`${closetStyle.menuArea}`}>
                    {/* floating menu start */}
                    menu area
                </div>

                {/* 메인 컨텐츠 시작 */}
                <div className={`${closetStyle.contentsArea}`}>

                    <div className={`${closetStyle.title}`}>CLOSET</div>

                    
                    {/* 상의 하의 신발 악세서리 전체 */}
                    <CLOSETMenu/>

                    {/* 추가 버튼 */}
                    <div className={`${closetStyle.addBtnContainer}`}><button className={`${closetStyle.addBtn}`}>추가</button></div>

                    {/* 옷장 */}
                    <div className={`${closetStyle.closetList}`}>
                        <CLOSETSlot/>
                        <CLOSETSlot/>
                        <CLOSETSlot/>
                        <CLOSETSlot/>

                        <CLOSETSlot/>
                        <CLOSETSlot/>
                        <CLOSETSlot/>
                        <CLOSETSlot/>
                    </div>

                    {/* 페이지네이션   20을 {clothes.length}로 바꿔야 함 */}
                    <div className={`${closetStyle.paginationContainer}`}>
                        <Pagination
                            total={20}
                            limit={limit}
                            page={page}
                            setPage={setPage}
                        />
                    </div>
                    
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