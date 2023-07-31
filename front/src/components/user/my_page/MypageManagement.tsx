import React, { useState } from 'react';

//css
import mypageManagementStyle from "./MypageManagement.module.css";

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {changeFollowModalOpen, changeFollowMode, changeMypageMode} from "../../../store/MypageSlice";

const MypageManagement = () => {
    
    //정보 보기(1) or 수정 여부(2)
    let [manageType, setManageType] = useState<number>(1);

    return(
        <div className={`${mypageManagementStyle.total}`}>
            {
                /* 정보 보기(1) 정보 수정(2) */
                manageType===1?
                <div className={`${mypageManagementStyle.read}`}>
                    {/* 이름 */}
                    <div>
                        <p>이름</p>
                        <input type='text' value="신산하" readOnly/>
                    </div>

                    {/* 닉네임 */}
                    <div>
                        <p>닉네임</p>
                        <input type='text' value="미팅만 50번" readOnly/>
                    </div>

                    {/* 아이디 */}
                    <div>
                        <p>아이디</p>
                        <input type='text' value="sanha" readOnly/>
                    </div>

                    {/* 이메일 */}
                    <div>
                        <p>이메일</p>
                        <input type='email' value="tksgk2598@naver.com" readOnly/>
                    </div>

                    {/* 생년월일 */}
                    <div>
                        <p>생년월일</p>
                        <input type='text' value="98.04.26" readOnly/>
                    </div>

                    {/* 성별 */}
                    <div>
                        <p>성별</p>
                        <input type='text' value="여자" readOnly/>
                    </div>

                    {/* 옷장 접근 권한 */}
                    <div>
                        <p>옷장 접근 권한</p>
                        <input type='text' value="전체" readOnly/>
                    </div>
                    

                </div>:
                <div className={`${mypageManagementStyle.modify}`}>

                    {/* 닉네임 */}
                    <div>
                        <p>닉네임</p>
                        <input type='text' value="미팅만 50번"/>
                    </div>

                    {/* 이메일 */}
                    <div>
                        <p>이메일</p>
                        <input type='email' value="tksgk2598@naver.com"/>
                    </div>

                    {/* 비밀번호 */}
                    <div>
                        <p>비밀번호</p>
                        <input type='password' value="1234"/>
                    </div>
                    
                    {/* 옷장 접근 권한 */}
                    <div>
                        <p>옷장 접근 권한</p>
                        <select>
                            <option>전체</option>
                            <option>팔로잉</option>
                            <option>방송 참여자</option>
                        </select>
                    </div>

                </div>
            }

            {/* 버튼 2개 */}
            <div className={`${mypageManagementStyle.btns}`}>
                {   manageType===1?
                    <div>
                        <button onClick={()=>{setManageType(2)}}>수정하기</button>
                        <button>탈퇴하기</button>
                    </div>:
                    <div>
                        <button>수정</button>
                        <button onClick={()=>{setManageType(1)}}>취소</button>
                    </div>
                }
            </div>
        </div>
    );
}

export default MypageManagement;