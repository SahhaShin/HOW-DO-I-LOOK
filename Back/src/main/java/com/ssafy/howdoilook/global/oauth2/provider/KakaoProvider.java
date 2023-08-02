package com.ssafy.howdoilook.global.oauth2.provider;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.howdoilook.global.oauth2.token.KakaoOAuthToken;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@RequiredArgsConstructor
@Getter
@Service
public class KakaoProvider {

    @Value("${spring.security.oauth2.client.registration.kakao.authorization-grant-type}")
    private String grantType;

    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
    private String redirectUri;

    public KakaoOAuthToken getKakaoOAuthToken(String code) {
        System.out.println(code);
        System.out.println(redirectUri);

        try {
            RestTemplate restTemplate = new RestTemplate();

            //HttpHeader 오브젝트 생성
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-type","application/x-www-form-urlencoded;charset=utf-8");

            //HttpBody 오브젝트 생성
            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            params.add("grant_type",grantType);
            params.add("client_id",clientId);
            params.add("redirect_uri",redirectUri);
            params.add("code", code);

            //HttpHeader와 HttpBody를 하나의 오브젝트에 담기
            HttpEntity<MultiValueMap<String,String>> kakaoTokenRequest = new HttpEntity<>(params, headers);

            //Http 요청하기 (POST 방식으로)
            ResponseEntity<String> response = restTemplate.exchange(
                    "https://kauth.kakao.com/oauth/token",
                    HttpMethod.POST,
                    kakaoTokenRequest,
                    String.class
            );

            System.out.println(response);

            ObjectMapper objectMapper = new ObjectMapper();

            KakaoOAuthToken kakaoOAuthToken =  objectMapper.readValue(response.getBody(), KakaoOAuthToken.class);

            System.out.println(kakaoOAuthToken);
            System.out.println(kakaoOAuthToken.getAccess_token());
            System.out.println(kakaoOAuthToken.getRefresh_token());

            return kakaoOAuthToken;
        } catch(JsonProcessingException e) {
            e.printStackTrace();

            return null;
        }
    }
}
