package com.ssafy.howdoilook.domain.badge.dto.response;

import com.ssafy.howdoilook.domain.user.entity.BadgeType;
import com.ssafy.howdoilook.domain.user.entity.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BadgeResponseDto {

    private Long badgeId;

    private BadgeType badgeType;

    private Long userId;

    @Builder
    public BadgeResponseDto(Long badgeId, BadgeType badgeType, Long userId) {
        this.badgeId = badgeId;
        this.badgeType = badgeType;
        this.userId = userId;
    }
}
