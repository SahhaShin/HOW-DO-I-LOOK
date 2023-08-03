package com.ssafy.howdoilook.domain.feedPhoto.repository;

import java.util.List;

public interface FeedPhotoCustomRepository {
    public List<String> selectLinkListByFeedId(Long id);
}
