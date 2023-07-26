package com.ssafy.howdoilook.domain.user.dto.response;

import com.ssafy.howdoilook.domain.user.entity.Gender;
import com.ssafy.howdoilook.domain.user.entity.Role;
import com.ssafy.howdoilook.domain.user.entity.SocialType;
import com.ssafy.howdoilook.domain.user.entity.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserSimpleResponseDto {

    private Long id;

    private String email;

    private String password;

    private String name;

    private String nickname;

    private Gender gender;

    private int age;

    private String profileImg;

    private Role role;

    private SocialType socialType;

    private String socialId;

    @Builder
    public UserSimpleResponseDto(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.name = user.getName();
        this.nickname = user.getNickname();
        this.gender = user.getGender();
        this.age = user.getAge();
        this.profileImg = user.getProfileImg();
        this.role = user.getRole();
        this.socialType = user.getSocialType();
        this.socialId = user.getSocialId();
    }
}
