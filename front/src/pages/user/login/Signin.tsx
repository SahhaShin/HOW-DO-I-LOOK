import React, { useEffect, useState } from "react";

//css
import SingninStyle from "./Signin.module.css";

//redux
import { useSelector, useDispatch } from "react-redux";

//컴포넌트
import Signin from "../../../components/user/login/signin";

import Header from "../../../components/util/Header";




const SigninPage = () => {

    //redux 관리
    let state = useSelector((state: any) => state.closet);
    let dispatch = useDispatch();

    // 이미지 관리


    return (
        <div className={`${SingninStyle.wrapper}`}>
            <Header></Header>
            <Signin></Signin>

        </div>

    );
}


export default SigninPage;