import React, { useState, useEffect } from "react";

//css
import mypageManagementStyle from "./MypageManagement.module.css";

//redux
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { action_mypage, changeManageType } from "../../../store/MypageSlice";

import {action_user} from "../../../store/UserSlice"

const MypageManagement = () => {
  //redux 관리
  let state = useSelector((state: any) => state.mypage);
  let dispatch = useDispatch();

  // 일단 로그인한 유저의 아이디
  const loginUser = JSON.parse(window.sessionStorage.getItem("loginUser"));
  // 내가 보고있는 유저의 아이디
  const { watchingUserId } = useParams();

  useEffect(() => {
    console.log("!!!!!!")
    console.log(watchingUserId)
    console.log(Number(watchingUserId))
  }, [])

  const [userUpdateData, setUserUpdateData] = useState({
    name: state.targetUser.name,
    nickname: state.targetUser.nickname,
    age: state.targetUser.age,
    gender: state.targetUser.gender,
    closetAccess: state.targetUser.closetAccess
  });

  // userUpdateData 변화 감지 함수
  const senseUserUpdateData = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setUserUpdateData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className={`${mypageManagementStyle.total}`}>
      {/* 정보 보기(1) 정보 수정(2) */
      state.manageType === 1
        ? <div className={`${mypageManagementStyle.auth}`}>
            {/* 안내문구 */}
            <div>비밀번호를 입력해주세요</div>

            {/* 입력창 */}
            <div>
              <input type="password" />
            </div>
          </div>
        : state.manageType === 2
          ? <div className={`${mypageManagementStyle.read}`}>
              {/* 이름 */}
              <div>
                <p>이름</p>
                <input type="text" value={state.targetUser.name} readOnly />
              </div>

              {/* 닉네임 */}
              <div>
                <p>닉네임</p>
                <input type="text" value={state.targetUser.nickname} readOnly />
              </div>

              {/* 이메일 */}
              <div>
                <p>이메일</p>
                <input type="email" value={state.targetUser.email} readOnly />
              </div>

              {/* 생년월일 */}
              <div>
                <p>나이</p>
                <input type="number" value={state.targetUser.age} readOnly />
              </div>

              {/* 성별 */}
              <div>
                <p>성별</p>
                <input
                  type="text"
                  value={state.targetUser.gender === "MALE" ? "남성" : "여성"}
                  readOnly
                />
              </div>

              {/* 옷장 접근 권한 */}
              <div>
                <p>옷장 접근 권한</p>
                <input
                  type="text"
                  value={state.targetUser.closetAccess}
                  readOnly
                />
              </div>
            </div>
          : <div className={`${mypageManagementStyle.modify}`}>
              {/* 이름 */}
              <div>
                <p>이름</p>
                <input
                  onChange={event => {
                    senseUserUpdateData(event);
                  }}
                  type="text"
                  value={userUpdateData.name || ""}
                  name="name"
                />
              </div>

              {/* 닉네임 */}
              <div>
                <p>닉네임</p>
                <input
                  onChange={event => {
                    senseUserUpdateData(event);
                  }}
                  type="text"
                  value={userUpdateData.nickname || ""}
                  name="nickname"
                />
              </div>

              {/* 나이 */}
              <div>
                <p>나이</p>
                <input
                  onChange={event => {
                    senseUserUpdateData(event);
                  }}
                  type="number"
                  value={userUpdateData.age || ""}
                  name="age"
                />
              </div>

              {/* 성별 */}
              <div>
                <p>성별</p>
                <select
                  onChange={event => {
                    senseUserUpdateData(event);
                  }}
                  name="gender"
                >
                  <option value="MALE">남성</option>
                  <option value="FEMALE">여성</option>
                </select>
              </div>

              {/* 옷장 접근 권한 */}
              <div>
                <p>옷장 접근 권한</p>
                <select
                  onChange={event => {
                    senseUserUpdateData(event);
                  }}
                  name="closetAccess"
                >
                  <option value="PUBLIC">PUBLIC</option>
                  <option value="PRIVATE">PRIVATE</option>
                </select>
              </div>
            </div>}

      {/* 버튼 2개 */}
      <div className={`${mypageManagementStyle.btns}`}>
        {state.manageType === 1
          ? <div>
              <button
                onClick={() => {
                  dispatch(changeManageType(2));
                }}
              >
                인증하기
              </button>
            </div>
          : state.manageType === 2
            ? <div>
                <button
                  onClick={() => {
                    dispatch(changeManageType(3));
                  }}
                >
                  수정하기
                </button>
                <button onClick={() => {
                  dispatch(
                    action_user.Logout(loginUser.id)
                  )
                  dispatch(action_mypage.quitUser(loginUser.id));
                }}>탈퇴하기</button>
              </div>
            : <div>
                <button
                  onClick={() => {
                    dispatch(
                      action_mypage.updateUserInfo({ watchingUserId, userUpdateData })
                    );

                    dispatch(changeManageType(2));
                  }}
                >
                  수정
                </button>
                <button
                  onClick={() => {
                    dispatch(changeManageType(2));
                  }}
                >
                  취소
                </button>
              </div>}
      </div>
    </div>
  );
};

export default MypageManagement;
