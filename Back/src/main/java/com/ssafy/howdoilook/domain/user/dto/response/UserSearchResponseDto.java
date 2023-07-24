package com.ssafy.howdoilook.domain.user.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.howdoilook.domain.feed.entity.Feed;
import com.ssafy.howdoilook.domain.user.entity.Gender;
import com.ssafy.howdoilook.domain.user.entity.SocialType;
import lombok.Data;

import java.util.List;

@Data
public class UserSearchResponseDto {

    // User

    private Long userNo;

    private String email;

    private String name;

    private String nickname;

    private Gender gender;

    private int age;

    private SocialType socialType;



    // Feed

//    private List<Feed> feedList;


    // Comment

    @QueryProjection
    public UserSearchResponseDto(Long userNo, String email, String name, String nickname, Gender gender, int age, SocialType socialType) {
        this.userNo = userNo;
        this.email = email;
        this.name = name;
        this.nickname = nickname;
        this.gender = gender;
        this.age = age;
        this.socialType = socialType;
    }
}