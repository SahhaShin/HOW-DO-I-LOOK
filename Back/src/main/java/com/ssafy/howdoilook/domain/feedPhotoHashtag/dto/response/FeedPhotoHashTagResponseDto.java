package com.ssafy.howdoilook.domain.feedPhotoHashtag.dto.response;

import com.ssafy.howdoilook.domain.feedPhoto.entity.FeedPhoto;
import com.ssafy.howdoilook.domain.feedPhotoHashtag.entity.FeedPhotoHashtag;
import com.ssafy.howdoilook.domain.hashtag.entity.Hashtag;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FeedPhotoHashTagResponseDto {
    private Long id;
    private FeedPhoto feedPhoto;
    private Hashtag hashtag;

    @Builder
    public FeedPhotoHashTagResponseDto(FeedPhotoHashtag feedPhotoHashtag) {
        this.id = feedPhotoHashtag.getId();
        this.feedPhoto = feedPhotoHashtag.getFeedPhoto();
        this.hashtag = feedPhotoHashtag.getHashtag();
    }
}
