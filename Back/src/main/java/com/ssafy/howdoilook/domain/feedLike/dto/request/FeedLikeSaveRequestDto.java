package com.ssafy.howdoilook.domain.feedLike.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED )
public class FeedLikeSaveRequestDto {
    private Long feedId;
    private Long userId;
    private String type;


}
