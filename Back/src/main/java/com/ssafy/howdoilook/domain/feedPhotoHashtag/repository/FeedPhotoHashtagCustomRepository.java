package com.ssafy.howdoilook.domain.feedPhotoHashtag.repository;

import com.ssafy.howdoilook.domain.feedPhotoHashtag.entity.FeedPhotoHashtag;

import java.util.List;

public interface FeedPhotoHashtagCustomRepository {
    public List<FeedPhotoHashtag> selectFeedPhotoHashtagByFeedPhotoId(Long feedPhotoId);
}
