import React, { useState } from "react";
import introStyle from "./IntroArea.module.css";

//redux
import { useSelector, useDispatch } from "react-redux";
import { action } from "../../../store/LiveSlice";

const IntroArea = () => {
  //redux 관리
  let state = useSelector((state: any) => state.live);
  let dispatch = useDispatch();

  let loginUser = JSON.parse(sessionStorage.getItem("loginUser"));
  const [searchInput, setSearchInput] = useState<string>("");

  function sendHash() {
    // {hashtag, size, page}
    console.log(`1 ${searchInput}`);

    // let hashremove = searchInput.replace("#","");
    const hashList = searchInput.split(" ");

    //해시태그 리스트 빈칸 없애고, 앞에 hashtag=??? 이런 줄줄이 글 만들기
    //?hashtag=신발&hashtag=조던
    let count = 0;
    let hashquery = "";
    for (let i = hashList.length; i >= 0; i--) {
      if (
        hashList[i] === " " ||
        hashList[i] === "" ||
        hashList[i] === undefined
      ) {
        continue;
      } else {
        let target = hashList[i].replace("#", "hashtag=");

        if (count === 0) {
          hashquery = target;
          count++;
          console.log(`3 ${hashquery}`);
        } else {
          hashquery = hashquery + "&" + target;
          count++;
          console.log(`4 ${hashquery}`);
        }
      }
    }

    console.log(hashquery);

    let info = {
      hashtag: hashquery,
      size: 10,
      page: 1,
    };

    dispatch(action.searchHash(info));
  }

  return (
    <div className={`${introStyle.total}`}>
      <div className={`${introStyle.firstArea}`}>
        <div className={`${introStyle.intro}`}>
          <div>
            {loginUser.nickname}님이 궁금한 오늘의 방송은 무엇인가요?
            <div className={`${introStyle.light}`}></div>
          </div>
        </div>
      </div>

      <div className={`${introStyle.search}`}>
        <input
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          placeholder="#DATE #DAILY #TRAVEL"
          type="text"
        />
        <button
          onClick={() => {
            sendHash();
          }}
        >
          검색
        </button>
      </div>

      <div className={`${introStyle.tag}`}>
        <button
          onClick={(e) => {
            setSearchInput(searchInput + ` #DATE`);
          }}
        >
          #DATE
        </button>
        <button
          onClick={(e) => {
            setSearchInput(searchInput + ` #DAILY`);
          }}
        >
          #DAILY
        </button>
        <button
          onClick={(e) => {
            setSearchInput(searchInput + ` #TRAVEL`);
          }}
        >
          #TRAVEL
        </button>
        <button
          onClick={(e) => {
            setSearchInput(searchInput + ` #EXERCISE`);
          }}
        >
          #EXERCISE
        </button>
        <button
          onClick={(e) => {
            setSearchInput(searchInput + ` #INTERVIEW`);
          }}
        >
          #INTERVIEW
        </button>
      </div>

      <div className={`${introStyle.hr}`}></div>
    </div>
  );
};

export default IntroArea;
