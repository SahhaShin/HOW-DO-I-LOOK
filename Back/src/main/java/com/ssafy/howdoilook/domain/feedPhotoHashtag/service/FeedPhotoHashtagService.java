package com.ssafy.howdoilook.domain.feedPhotoHashtag.service;



import com.ssafy.howdoilook.domain.feedPhoto.entity.FeedPhoto;
import com.ssafy.howdoilook.domain.feedPhoto.repository.FeedPhotoRepository;
import com.ssafy.howdoilook.domain.feedPhotoHashtag.entity.FeedPhotoHashtag;
import com.ssafy.howdoilook.domain.feedPhotoHashtag.repository.FeedPhotoHashtagRepository;
import com.ssafy.howdoilook.domain.hashtag.entity.Hashtag;
import com.ssafy.howdoilook.domain.hashtag.repository.HashTagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FeedPhotoHashtagService {
    private final FeedPhotoHashtagRepository feedPhotoHashtagRepository;
    private final FeedPhotoRepository feedPhotoRepository;
    private final HashTagRepository hashTagRepository;

    @Transactional
    public Long saveFeedPhotoHashtag(Long feedPhotoId, Long hashtagId){
        FeedPhoto findFeedPhoto = feedPhotoRepository.findById(feedPhotoId)
                .orElseThrow(() -> new EmptyResultDataAccessException("존재하지 않는FeedPhoto입니다.",1));
        Hashtag findHashtag = hashTagRepository.findById(hashtagId)
                .orElseThrow(() -> new EmptyResultDataAccessException("존재하지 않는HashTag입니다.",1));


        FeedPhotoHashtag entity = FeedPhotoHashtag.builder()
                .feedPhoto(findFeedPhoto)
                .hashtag(findHashtag)
                .build();
        return feedPhotoHashtagRepository.save(entity).getId();
    }

}
