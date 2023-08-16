import React, { useState } from "react";
import introStyle from "./IntroArea.module.css";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
  action,
  setListType,
  setSearch,
  setAllPage,
  changePage,
} from "../../../store/LiveSlice";

const IntroArea = ( setPage) => {
  //redux 관리
  let state = useSelector((state: any) => state.live);
  let dispatch = useDispatch();

  let loginUser = JSON.parse(sessionStorage.getItem("loginUser"));
  const [searchInput, setSearchInput] = useState<string>("");
  const [type, setType] = useState("");

  function getList() {
    console.log("input : " + searchInput)
    console.log("type : " + type)

    dispatch(
      action.getLiveList({
        following: (state.userId == "") ?false : true,
        userId: loginUser.id,
        type: type,
        search: searchInput,
        pageNum: state.page,
      })
    );
    dispatch(changePage(0));
    console.log(state.page)
  }

  function clickH(hash:String){
    console.log(searchInput)
    if(type == hash){
      setType("")
    }
    else { 
      setType(hash)
    }
    dispatch(
      action.getLiveList({
        following: (state.userId == "") ?false : true,
        userId: loginUser.id,
        type: (type == hash)? "" : hash,
        search: searchInput,
        pageNum: 0,
      })
    );
    dispatch(changePage(0));
    dispatch(setListType((type == hash)? "" : hash));
    dispatch(setSearch(searchInput));
    console.log("area state : " + state.page)
    console.log("type state : " + state.type)
    console.log("searchInput state : " + state.searchInput)
  }

  function typeIn(e){
    let inputNull = false;
    if(e.target.value == ""){
      inputNull = true;
    }
    setSearchInput(inputNull? "" : e.target.value);
    dispatch(
      action.getLiveList({
        following: (state.userId == "") ?false : true,
        userId: loginUser.id,
        type: type,
        search: inputNull? "" : e.target.value,
        pageNum: 0,
      })
    );
    dispatch(changePage(0));
    dispatch(setListType(type));
    dispatch(setSearch(searchInput));
    console.log("area state : " + state.page)
    console.log("type state : " + state.type)
    console.log("searchInput state : " + state.searchInput)
  }

  return (
    <div className={`${introStyle.total}`}>
      <div className={`${introStyle.firstArea}`}>
        <div className={`${introStyle.intro}`}>
          <div>
            {loginUser.nickname}님이 궁금한 오늘의 라이브는 무엇인가요?
            <div className={`${introStyle.light}`}></div>
          </div>
        </div>
      </div>

      <div className={`${introStyle.search}`}>
        <input
          value={searchInput}
          onChange={(e) => {
            typeIn(e);
          }}
          placeholder="키워드를 입력하세요 "
          type="text"
        />
        <button
          onClick={() => {
            getList();
          }}
        >
          검색
        </button>
      </div>

      <div className={`${introStyle.tag}`}>
        <button
          onClick={(e) => {
            clickH("DATE");
          }}
        >
          {type == "DATE" ? (
            <div style={{ color: "black" }}>#DATE</div>
          ) : (
            `#DATE`
          )}
        </button>
        <button
          onClick={(e) => {
            clickH("DAILY");
          }}
        >
          {type == "DAILY" ? (
            <div style={{ color: "black" }}>#DAILY</div>
          ) : (
            `#DAILY`
          )}
        </button>
        <button
          onClick={(e) => {
            clickH(`TRAVEL`);
          }}
        >
          {type == "TRAVEL" ? (
            <div style={{ color: "black" }}>#TRAVEL</div>
          ) : (
            `#TRAVEL`
          )}
        </button>
        <button
          onClick={(e) => {
            clickH(`EXERCISE`);
          }}
        >
          {type == "EXERCISE" ? (
            <div style={{ color: "black" }}>#EXERCISE</div>
          ) : (
            `#EXERCISE`
          )}
        </button>
        <button
          onClick={(e) => {
            clickH(`INTERVIEW`);
          }}
        >
          {type == "INTERVIEW" ? (
            <div style={{ color: "black" }}>#INTERVIEW</div>
          ) : (
            `#INTERVIEW`
          )}
        </button>
      </div>

      <div className={`${introStyle.hr}`}></div>
    </div>
  );
};

export default IntroArea;
