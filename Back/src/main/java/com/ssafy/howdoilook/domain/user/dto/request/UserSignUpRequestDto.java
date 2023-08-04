package com.ssafy.howdoilook.domain.user.dto.request;

import com.ssafy.howdoilook.domain.user.entity.Gender;
import com.ssafy.howdoilook.domain.user.entity.Role;
import com.ssafy.howdoilook.domain.user.entity.SocialType;
import com.ssafy.howdoilook.domain.user.entity.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserSignUpRequestDto {

    private String email;

    private String password;

    private String name;

    private String nickname;

    private Gender gender;

    private int age;

    private String profileImg;

    public User toEntity() {

        return User.builder()
                .email(this.email)
                .password(this.password)
                .name(this.name)
                .nickname(this.nickname)
                .gender(this.gender)
                .age(this.age)
                .role(Role.USER)
                .socialType(SocialType.X)
                .build();
    }
}
