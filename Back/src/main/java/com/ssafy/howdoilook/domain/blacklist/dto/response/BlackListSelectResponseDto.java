package com.ssafy.howdoilook.domain.blacklist.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BlackListSelectResponseDto {
    private Long id;
    private String email;
    private String name;
    private String nickname;

    @Builder
    public BlackListSelectResponseDto(Long id, String email, String name, String nickname) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.nickname = nickname;
    }
}
