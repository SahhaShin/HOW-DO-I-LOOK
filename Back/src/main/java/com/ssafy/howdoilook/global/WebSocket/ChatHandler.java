package com.ssafy.howdoilook.global.WebSocket;

import com.ssafy.howdoilook.domain.user.entity.User;
import com.ssafy.howdoilook.domain.user.repository.UserRepository;
import com.ssafy.howdoilook.domain.user.service.UserService;
import com.ssafy.howdoilook.global.jwt.service.JwtService;
import com.ssafy.howdoilook.global.jwt.util.PasswordUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.core.authority.mapping.NullAuthoritiesMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class ChatHandler implements ChannelInterceptor {

    private JwtService jwtService;
    private GrantedAuthoritiesMapper grantedAuthoritiesMapper = new NullAuthoritiesMapper();
    private UserRepository userRepository;
    static final String BEARER_PREFIX = "Bearer ";

    //WebSocket을 통해 들어온 요청이 처리되기전 실행
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel){
        //헤더 접근을 위한 객체
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(message);
        System.out.println(message);
        return message;
//        if(StompCommand.CONNECT == headerAccessor.getCommand()) {
//            String token = headerAccessor.getNativeHeader("Authorization").toString().substring(BEARER_PREFIX.length());
//            System.out.println(token);
//
//            //토큰 인증
//            //유효한 토큰인지 확인
//            if (jwtService.isTokenValid(token)) {
//                // AccessToken이 유효한 경우 email(Claim) 확인
//                jwtService.extractEmail(token)
//                        .ifPresent(email -> userRepository.findByEmail(email)
//                                .ifPresent(this::saveAuthentication)); // 인증 처리
//            } else {
//                // AccessToken이 유효하지 않으면 예외 처리 발생
//                throw new RuntimeException("해당 토큰은 유효하지 않습니다.");
//            }
//        }
//
//        return message;
    }

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
