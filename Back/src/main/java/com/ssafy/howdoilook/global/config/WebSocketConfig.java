    package com.ssafy.howdoilook.global.config;

    import org.springframework.context.annotation.Configuration;
    import org.springframework.messaging.simp.config.ChannelRegistration;
    import org.springframework.messaging.simp.config.MessageBrokerRegistry;
    import org.springframework.security.config.annotation.web.socket.AbstractSecurityWebSocketMessageBrokerConfigurer;
    import org.springframework.web.socket.config.annotation.*;

    @Configuration
    @EnableWebSocketMessageBroker
    public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

        //엔드포인트 /ws 에 등록 + 모든 접근 허용 => /ws를 통해 웹소켓 연결
        @Override
        public void registerStompEndpoints(StompEndpointRegistry registry) {
            registry.addEndpoint("/ws")
                    .setAllowedOriginPatterns("*")
//                    .withSockJS()
                    ;
            //setAllowedOrigin은 spring4.2버전에, SetAllowedOriginPatterns는 5.2버전에서 등장한 메서드
            // Patterns가 더 강력한 메서드
        }


        // /sub/room1 => room1 입장
        // /pub/room1 => room1 메시지 전송
        @Override
        public void configureMessageBroker(MessageBrokerRegistry registry) {
            registry.enableSimpleBroker("/sub");
            registry.setApplicationDestinationPrefixes("/pub");
        }

    }
