package com.ssafy.howdoilook.domain.follow.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FollowDeleteRequestDto {
    private Long followerId;
    private Long followeeId;
}
