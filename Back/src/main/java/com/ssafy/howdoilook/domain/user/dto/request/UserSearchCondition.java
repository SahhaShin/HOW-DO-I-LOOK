package com.ssafy.howdoilook.domain.user.dto.request;

import com.ssafy.howdoilook.domain.user.entity.BadgeType;
import com.ssafy.howdoilook.domain.user.entity.Gender;
import com.ssafy.howdoilook.domain.user.entity.Role;
import com.ssafy.howdoilook.domain.user.entity.SocialType;
import lombok.Data;

@Data
public class UserSearchCondition {

    private String email;

    private String name;

    private String nickname;

    private Gender gender;

    private int age;

    private Integer ageGoe;

    private Integer ageLoe;

    private Role role;

    private SocialType socialType;

    private BadgeType showBadgeType;
}
