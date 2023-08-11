package com.ssafy.howdoilook.domain.follow.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PerfectFollowResponseDto {

    Long userIdA;

    Long userIdB;

    String nicknameA;

    String nicknameB;

    String profileImgA;

    String profileImgB;

    @QueryProjection
    @Builder
    public PerfectFollowResponseDto(Long userIdA, Long userIdB, String nicknameA, String nicknameB, String profileImgA, String profileImgB) {
        this.userIdA = userIdA;
        this.userIdB = userIdB;
        this.nicknameA = nicknameA;
        this.nicknameB = nicknameB;
        this.profileImgA = profileImgA;
        this.profileImgB = profileImgB;
    }
}
