package com.ssafy.howdoilook.global.oauth2;

import com.ssafy.howdoilook.domain.user.entity.Role;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;

import java.util.Collection;
import java.util.Map;

/*
* DefaultOAuth2User를 상속하고, email과 role 필드를 추가로 가짐.
* */
@Getter
public class CustomOAuth2User extends DefaultOAuth2User {

    private String email;

    private Role role;

    public CustomOAuth2User(Collection<? extends GrantedAuthority> authorities,
                            Map<String, Object> attributes, String nameAttributeKey,
                            String email, Role role) {

        super(authorities, attributes, nameAttributeKey);

        this.email = email;
        this.role = role;
    }
}
