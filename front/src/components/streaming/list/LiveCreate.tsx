import React, { useState, useRef, useCallback, useEffect } from "react";

//css
import liveCreateStyle from "./LiveCreate.module.css";
import styled from "styled-components";

//redux
import { useSelector, useDispatch } from "react-redux";
import { action, changeModalOpen } from "../../../store/LiveSlice";

//slick import
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const LiveCreate = () => {
  console.log("render");
  //redux 관리
  let state = useSelector((state: any) => state.live);
  let dispatch = useDispatch();

  // 슬라이드 설정
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  //유저정보
  const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));

  //문구 입력
  const [roomId, setRoomId] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [gender, setGender] = useState("X");
  useEffect(() => {
    //리스트 가져오기
    if (!state.create) {
      const liveRoom = JSON.parse(sessionStorage.getItem("liveRoom"));
      console.log(liveRoom);
      setRoomId(liveRoom.roomId);
      setTitle(liveRoom.title);
      setType(liveRoom.type);
      setMinAge(liveRoom.minAge);
      setMaxAge(liveRoom.maxAge);
      setGender(liveRoom.gender);
      // sessionStorage.removeItem("liveRoom");
    }

    //회원 follow목록 가져오기
  }, [state.ModalOpen]);

  //방 만들기
  function createRoom() {
    console.log(state.create);
    if (state.create) {
      dispatch(
        action.createLiveList({
          title: title,
          type: type,
          hostId: loginUser.id,
          minAge: minAge,
          maxAge: maxAge,
          gender: gender,
        })
      );
    } else {
      dispatch(
        action.changeLiveInfo({
          roomId: roomId,
          title: title,
          type: type,
          hostId: loginUser.id,
          minAge: minAge,
          maxAge: maxAge,
          gender: gender,
        })
      );
    }
    // window.location.href = `${process.env.REACT_APP_FRONT}/liveList`;
  }

  //모달 끄기
  function closeModel() {}

  useEffect(() => {}, []);

  return (
    <div className={`${liveCreateStyle.modal}`}>
      {/* 입력창 */}

      <div className={``}>
        <div>
          <div>
            <label htmlFor="title" className={`${liveCreateStyle.lable}`}>
              <p>Title</p>
            </label>
            <input
              type="text"
              id="title"
              placeholder="방 이름을 입력해주세요"
              className={`${liveCreateStyle.input}`}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div>
            <label htmlFor="type" className={`${liveCreateStyle.lable}`}>
              <p>Type</p>
            </label>
            <input
              type="text"
              id="type"
              placeholder="방 타입을 입력해주세요"
              className={`${liveCreateStyle.input}`}
              onChange={(e) => setType(e.target.value)}
              value={type}
            />
            {false && <div>사용하실 수 없는 타입입니다.</div>}
          </div>
          <div>
            <label htmlFor="minAge" className={`${liveCreateStyle.lable}`}>
              <p>최소나이</p>
            </label>
            <input
              type="number"
              id="minAge"
              onChange={(e) => setMinAge(e.target.value)}
              placeholder="입장 최소 나이를 선택해 주십시오"
              className={`${liveCreateStyle.input}`}
              value={minAge}
            />
            {false && <div>사용하실 수 없는 나이조건입니다.</div>}
          </div>
          <div>
            <label htmlFor="maxAge" className={`${liveCreateStyle.lable}`}>
              <p>최고나이</p>
            </label>
            <input
              type="number"
              id="maxAge"
              placeholder="입장 최고 나이를 선택해 주십시오"
              className={`${liveCreateStyle.input}`}
              onChange={(e) => setMaxAge(e.target.value)}
              value={maxAge}
            />
          </div>

          <div>
            <label htmlFor="gender" className={`${liveCreateStyle.lable}`}>
              <p>입장 가능 성별</p>
            </label>
            <div className={`${liveCreateStyle.half}`}>
              <input
                type="radio"
                id="MALE"
                name="gender"
                value="MALE"
                onClick={(e) => setGender(e.target.value)}
                checked={gender == "MALE"}
              />
              <label htmlFor="MALE">남자</label>

              <input
                type="radio"
                id="FEMALE"
                name="gender"
                value="FEMALE"
                onClick={(e) => setGender(e.target.value)}
                checked={gender == "FEMALE"}
              />
              <label htmlFor="FEMALE">여자</label>
              <input
                type="radio"
                id="X"
                name="gender"
                value="X"
                onClick={(e) => setGender("X")}
                checked={gender == "X"}
              />
              <label htmlFor="X">상관없음 </label>
            </div>
          </div>
        </div>
      </div>

      {/* 버튼*/}
      <div className={`${liveCreateStyle.rightBtns}`}>
        <button
          onClick={() => {
            dispatch(changeModalOpen(false));
          }}
        >
          취소
        </button>
        <button onClick={() => createRoom()}>업로드</button>
      </div>
    </div>
  );
};

export default LiveCreate;
