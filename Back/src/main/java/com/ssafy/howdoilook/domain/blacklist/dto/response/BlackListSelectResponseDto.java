package com.ssafy.howdoilook.domain.blacklist.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BlackListSelectResponseDto {
    private Long id;

    private String nickname;

    private String profileImg;

    private Long targetUserId;

    @Builder
    public BlackListSelectResponseDto(Long id, String nickname, String profileImg, Long targetUserId) {
        this.id = id;
        this.nickname = nickname;
        this.profileImg = profileImg;
        this.targetUserId = targetUserId;
    }
}
