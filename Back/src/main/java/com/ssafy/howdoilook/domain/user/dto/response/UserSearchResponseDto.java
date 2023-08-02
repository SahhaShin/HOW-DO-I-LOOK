package com.ssafy.howdoilook.domain.user.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.howdoilook.domain.feed.entity.Feed;
import com.ssafy.howdoilook.domain.user.entity.BadgeType;
import com.ssafy.howdoilook.domain.user.entity.Gender;
import com.ssafy.howdoilook.domain.user.entity.SocialType;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
public class UserSearchResponseDto {

    // User

    private Long userId;

    private String email;

    private String name;

    private String nickname;

    private Gender gender;

    private int age;

    private SocialType socialType;

    private BadgeType showBadgeType;



    // Feed

//    private List<Feed> feedList;


    // Comment

    @QueryProjection
    @Builder
    public UserSearchResponseDto(Long userId, String email, String name, String nickname, Gender gender, int age, SocialType socialType, BadgeType showBadgeType) {
        this.userId = userId;
        this.email = email;
        this.name = name;
        this.nickname = nickname;
        this.gender = gender;
        this.age = age;
        this.socialType = socialType;
        this.showBadgeType = showBadgeType;
    }
}
