import React, { useEffect, useState } from "react";

//redux
import { useSelector, useDispatch } from "react-redux";
import { action } from "../../store/UserSlice";


import { getCookie } from "../../hook/Cookie";


// import { isVisible } from "@testing-library/user-event/dist/types/utils";

const Home: React.FC = () => {
    const dispatch = useDispatch();
    let user = useSelector((state:any)=>state.user);
    
    useEffect(() => {
        console.log("페이지 로드")

        //회원정보 가져오기 
        const sEmail = getCookie("new_social_user_email")
        const bEmail = getCookie("new_basic_user_email")
        if (typeof sEmail != 'undefined'){
            console.log("sEmail")
            dispatch(
            action.GetUserInfo(sEmail)
            )
         }
        else if (typeof bEmail != 'undefined'){
            console.log("bEmail")
            dispatch(
                action.GetUserInfo(bEmail)
            )
        }

    }, []);



  return (
    <div>
      <h1>홈</h1>
      <div>
        `${user.id}`
      </div>

    </div>
  );
};

export default Home;
