package com.ssafy.howdoilook.domain.feed.service;

import com.ssafy.howdoilook.domain.feed.dto.request.FeedSaveRequestDto;
import com.ssafy.howdoilook.domain.feed.dto.PhotoDto;
import com.ssafy.howdoilook.domain.feed.dto.request.FeedUpdateRequestDto;
import com.ssafy.howdoilook.domain.feed.dto.response.FeedDto;
import com.ssafy.howdoilook.domain.feed.dto.response.FeedResponseDto;
import com.ssafy.howdoilook.domain.feed.entity.Feed;
import com.ssafy.howdoilook.domain.feed.repository.FeedRepository;
import com.ssafy.howdoilook.domain.feedLike.dto.response.FeedLikeCountResponseDto;
import com.ssafy.howdoilook.domain.feedLike.service.FeedLikeService;
import com.ssafy.howdoilook.domain.feedPhoto.service.FeedPhotoService;
import com.ssafy.howdoilook.domain.feedPhotoHashtag.service.FeedPhotoHashtagService;
import com.ssafy.howdoilook.domain.follow.dto.response.FolloweeResponseDto;
import com.ssafy.howdoilook.domain.follow.entity.Follow;
import com.ssafy.howdoilook.domain.follow.service.FollowService;
import com.ssafy.howdoilook.domain.hashtag.service.HashTagService;
import com.ssafy.howdoilook.domain.user.entity.User;
import com.ssafy.howdoilook.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
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
    public List<FeedDto> selectAll(){
        List<FeedResponseDto> feedResponseDtoList = feedRepository.selectFeedAll();
        List<FeedDto> feedDtoList = slicingAndCapsule(feedResponseDtoList);
        for (FeedDto feedDto : feedDtoList) {
            FeedLikeCountResponseDto feedLikeCountResponseDto = feedLikeService.countFeedLike(feedDto.getFeedId());
            feedDto.setFeedLikeCountResponseDto(feedLikeCountResponseDto);
        }
        return feedDtoList;
    }
    public List<FeedDto> selectByHashTag(List<String> hashtagList){
        List<FeedResponseDto> feedResponseDtoList = feedRepository.selectFeedByHashTag(hashtagList);
        List<FeedDto> feedDtoList = slicingAndCapsule(feedResponseDtoList);
        for (FeedDto feedDto : feedDtoList) {
            FeedLikeCountResponseDto feedLikeCountResponseDto = feedLikeService.countFeedLike(feedDto.getFeedId());
            feedDto.setFeedLikeCountResponseDto(feedLikeCountResponseDto);
        }
        return feedDtoList;
    }
    public List<FeedDto> selectByUserFollowee(Long userId){
        User findUser = userRepository.findById(userId).orElseThrow(
                ()->new IllegalArgumentException("존재하지 않는 User 입니다."));
        //찾은 유저가 팔로우 하고있는 팔로우정보를 가져온다.
        List<Follow> followeeList = findUser.getFollowerList();
        List<FeedResponseDto> feedResponseDtoList = feedRepository.selectByUserFollowee(followeeList);
        List<FeedDto> feedDtoList = slicingAndCapsule(feedResponseDtoList);
        return feedDtoList;
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

    /**
     * 내부에서만 사용하는 메서드
     * repository에서 필요한 정보를 전부 가져오면
     * 프론트로 보내기 좋게 슬라이싱하고 캡슐화하는 메서드
     * @param feedResponseDtoList
     * @return
     */
    private List<FeedDto> slicingAndCapsule(List<FeedResponseDto> feedResponseDtoList){
        List<FeedDto> feedDtoList = new ArrayList<>();
        long feedId = 0;
        long photoId = 0;
        for (FeedResponseDto feedResponseDto : feedResponseDtoList) {
            //피드 새로만들어야 되는 것
            if (feedResponseDto.getFeedId()!=feedId){
                feedId = feedResponseDto.getFeedId();
                FeedDto feedDto = FeedDto.builder()
                        .userId(feedResponseDto.getUserId())
                        .feedId(feedResponseDto.getFeedId())
                        .feedContent(feedResponseDto.getFeedContent())
                        .feedCreatedDate(feedResponseDto.getFeedCreatedDate())
                        .feedUpdateDate(feedResponseDto.getFeedUpdateDate())
                        .photoDtoList(new ArrayList<PhotoDto>())
                        .build();
                feedDtoList.add(feedDto);
            }
            int feedListSize = feedDtoList.size();

            if (photoId!=feedResponseDto.getFeedPhotoId()) {
                photoId=feedResponseDto.getFeedPhotoId();
                PhotoDto photoDto = PhotoDto.builder()
                        .id(feedResponseDto.getFeedPhotoId())
                        .link(feedResponseDto.getFeedPhotoLink())
                        .hashtagList(new ArrayList<>())
                        .build();
                feedDtoList.get(feedListSize - 1).getPhotoDtoList().add(photoDto);
            }
            int photoListSize = feedDtoList.get(feedListSize - 1).getPhotoDtoList().size();

            feedDtoList.get(feedListSize - 1).getPhotoDtoList()
                    .get(photoListSize - 1).getHashtagList()
                    .add(feedResponseDto.getHashtagContent());
        }
        return feedDtoList;
    }
}
