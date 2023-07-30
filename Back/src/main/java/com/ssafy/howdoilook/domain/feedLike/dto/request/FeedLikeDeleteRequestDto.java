package com.ssafy.howdoilook.domain.feedLike.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED )
public class FeedLikeDeleteRequestDto {
    private Long feedId;
    private Long userId;
    private String type;


}
