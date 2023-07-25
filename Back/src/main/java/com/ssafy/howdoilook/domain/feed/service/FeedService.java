package com.ssafy.howdoilook.domain.feed.service;

import com.ssafy.howdoilook.domain.feed.dto.request.FeedRequestDto;
import com.ssafy.howdoilook.domain.feed.dto.request.PhotoDto;
import com.ssafy.howdoilook.domain.feed.entity.Feed;
import com.ssafy.howdoilook.domain.feed.repository.FeedRepository;
import com.ssafy.howdoilook.domain.feedPhoto.service.FeedPhotoService;
import com.ssafy.howdoilook.domain.feedPhotoHashtag.service.FeedPhotoHashtagService;
import com.ssafy.howdoilook.domain.hashtag.service.HashTagService;
import com.ssafy.howdoilook.domain.user.entity.User;
import com.ssafy.howdoilook.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FeedService {

    private final HashTagService hashTagService;
    private final FeedPhotoService feedPhotoService;
    private final FeedPhotoHashtagService feedPhotoHashtagService;
    private final FeedRepository feedRepository;
    private final UserRepository userRepository;


    @Transactional
    public Long saveFeed(FeedRequestDto feedRequestDto) {
        //넘어온 회원찾기
        User findUser = userRepository.findById(feedRequestDto.getUserId()).orElseThrow(
                () -> new IllegalArgumentException("존재하지 않는 회원입니다."));

        //Feed Entity 만들기
        Feed feedEntity = Feed.builder()
                .content(feedRequestDto.getContent())
                .user(findUser)
                .build();
        feedRepository.save(feedEntity);

        List<PhotoDto> photoDtoList = feedRequestDto.getPhotoDtoList();
        for (PhotoDto photoDto : photoDtoList) {
            String link = photoDto.getLink();

            Long photoId = feedPhotoService.saveFeedPhoto(feedEntity.getId(),link);
            List<String> hashtagList = photoDto.getHashtagList();
            for (String hashtag : hashtagList) {
                Long hashTagId = hashTagService.savaHashTag(hashtag);
                Long feedPhotoHashtagId = feedPhotoHashtagService.saveFeedPhotoHashtag(photoId, hashTagId);
            }
        }
        return feedEntity.getId();
    }
}
