import { useState, useEffect } from "react";
import axios from "axios";

//훅 불러오기
import useGeolocation from './UseGeolocation.tsx';

//경도 위도를 도시 이름으로 바꿔주기(카카오 api, 역지오코딩)
interface City{
    si:string;
    gu:string;
    dong:string;
}

const ChangeCityName = ()=>{

    //현재 내 위치 불러오기 (경도 위도)
    const location = useGeolocation();
    const latitude:number = parseFloat(JSON.stringify(location.coordinates?.lat));
    const longitude:number = parseFloat(JSON.stringify(location.coordinates?.lng));


    //도시 한글 정보 저장
    let [city, setCity] = useState<City>({
        si:"인천광역시",
        gu:"연수구",
        dong:"송도동"
    });


    //카카오 api 호출해 경도 위도 정보를 한글 도시 정보로 가져옴
    const mapApi = async () => {
        const apiKey:string = String(process.env.REACT_APP_KAKAO_REVERSEGEO); //API키
        
        try {
          let response = await axios
            .get(
              `https://dapi.kakao.com/v2/local/geo/coord2address.json`,
              {
                headers: {
                  Authorization: `KakaoAK ${apiKey}`,  
                },
                params:{
                    //string 타입으로 전달해주면 결과 안나옴
                    x: longitude,
                    y: latitude,
                },
              },
            )
            .then(response => {
              if(location.loaded){
                const location = response.data.documents[0];

                //내 위치의 도시 다시 셋팅
                setCity({
                  si: location.address.region_1depth_name,
                  gu: location.address.region_2depth_name,
                  dong: location.address.region_3depth_name,
                });
              }
              
            });
        } catch (error) {
          console.log(error);
        }
      };

      useEffect(()=>{
        mapApi()
      },[location.loaded])

      return city;
}

export default ChangeCityName;