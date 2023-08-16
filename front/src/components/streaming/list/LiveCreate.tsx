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
  const [type, setType] = useState("DATE");
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
    console.log(minAge);
    console.log(maxAge);
    console.log(minAge > maxAge)
    console.log(Number(minAge) > Number(maxAge))
    if (state.create) {
      if(title == ""){
        alert("방 타이틀을 입력해 주십시오.")
        return
      }
      else if (Number(minAge) > Number(maxAge)){
        alert("나이 제한을 잘못 입력하셨습니다.")
        return 
      }
       
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

  function clickH(hash){
    setType(hash)
  }

  function clickG(hash){
    setGender(hash)
  }
  
  function selectedMenu(menu){
    if(menu==="DATE"){
      return liveCreateStyle.DATE;
    }
    else if(menu==="DAILY"){
      return liveCreateStyle.DAILY;
    }
    else if(menu==="TRAVEL"){
      return liveCreateStyle.TRAVEL;
    }
    else if(menu==="EXERCISE"){
      return liveCreateStyle.EXERCISE;
    }
    else if(menu==="INTERVIEW"){
      return liveCreateStyle.INTERVIEW;
    }
  }




  return (
    <div className={`${liveCreateStyle.createTotal}`}>
      {/* 입력창 */}
      <h1>방 생성하기</h1>

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
          <label htmlFor="title" className={`${liveCreateStyle.lable}`}>
              <p>Type</p>
            </label>

      <div className={`${liveCreateStyle.tag}`}>
        <button
          style={type == "DATE" ?{color: "white", backgroundColor:"#EAA595"}:null}
          onClick={(e) => {
            clickH(`DATE`);
          }}
        >
          #DATE
        </button>

        <button
          style={type == "DAILY" ?{color: "white", backgroundColor:"#EAA595"}:null}
          onClick={(e) => {
            clickH(`DAILY`);
          }}
        >
          #DAILY
        </button>

        <button
          style={type == "TRAVEL" ?{color: "white", backgroundColor:"#EAA595"}:null}
          onClick={(e) => {
            clickH(`TRAVEL`);
          }}
        >
          #TRAVEL
        </button>
        <button
         style={type == "EXERCISE" ?{color: "white", backgroundColor:"#EAA595"}:null}
          onClick={(e) => {
            clickH(`EXERCISE`);
          }}
        >
          #EXERCISE
        </button>
        <button
          style={type == "INTERVIEW" ?{color: "white", backgroundColor:"#EAA595"}:null}
          onClick={(e) => {
            clickH(`INTERVIEW`);
          }}
        >
          #INTERVIEW
        </button>
      </div>
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
            <div className={`${liveCreateStyle.tag}`}>

        <button
          style={gender == "MALE" ?{color: "white", backgroundColor:"#EAA595"}:null}
          onClick={(e) => {
            clickG(`MALE`);
          }}
        >
          #남자만
        </button>


        <button
         style={gender == "FEMALE" ?{color: "white", backgroundColor:"#EAA595"}:null}
          onClick={(e) => {
            clickG(`FEMALE`);
          }}
        >
          #여자만
        </button>

        <button
        style={gender == "X" ?{color: "white", backgroundColor:"#EAA595"}:null}
          onClick={(e) => {
            clickG(`X`);
          }}
        >
          #상관없음
        </button>
       
      </div>
          </div>
        </div>
      </div>

      {/* 버튼*/}
      <div className={`${liveCreateStyle.roomCreate}`}>
        <button 
          onClick={() => {
            dispatch(changeModalOpen(false));
          }}
        >
          취소
        </button>
        <button onClick={() => createRoom()}>방 만들기</button>
      </div>
    </div>
  );
};

export default LiveCreate;
