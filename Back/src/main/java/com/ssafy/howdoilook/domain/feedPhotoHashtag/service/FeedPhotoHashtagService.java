package com.ssafy.howdoilook.domain.feedPhotoHashtag.service;



import com.ssafy.howdoilook.domain.feedPhoto.entity.FeedPhoto;
import com.ssafy.howdoilook.domain.feedPhoto.repository.FeedPhotoRepository;

import com.ssafy.howdoilook.domain.feedPhotoHashtag.dto.response.FeedPhotoHashTagResponseDto;
import com.ssafy.howdoilook.domain.feedPhotoHashtag.entity.FeedPhotoHashtag;
import com.ssafy.howdoilook.domain.feedPhotoHashtag.repository.FeedPhotoHashtagRepository;
import com.ssafy.howdoilook.domain.hashtag.entity.Hashtag;
import com.ssafy.howdoilook.domain.hashtag.repository.HashTagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FeedPhotoHashtagService {
    private final FeedPhotoHashtagRepository feedPhotoHashtagRepository;
    private final FeedPhotoRepository feedPhotoRepository;
    private final HashTagRepository hashTagRepository;

    public FeedPhotoHashTagResponseDto findById(Long id){
        FeedPhotoHashtag findFeedPhotoHashtag = feedPhotoHashtagRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 feedphotohashtag가 존재하지 않습니다."));
        return new FeedPhotoHashTagResponseDto(findFeedPhotoHashtag);
    }
    @Transactional
    public Long saveFeedPhotoHashtag(Long feedPhotoId, Long hashtagId){
        FeedPhoto findFeedPhoto = feedPhotoRepository.findById(feedPhotoId)
                .orElseThrow(() -> new IllegalArgumentException("해당 feedphoto가 존재하지 않습니다."));
        Hashtag findHashtag = hashTagRepository.findById(hashtagId)
                .orElseThrow(() -> new IllegalArgumentException("해당 hashtag가 존재하지 않습니다."));


        FeedPhotoHashtag entity = FeedPhotoHashtag.builder()
                .feedPhoto(findFeedPhoto)
                .hashtag(findHashtag)
                .build();
        return feedPhotoHashtagRepository.save(entity).getId();
    }


}
