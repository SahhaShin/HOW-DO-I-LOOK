package com.ssafy.howdoilook.domain.follow.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FolloweeResponseDto {
    private Long id;

    private String nickname;

    private String profileImg;

    @Builder
    public FolloweeResponseDto(Long id, String nickname, String profileImg) {
        this.id = id;
        this.nickname = nickname;
        this.profileImg = profileImg;
    }
}
