package com.ssafy.howdoilook.global.jwt.filter;

import com.ssafy.howdoilook.domain.user.entity.User;
import com.ssafy.howdoilook.domain.user.repository.UserRepository;
import com.ssafy.howdoilook.global.jwt.service.JwtService;
import com.ssafy.howdoilook.global.jwt.util.PasswordUtil;
import com.ssafy.howdoilook.global.redis.service.RedisRefreshTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.core.authority.mapping.NullAuthoritiesMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

/*
* JWT 인증 필터
* /login 이외의 API 요청 처리 필터
*
* AccessToken 만료 X => AccessToken만 헤더에 담아서 요청
* AccessToken 만료 => RefreshToken, AccessToken 모두 헤더에 담아서 요청
*
* 1. RefreshToken X && AccessToken OK => 인증 성공, RefreshToken 재발급 X
* 2. RefreshToken X && AccessToken X or InValid => 인증 실패, 403 ERROR
* 3. RefreshToken O => 인증 실패 처리, Redis의 RefreshToken과 비교하여 일치 하면 AccessToken / RefreshToken 재발급 (RTR 방식)
* */
@RequiredArgsConstructor
public class JwtAuthenticationProcessingFilter extends OncePerRequestFilter {

    private static final String NO_CHECK_URL = "/login";

    private final JwtService jwtService;

    private final UserRepository userRepository;

    private final RedisRefreshTokenService redisRefreshTokenService;

    private GrantedAuthoritiesMapper grantedAuthoritiesMapper = new NullAuthoritiesMapper();

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
                                    FilterChain filterChain) throws ServletException, IOException {
        // /login 요청일 때
        if(httpServletRequest.getRequestURI().equals(NO_CHECK_URL)) {
            filterChain.doFilter(httpServletRequest, httpServletResponse);

            // 더 이상 필터를 진행하지 않고 return!
            return;
        }

        // 요청 헤더에서 RefreshToken 추출 - 없거나 유효하지 않으면 null 반환
        String refreshToken = jwtService.extractRefreshToken(httpServletRequest)
                .filter(jwtService::isTokenValid)
                .orElse(null);

        // 요청 헤더에 RefreshToken이 존재한다면
        if(refreshToken != null)
            // 헤더의 RefreshToken과 Redis의 RefreshToken 비교 => 일치한다면 AccessToken 재발급
            checkRefreshTokenAndReIssueAccessToken(httpServletResponse, refreshToken);
        // 요청 헤더에 RefreshToken이 존재하지 않는다면
        else
            // AccessToken 검사 및 인증 처리
            // AccessToken이 존재하지 않거나 유효하지 않다면 => 인증 객체가 담기지 않은 상태로 인증 실패(403)
            // AccessToken이 유효하다면 => 인증 객체가 담긴 상태로 인증 성공
            checkAccessTokenAndAuthentication(httpServletRequest, httpServletResponse, filterChain);
    }

    /*
    * AccessToken / RefreshToken 재발급 메서드
    * */
    public void checkRefreshTokenAndReIssueAccessToken(HttpServletResponse httpServletResponse, String refreshToken) {
        String redisEmail = redisRefreshTokenService.getRedisEmail(refreshToken);

        if(redisEmail != null) {
            Optional<User> user = userRepository.findByEmail(redisEmail);

            if(user.isPresent()) {
                String reIssuedRefreshToken = reIssueRefreshToken(user.get());

                jwtService.sendAccessAndRefreshToken(
                        httpServletResponse,
                        jwtService.createAccessToken(user.get().getEmail()),
                        reIssuedRefreshToken
                );
            }
        }
        else
            throw new NullPointerException("Redis에 해당 RefreshToken이 존재하지 않습니다.");
    }

    /*
    * RefreshToken 재발급 메서드
    * */
    public String reIssueRefreshToken(User user) {
        String reIssuedRefreshToken = jwtService.createRefreshToken();

        redisRefreshTokenService.setRedisRefreshToken(reIssuedRefreshToken, user.getEmail());

        return reIssuedRefreshToken;
    }

    /*
    * AccessToken 검증 및 인증 처리 메서드
    * */
    public void checkAccessTokenAndAuthentication(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
                                                  FilterChain filterChain)
        throws ServletException, IOException {

        // AccessToken 추출
        jwtService.extractAccessToken(httpServletRequest)
                .filter(jwtService::isTokenValid) // 추출한 AccessToken이 유효한가
                .ifPresent(accessToken -> jwtService.extractEmail(accessToken) // AccessToken에서 email(Claim) 추출
                .ifPresent(email -> userRepository.findByEmail(email)
                .ifPresent(this::saveAuthentication))); // 인증 처리

        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }

    /*
    * 인증 허가 메서드
    * Parameter의 User : 우리가 만든 User 객체
    * Builder의 User : UserDetails의 User 객체
    * */
    public void saveAuthentication(User myUser) {
        String password = myUser.getPassword();

        // 소셜 회원이라면
        if(password == null)
            password = PasswordUtil.generateRandomPassword();

        UserDetails userDetails = org.springframework.security.core.userdetails.User.builder()
                .username(myUser.getEmail())
                .password(password)
                .roles(myUser.getRole().name())
                .build();

        // 인증 객체 생성
        // UsernamePasswordAuthenticationToken의 파라미터
        // 1. UserDetails 객체 (유저 정보)
        // 2. credential (보통 비밀번호, 인증 시에는 보통 null 표시)
        // 3. Collection<? extends GrantedAuthority>
        // - UserDetails의 User 객체 안에 Set<GrantedAuthority> authorities이 있어서 getter로 호출한 후에,
        // - new NullAuthoritiesMapper()로 GrantedAuthoritiesMapper 객체를 생성하고 mapAuthorities()에 담기
        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null,
                grantedAuthoritiesMapper.mapAuthorities(userDetails.getAuthorities()));

        // SecurityContext를 꺼낸 후 setAuthentication()을 이용하여 Authentication 인증 객체 인증 허가 처리
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
