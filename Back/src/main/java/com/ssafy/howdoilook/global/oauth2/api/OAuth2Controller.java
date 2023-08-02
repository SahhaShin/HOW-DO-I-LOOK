package com.ssafy.howdoilook.global.oauth2.api;

import com.ssafy.howdoilook.global.oauth2.provider.KakaoProvider;
import io.swagger.annotations.ApiOperation;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Getter
@RequestMapping("/api/oauth2")
public class OAuth2Controller {

    private final KakaoProvider kakaoProvider;


    @ApiOperation(value = "kakao code 전송 및 토큰 받기")
    @GetMapping("/kakao/{code}")
    public ResponseEntity<?> sendKakaoCodeAndGetToken(@PathVariable String code) {

        return ResponseEntity.ok()
                .body(kakaoProvider.getKakaoOAuthToken(code));
    }

    @ApiOperation(value = "google code 전송 및 토큰 받기")
    @GetMapping("/google/{code}")
    public ResponseEntity<?> sendGoogleCodeAndGetToken(@PathVariable String code) {

        return ResponseEntity.ok()
                .body("");
    }

    @ApiOperation(value = "naver code 전송 및 토큰 받기")
    @GetMapping("/naver/{code}")
    public ResponseEntity<?> sendNaverCodeAndGetToken(@PathVariable String code) {

        return ResponseEntity.ok()
                .body("");
    }
}
