package com.ssafy.howdoilook.domain.feed.service;

import com.ssafy.howdoilook.domain.feed.dto.request.FeedSaveRequestDto;
import com.ssafy.howdoilook.domain.feed.dto.PhotoDto;
import com.ssafy.howdoilook.domain.feed.dto.request.FeedUpdateRequestDto;
import com.ssafy.howdoilook.domain.feed.dto.response.FeedSelectResponseDto;
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
    public List<FeedSelectResponseDto> selectAll(){
        List<FeedSelectResponseDto> feedSelectResponseDtos = feedRepository.selectFeedAll();
        System.out.println("feedSelectResponseDtos = " + feedSelectResponseDtos);
        return feedSelectResponseDtos;
    }

    @Transactional
    public Long saveFeed(FeedSaveRequestDto feedRequestDto) {
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
            feedPhotoService.saveFeedPhoto(feedEntity.getId(), photoDto);
        }
        return feedEntity.getId();
    }

    @Transactional
    public Long updateFeed(FeedUpdateRequestDto feedUpdateRequestDto){
        //넘어온 피드찾기
        Feed findFeed = feedRepository.findById(feedUpdateRequestDto.getFeedId()).orElseThrow(
                () -> new IllegalArgumentException("존재하지 않는 피드입니다."));
        //피드 내용 업데이트
        findFeed.updateContent(feedUpdateRequestDto.getContent());
        //피드에 딸린 사진 가져오기
        List<PhotoDto> photoDtoList = feedUpdateRequestDto.getPhotoDtoList();
        for (PhotoDto photoDto : photoDtoList) {
            //사진별로 업데이트 하기
            feedPhotoService.updateFeedPhoto(photoDto);
        }
        return findFeed.getId();
    }
}
