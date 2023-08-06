package com.ssafy.howdoilook.domain.user.dto.response;

import com.ssafy.howdoilook.domain.user.entity.*;
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

    private BadgeType showBadgeType;

    @Builder
    public UserSimpleResponseDto(Long id, String email, String password, String name, String nickname, Gender gender, int age, String profileImg, Role role, SocialType socialType, String socialId, BadgeType showBadgeType) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.nickname = nickname;
        this.gender = gender;
        this.age = age;
        this.profileImg = profileImg;
        this.role = role;
        this.socialType = socialType;
        this.socialId = socialId;
        this.showBadgeType = showBadgeType;
    }

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
        this.showBadgeType = user.getShowBadgeType();
    }
}
