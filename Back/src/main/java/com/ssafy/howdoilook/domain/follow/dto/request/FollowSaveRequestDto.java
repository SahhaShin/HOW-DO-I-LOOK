package com.ssafy.howdoilook.domain.follow.dto.request;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FollowSaveRequestDto {
    private Long followerId;
    private Long followeeId;

    @Builder
    public FollowSaveRequestDto(Long followerId, Long followeeId) {
        this.followerId = followerId;
        this.followeeId = followeeId;
    }
}
