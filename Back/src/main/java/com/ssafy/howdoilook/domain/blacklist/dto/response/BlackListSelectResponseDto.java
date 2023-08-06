package com.ssafy.howdoilook.domain.blacklist.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BlackListSelectResponseDto {
    private Long targetUserId;

    private String nickname;

    private String profileImg;

    @Builder
    public BlackListSelectResponseDto(Long targetUserId, String nickname, String profileImg) {
        this.targetUserId = targetUserId;
        this.nickname = nickname;
        this.profileImg = profileImg;
    }
}
