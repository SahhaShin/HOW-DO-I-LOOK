package com.ssafy.howdoilook.global.login.handler;

import com.ssafy.howdoilook.domain.user.entity.User;
import com.ssafy.howdoilook.domain.user.repository.UserRepository;
import com.ssafy.howdoilook.global.jwt.service.JwtService;
import com.ssafy.howdoilook.global.redis.service.RedisRefreshTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Optional;

/*
 * JWT를 활용한 일반 로그인 성공 처리
 * */
@RequiredArgsConstructor
public class LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtService jwtService;

    private final UserRepository userRepository;

    private final RedisRefreshTokenService redisRefreshTokenService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
                                        Authentication authentication) {

        // 인증 정보에서 username(email) 추출
        String email = extractUsername(authentication);

        // AccessToken & RefreshToken 발급
        String accessToken = jwtService.createAccessToken(email);
        String refreshToken = jwtService.createRefreshToken();

        // response header에 AccessToken, RefreshToken 실어서 보내기
        jwtService.sendAccessAndRefreshToken(httpServletResponse, accessToken, refreshToken);

        Optional<User> user = userRepository.findByEmail(email);

        // Redis에 RefreshToken 저장
        if(user.isPresent())
            redisRefreshTokenService.setRedisValue(refreshToken, email);
        else
            throw new NullPointerException("해당 유저가 존재하지 않습니다.");
    }

    /*
    * Authentication(인증 정보)로부터 username(email) 추출하기
    * */
    private String extractUsername(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        return userDetails.getUsername();
    }
}
