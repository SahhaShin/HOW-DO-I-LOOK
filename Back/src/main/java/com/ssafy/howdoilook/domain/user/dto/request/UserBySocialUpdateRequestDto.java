package com.ssafy.howdoilook.domain.user.dto.request;

import com.ssafy.howdoilook.domain.user.entity.Gender;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserBySocialUpdateRequestDto {

    private int age;

    private Gender gender;

    private String nickname;

    @Builder
    public UserBySocialUpdateRequestDto(int age, Gender gender, String nickname) {
        this.age = age;
        this.gender = gender;
        this.nickname = nickname;
    }
}
