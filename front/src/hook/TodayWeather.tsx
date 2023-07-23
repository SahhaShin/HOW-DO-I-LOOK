// 해당 파일은 오늘의 날씨 정보를 알려줍니다.
// 공공데이터 포탈 기상청_단기예보 ((구)_동네예보) 조회서비스를 이용합니다.

import { useEffect, useState } from "react";
import useGeolocation from "./useGeolocation";
import axios from "axios";

const TodayWether = ()=>{

    //현재 나의 위치 경도 위도 불러오기 (useGeolocation)
    let geoloaction = useGeolocation();
    let nx:number = Math.floor(Number(geoloaction.coordinates?.lat)); //경도
    let ny:number = Math.floor(Number(geoloaction.coordinates?.lng)); //위도


    //오늘의 날짜 구하기 (js)
    let today = new Date();   
    let year:string = String(today.getFullYear()); // 년도
    let month:string = String(today.getMonth() + 1);  // 월
    let date:string = String(today.getDate());  // 일


    //기상청_단기예보 ((구)_동네예보) api로 전달해줄 파라미터 정제하기 (한자리 수 월, 일은 0을 붙여주는 작업)
    if(month.length===1) month='0'+month;
    if(date.length===1) date='0'+date;
    let ymd:string = year+month+date; //20230723


    //기상청_단기예보 ((구)_동네예보) api에서 얻어온 리스트 정보 담을 곳
    type todayWeatherType = {baseDate:string, baseTime:string, category:string, fcstDate:string, fcstTime:string, fcstValue:string, xn:String, ny:string}
    let [todayWether, setTodayWeather] = useState<todayWeatherType[]>([]);


    //날씨 정보 불러오기 ${ymd}로 바꿔야함. 새벽에는 날씨가 안나와서 데이터를 못가져오는 에러가 있음
    const apiKey:string = String(process.env.REACT_APP_WEATHER);
    const url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${apiKey}&numOfRows=10&pageNo=1
    &base_date=20230723&base_time=0500&nx=${nx}&ny=${ny}&dataType=JSON`;
    const wetherApi = async () => {await axios.get(url).then((res)=>{
        console.log(res);
        if(geoloaction.loaded){
            setTodayWeather(res.data.response.body.items.item);
        }
    })}


    //geoloaction가 loaded 상태이면 api를 불러온다.
    useEffect(()=>{
        wetherApi()
    },[geoloaction.loaded])


    return todayWether;
}

export default TodayWether;