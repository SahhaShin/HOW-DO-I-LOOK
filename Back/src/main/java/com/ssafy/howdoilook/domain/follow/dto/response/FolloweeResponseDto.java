package com.ssafy.howdoilook.domain.follow.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FolloweeResponseDto {
    private Long id;
    private String email;
    private String name;
    private String nickname;

    @Builder
    public FolloweeResponseDto(Long id, String email, String name, String nickname) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.nickname = nickname;
    }
}
