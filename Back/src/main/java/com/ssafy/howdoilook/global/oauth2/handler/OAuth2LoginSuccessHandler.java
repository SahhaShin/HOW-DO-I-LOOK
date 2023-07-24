package com.ssafy.howdoilook.global.oauth2.handler;

import com.ssafy.howdoilook.domain.user.entity.Role;
import com.ssafy.howdoilook.domain.user.entity.User;
import com.ssafy.howdoilook.domain.user.repository.UserRepository;
import com.ssafy.howdoilook.global.jwt.service.JwtService;
import com.ssafy.howdoilook.global.oauth2.CustomOAuth2User;
import com.ssafy.howdoilook.global.redis.service.RedisRefreshTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

/*
* 소셜 로그인 성공 시 처리 로직
* */
@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtService jwtService;

    private final UserRepository userRepository;

    private final RedisRefreshTokenService redisRefreshTokenService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
                                        Authentication authentication)
        throws IOException, ServletException {

        try {
            CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

            // Role이 GUEST일 경우 처음 요청한 회원이므로 회원가입 페이지로 리다이렉트
            if(oAuth2User.getRole() == Role.GUEST) {
                String accessToken = jwtService.createAccessToken(oAuth2User.getEmail());
                String refreshToken = jwtService.createRefreshToken();

                // Header에 AccessToken 표시
                httpServletResponse.addHeader(jwtService.getAccessHeader(), "Bearer " + accessToken);

                // 프론트의 회원가입 추가 정보 입력 폼으로 리다이렉트
//                httpServletResponse.sendRedirect("oauth2/sign-up");

                // Header에 AccessToken / RefreshToken 담기
                jwtService.sendAccessAndRefreshToken(httpServletResponse, accessToken, refreshToken);

                Optional<User> findUser = userRepository.findByEmail(oAuth2User.getEmail());

                // Redis에 저장
                if(findUser.isPresent())
                    redisRefreshTokenService.setRedisRefreshToken(refreshToken, oAuth2User.getEmail());
                else
                    throw new NullPointerException("해당 유저가 존재하지 않습니다.");
            }
            else
                loginSuccess(httpServletResponse, oAuth2User);

        } catch(Exception e) {
            e.printStackTrace();

            throw e;
        }
    }

    private void loginSuccess(HttpServletResponse httpServletResponse, CustomOAuth2User oAuth2User) {
        String accessToken = jwtService.createAccessToken(oAuth2User.getEmail());
        String refreshToken = jwtService.createRefreshToken();

        httpServletResponse.addHeader(jwtService.getAccessHeader(), "Bearer " + accessToken);
        httpServletResponse.addHeader(jwtService.getRefreshHeader(), "Bearer " + refreshToken);

        jwtService.sendAccessAndRefreshToken(httpServletResponse, accessToken, refreshToken);
        jwtService.updateRefreshToken(oAuth2User.getEmail(), refreshToken);
    }
}
