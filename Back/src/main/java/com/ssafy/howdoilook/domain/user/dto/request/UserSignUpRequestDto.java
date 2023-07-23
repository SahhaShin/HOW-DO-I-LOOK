package com.ssafy.howdoilook.domain.user.dto.request;

import com.ssafy.howdoilook.domain.user.entity.Gender;
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
}
