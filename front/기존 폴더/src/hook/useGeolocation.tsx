import { useState, useEffect } from "react";

//주요 구문 : 현재 위치를 가져오는 코드
// navigator.geolocation.getCurrentPosition(success, error, [options])

interface locationType{
    loaded : boolean;
    coordinates?:{lat: number; lng: number}; //좌표 : 명시해도 되고 안해도 상관없다. (옵션)
    error?: {code:number; message:string}; //에러 : 명시해도 되고 안해도 상관없다. (옵션)
}

const useGeolocation = () => {

    const [location, setLocation] = useState<locationType>({
        //초기값
        loaded: false,
        coordinates:{lat: 0, lng:0, }
    })


    //성공에 대한 로직
    const onSuccess = (location:{coords:{latitude: number; longitude: number;};})=>{
        setLocation({
            loaded: true,
            coordinates:{lat: location.coords.latitude, lng:location.coords.longitude,}
        })
    }

    //에러에 대한 로직
    const onError = (error: {code:number; message: string;})=>{
        setLocation({
            loaded: true,
            error,
        })
    }

    useEffect(()=>{
        //navigator 객체 안에 geolocation이 없다면 위치 정보가 없는 것이다.
        if(!("geolocation" in navigator)){
            onError({code:0, message:"Geolocation not supported",})
        }

        //위치 정보가 있다면,
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    },[])

    return location;
}

export default useGeolocation;