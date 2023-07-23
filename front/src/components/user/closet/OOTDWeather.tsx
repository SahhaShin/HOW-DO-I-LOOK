import React, { useEffect, useState } from "react";

// css
import weatherStyle from "./OOTDWeather.module.css";


// 컴포넌트
import TodayWether from "../../../hook/TodayWeather";
import ChangeCityName from "../../../hook/ChangeCityName";

const OOTDWeather = () => {

    //오늘의 날씨 정보를 가져온다.
    let todayWeather_info = TodayWether();
    let citynName = ChangeCityName();


    //오늘의 날짜를 구한다.
    let today = new Date(); //Sun Jul 23 2023 17:59:23 GMT+0900 (한국 표준시)
    


    //가져온 정보를 담을 곳
    type todayWeatherType = {baseDate:string, baseTime:string, category:string, fcstDate:string, fcstTime:string, fcstValue:string, xn:String, ny:string}
    let [todayWeather, setTodayWeather] = useState<todayWeatherType[]>([]);


    //빈 배열이 아니라 실제 값이 넘어오면 state 셋팅해준다.
    useEffect(()=>{
        if(todayWeather_info.length!==0){
            setTodayWeather(todayWeather_info);
        }
    },[todayWeather_info])


    //화면 단
    return(
        <div className={`${weatherStyle.weatherContainer}`}>

            <div className={`${weatherStyle.weatherImg}`}>

            </div>

            <div className={`${weatherStyle.weatherContent}`}>
                {/* undefined가 아닐 시 값을 보여줘라. 이거 없음 에러난다. */}
                {
                    todayWeather.length!==0 ? 
                    <div className={`${weatherStyle.weatherContent}`}>
                        { 
                            todayWeather[0]?.fcstValue!==undefined ?
                            <div>
                                <p>Have a good day!</p>
                                <p>{citynName.si} {todayWeather[0].fcstValue}℃</p>
                            </div>
                            :"" 
                        }
                    </div> : 
                    
                    <div>데이터를 받아오는 중입니다.</div>
                }
            </div>
        </div>
    );
}


export default OOTDWeather;