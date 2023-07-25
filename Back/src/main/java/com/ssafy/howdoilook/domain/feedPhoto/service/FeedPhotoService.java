package com.ssafy.howdoilook.domain.feedPhoto.service;

import com.ssafy.howdoilook.domain.feed.entity.Feed;
import com.ssafy.howdoilook.domain.feed.repository.FeedRepository;
import com.ssafy.howdoilook.domain.feedPhoto.dto.response.FeedPhotoResponseDto;
import com.ssafy.howdoilook.domain.feedPhoto.entity.FeedPhoto;
import com.ssafy.howdoilook.domain.feedPhoto.repository.FeedPhotoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FeedPhotoService {

    private final FeedPhotoRepository feedPhotoRepository;
    private final FeedRepository feedRepository;

    public FeedPhotoResponseDto findById(Long id) {
        FeedPhoto findFeedPhoto = feedPhotoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 feedphoto가 존재하지 않습니다."));

        return new FeedPhotoResponseDto(findFeedPhoto);
    }

    /**
     *
     * @param feedId
     * @param photoLink
     * @return
     */
    @Transactional
    public Long saveFeedPhoto(Long feedId, String photoLink) {
        Feed findFeed = feedRepository.findById(feedId)
                .orElseThrow(() -> new IllegalArgumentException("해당 feed가 존재하지 않습니다."));


        FeedPhoto feedPhoto = FeedPhoto.builder()
                .feed(findFeed)
                .link(photoLink)
                .build();
        feedPhotoRepository.save(feedPhoto);
        return feedPhoto.getId();
    }


}
