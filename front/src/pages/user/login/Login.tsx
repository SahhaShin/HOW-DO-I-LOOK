import React, { useEffect, useState } from "react";

//css
//import closetStyle from "./Login.css";

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {action} from "../../../store/UserSlice";

//컴포넌트
import Login from "../../../components/user/login/login";




const LoginPage = () => {

    //redux 관리
    let state = useSelector((state:any)=>state.closet);
    let dispatch = useDispatch();

    // 이미지 관리


    return(
        <div>
            <Login></Login>

        </div>
        
    );
}


export default LoginPage;