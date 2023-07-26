package com.ssafy.howdoilook.domain.feedPhoto.service;

import com.ssafy.howdoilook.domain.feed.dto.PhotoDto;
import com.ssafy.howdoilook.domain.feed.entity.Feed;
import com.ssafy.howdoilook.domain.feed.repository.FeedRepository;
import com.ssafy.howdoilook.domain.feedPhoto.dto.response.FeedPhotoResponseDto;
import com.ssafy.howdoilook.domain.feedPhoto.entity.FeedPhoto;
import com.ssafy.howdoilook.domain.feedPhoto.repository.FeedPhotoRepository;
import com.ssafy.howdoilook.domain.feedPhotoHashtag.entity.FeedPhotoHashtag;
import com.ssafy.howdoilook.domain.feedPhotoHashtag.service.FeedPhotoHashtagService;
import com.ssafy.howdoilook.domain.hashtag.entity.Hashtag;
import com.ssafy.howdoilook.domain.hashtag.service.HashTagService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FeedPhotoService {

    private final FeedPhotoRepository feedPhotoRepository;
    private final FeedRepository feedRepository;
    private final HashTagService hashTagService;
    private final FeedPhotoHashtagService feedPhotoHashtagService;



    public FeedPhotoResponseDto findById(Long id) {
        FeedPhoto findFeedPhoto = feedPhotoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 feedphoto가 존재하지 않습니다."));

        return new FeedPhotoResponseDto(findFeedPhoto);
    }


    @Transactional
    public Long saveFeedPhoto(Long feedId, PhotoDto photoDto) {
        //피드 찾기
        Feed findFeed = feedRepository.findById(feedId)
                .orElseThrow(() -> new IllegalArgumentException("해당 feed가 존재하지 않습니다."));

        //사진 엔티티 만들기
        FeedPhoto feedPhoto = FeedPhoto.builder()
                .feed(findFeed)
                .link(photoDto.getLink())
                .build();

        //사진 엔티티 저장
        Long feedPhotoId = feedPhotoRepository.save(feedPhoto).getId();
        List<String> hashtagList = photoDto.getHashtagList();
        //사진에 저장된 해시태그 저장
        for (String hashtag : hashtagList) {
            Long hashtagId = hashTagService.savaHashTag(hashtag);
            //사진 해시태그 연결
            Long feedPhotoHashtagId = feedPhotoHashtagService.saveFeedPhotoHashtag(feedPhotoId, hashtagId);
        }
        return feedPhoto.getId();
    }
    @Transactional
    public Long updateFeedPhoto(PhotoDto photoDto) {
        //photoid로 사진 찾기
        Optional<FeedPhoto> feedPhoto = feedPhotoRepository.findById(photoDto.getId());
        //새로 저장할 해시태그리스트
        List<String> hashtagList = photoDto.getHashtagList();

        //업데이트하려는 사진 찾으면
        if (feedPhoto.isPresent()) {

            FeedPhoto findFeedPhoto = feedPhoto.get();
            //사진해시태그연결테이블결과리스트
            List<FeedPhotoHashtag> list = findFeedPhoto.getFeedPhotoHashtagList();
            //feedphotohashtag테이블 전부 삭제
            for (FeedPhotoHashtag feedPhotoHashtag : list) {
                feedPhotoHashtagService.removeFeedPhotoHashtag(feedPhotoHashtag.getId());
            }
            //새로 넘어온 해시태그 전부 등록
            for (String hashtag : hashtagList) {
                Long hashtagId = hashTagService.savaHashTag(hashtag);
                feedPhotoHashtagService.saveFeedPhotoHashtag(findFeedPhoto.getId(), hashtagId);
            }
            return findFeedPhoto.getId();
        }
        //업데이트 하려하는 사진 못찾으면
        else {
            return 0L;
        }
    }


}
