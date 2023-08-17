package com.ssafy.howdoilook.domain.follow.dto.request;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FollowSaveRequestDto {
    private Long id;
    private Long targetId;

    @Builder
    public FollowSaveRequestDto(Long id, Long targetId) {
        this.id = id;
        this.targetId = targetId;
    }
}
