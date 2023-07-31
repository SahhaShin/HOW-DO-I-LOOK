package com.ssafy.howdoilook.domain.feed.service;

import com.ssafy.howdoilook.domain.feed.dto.request.FeedSaveRequestDto;
import com.ssafy.howdoilook.domain.feed.dto.PhotoDto;
import com.ssafy.howdoilook.domain.feed.dto.request.FeedUpdateRequestDto;
import com.ssafy.howdoilook.domain.feed.dto.response.FeedDto;

import com.ssafy.howdoilook.domain.feed.entity.Feed;
import com.ssafy.howdoilook.domain.feed.repository.FeedRepository;

import com.ssafy.howdoilook.domain.feedLike.service.FeedLikeService;
import com.ssafy.howdoilook.domain.feedPhoto.entity.FeedPhoto;
import com.ssafy.howdoilook.domain.feedPhoto.service.FeedPhotoService;
import com.ssafy.howdoilook.domain.feedPhotoHashtag.entity.FeedPhotoHashtag;
import com.ssafy.howdoilook.domain.feedPhotoHashtag.service.FeedPhotoHashtagService;

import com.ssafy.howdoilook.domain.follow.entity.Follow;
import com.ssafy.howdoilook.domain.follow.service.FollowService;
import com.ssafy.howdoilook.domain.hashtag.service.HashTagService;
import com.ssafy.howdoilook.domain.user.entity.User;
import com.ssafy.howdoilook.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FeedService {

    private final HashTagService hashTagService;
    private final FeedPhotoService feedPhotoService;
    private final FeedPhotoHashtagService feedPhotoHashtagService;
    private final FeedLikeService feedLikeService;
    private final FollowService followService;
    private final FeedRepository feedRepository;
    private final UserRepository userRepository;

    public Page<FeedDto> selectAll(Pageable pageable){
        Page<Feed> feeds = feedRepository.selectFeedAll(pageable);
        List<Feed> feedList = feeds.getContent();
        List<FeedDto> feedDtoList = builder(feedList);
        return new PageImpl<>(feedDtoList, feeds.getPageable(), feeds.getTotalElements());
    }
    public Page<FeedDto> selectByHashTag(List<String> hashtagList,Pageable pageable){
        Page<Feed> feeds = feedRepository.selectFeedByHashTag(hashtagList, pageable);
        List<Feed> feedList = feeds.getContent();
        List<FeedDto> feedDtoList = builder(feedList);
        return new PageImpl<>(feedDtoList, feeds.getPageable(), feeds.getTotalElements());
    }
    public Page<FeedDto> selectByUserFollowee(Long userId,Pageable pageable){
        User findUser = userRepository.findById(userId).orElseThrow(
                ()->new IllegalArgumentException("존재하지 않는 User 입니다."));
        //찾은 유저가 팔로우 하고있는 팔로우정보를 가져온다.
        List<Follow> followeeList = findUser.getFollowerList();
        Page<Feed> feeds = feedRepository.selectByUserFollowee(followeeList, pageable);
        List<Feed> feedList = feeds.getContent();
        List<FeedDto> feedDtoList = builder(feedList);
        return new PageImpl<>(feedDtoList, feeds.getPageable(), feeds.getTotalElements());
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
        if (photoDtoList!=null){
            for (PhotoDto photoDto : photoDtoList) {
                feedPhotoService.saveFeedPhoto(feedEntity.getId(), photoDto);
            }
        }else{
            throw new IllegalArgumentException("사진이 없으면 피드를 저장할 수 없습니다.");
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
    @Transactional
    public void deleteFeed(Long feedId){
        feedRepository.deleteById(feedId);
    }

    private List<FeedDto> builder(List<Feed> feedList){
        List<FeedDto> feedDtoList = new ArrayList<>();
        for (Feed feed : feedList) {
            FeedDto feedDto = new FeedDto();
            feedDto.setUserId(feed.getUser().getId());
            feedDto.setFeedId(feed.getId());
            feedDto.setFeedContent(feed.getContent());
            feedDto.setFeedCreatedDate(feed.getCreatedDate());
            feedDto.setFeedUpdateDate(feed.getModifiedDate());
            feedDto.setFeedLikeCountResponseDto(feedLikeService.countFeedLike(feed.getId()));
            feedDto.setPhotoDtoList(new ArrayList<>());
            List<FeedPhoto> feedPhotoList = feed.getFeedPhotoList();
            for (FeedPhoto feedPhoto : feedPhotoList) {
                PhotoDto photoDto = new PhotoDto();
                photoDto.setId(feedPhoto.getId());
                photoDto.setLink(feedPhoto.getLink());
                photoDto.setHashtagList(new ArrayList<>());
                List<FeedPhotoHashtag> feedPhotoHashtagList = feedPhoto.getFeedPhotoHashtagList();
                for (FeedPhotoHashtag feedPhotoHashtag : feedPhotoHashtagList) {
                    photoDto.getHashtagList().add(feedPhotoHashtag.getHashtag().getContent());
                }
                feedDto.getPhotoDtoList().add(photoDto);
            }
            feedDtoList.add(feedDto);
        }
        return feedDtoList;
    }
}
