package com.ssafy.howdoilook.domain.feedPhoto.repository;

import com.ssafy.howdoilook.domain.feedPhoto.entity.FeedPhoto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface FeedPhotoCustomRepository {
    public List<String> selectLinkListByFeedId(Long id);

    public Page<FeedPhoto> selectPhotoByHashtag(List<String> hashtagList, Pageable pageable);
    public Page<FeedPhoto> selectPhoto(Pageable pageable);
}
