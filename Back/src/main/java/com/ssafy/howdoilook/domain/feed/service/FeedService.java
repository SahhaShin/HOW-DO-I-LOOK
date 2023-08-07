package com.ssafy.howdoilook.domain.feed.service;

import com.ssafy.howdoilook.domain.comment.repository.CommentRepository;
import com.ssafy.howdoilook.domain.feed.dto.request.FeedSaveRequestDto;
import com.ssafy.howdoilook.domain.feed.dto.request.FeedUpdateRequestDto;
import com.ssafy.howdoilook.domain.feed.dto.request.PhotoSaveRequestDto;
import com.ssafy.howdoilook.domain.feed.dto.request.PhotoUpdateRequestDto;
import com.ssafy.howdoilook.domain.feed.dto.response.FeedResponseDto;
import com.ssafy.howdoilook.domain.feed.dto.response.PhotoResponseDto;
import com.ssafy.howdoilook.domain.feed.entity.Feed;
import com.ssafy.howdoilook.domain.feed.repository.FeedRepository;
import com.ssafy.howdoilook.domain.feedLike.service.FeedLikeService;
import com.ssafy.howdoilook.domain.feedPhoto.entity.FeedPhoto;
import com.ssafy.howdoilook.domain.feedPhoto.repository.FeedPhotoRepository;
import com.ssafy.howdoilook.domain.feedPhoto.service.FeedPhotoService;
import com.ssafy.howdoilook.domain.feedPhotoHashtag.entity.FeedPhotoHashtag;
import com.ssafy.howdoilook.domain.feedPhotoHashtag.service.FeedPhotoHashtagService;
import com.ssafy.howdoilook.domain.follow.entity.Follow;
import com.ssafy.howdoilook.domain.follow.service.FollowService;
import com.ssafy.howdoilook.domain.hashtag.service.HashTagService;
import com.ssafy.howdoilook.domain.user.entity.User;
import com.ssafy.howdoilook.domain.user.repository.UserRepository;
import com.ssafy.howdoilook.global.authorization.AuthorizationService;
import com.ssafy.howdoilook.global.handler.AccessException;
import com.ssafy.howdoilook.global.s3upload.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FeedService {

    private final HashTagService hashTagService;
    private final FeedPhotoService feedPhotoService;
    private final FeedPhotoHashtagService feedPhotoHashtagService;
    private final FeedLikeService feedLikeService;
    private final FollowService followService;
    private final ImageService imageService;
    private final AuthorizationService authorizationService;
    private final CommentRepository commentRepository;
    private final FeedRepository feedRepository;
    private final FeedPhotoRepository feedPhotoRepository;
    private final UserRepository userRepository;

    public Page<FeedResponseDto> selectAll(Pageable pageable){
        Page<Feed> feeds = feedRepository.selectFeedAll(pageable);
        List<Feed> feedList = feeds.getContent();
        List<FeedResponseDto> feedResponseDtoList = builder(feedList);
        return new PageImpl<>(feedResponseDtoList, feeds.getPageable(), feeds.getTotalElements());
    }
    public Page<FeedResponseDto> selectByHashTag(List<String> hashtagList,Pageable pageable){
        Page<Feed> feeds = feedRepository.selectFeedByHashTag(hashtagList, pageable);
        List<Feed> feedList = feeds.getContent();
        List<FeedResponseDto> feedResponseDtoList = builder(feedList);
        return new PageImpl<>(feedResponseDtoList, feeds.getPageable(), feeds.getTotalElements());
    }
    public Page<FeedResponseDto> selectByUserFollowee(Long userId,Pageable pageable){
        User findUser = userRepository.findById(userId).orElseThrow(
                ()->new EmptyResultDataAccessException("존재하지 않는 User 입니다.",1));
        //찾은 유저가 팔로우 하고있는 팔로우정보를 가져온다.
        List<Follow> followeeList = findUser.getFollowerList();
        Page<Feed> feeds = feedRepository.selectByUserFollowee(followeeList, pageable);
        List<Feed> feedList = feeds.getContent();
        List<FeedResponseDto> feedResponseDtoList = builder(feedList);
        return new PageImpl<>(feedResponseDtoList, feeds.getPageable(), feeds.getTotalElements());
    }
    public Page<FeedResponseDto> selectByUserId(Long userId,Pageable pageable){
        Page<Feed> feeds = feedRepository.selectByUserId(userId, pageable);
        List<Feed> feedList = feeds.getContent();
        List<FeedResponseDto> feedResponseDtoList = builder(feedList);
        return new PageImpl<>(feedResponseDtoList, feeds.getPageable(), feeds.getTotalElements());
    }

    public Page<FeedResponseDto> selectLikedFeed(Long userId,Pageable pageable){
        Page<Feed> feeds = feedRepository.selectLikedFeed(userId, pageable);
        List<Feed> feedList = feeds.getContent();
        List<FeedResponseDto> feedResponseDtoList = builder(feedList);
        return new PageImpl<>(feedResponseDtoList, feeds.getPageable(), feeds.getTotalElements());
    }

    @Transactional
    public Long saveFeed(FeedSaveRequestDto feedSaveRequestDto, UserDetails userDetails, List<MultipartFile> multipartFileList) {
        authorizationService.auth(feedSaveRequestDto.getUserId(), userDetails);

        for (int i = 0; i < multipartFileList.size(); i++) {
            try {
                String link = imageService.saveImage(multipartFileList.get(i));
                feedSaveRequestDto.getPhotoSaveRequestDtoList().get(i).setLink(link);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        User findUser = userRepository.findById(feedSaveRequestDto.getUserId()).orElseThrow(
                () -> new EmptyResultDataAccessException("존재하지 않는 User 입니다.", 1));

        //Feed Entity 만들기
        Feed feedEntity = Feed.builder()
                .content(feedSaveRequestDto.getContent())
                .user(findUser)
                .build();
        feedRepository.save(feedEntity);

        List<PhotoSaveRequestDto> photoSaveRequestDtoList = feedSaveRequestDto.getPhotoSaveRequestDtoList();

        if (photoSaveRequestDtoList !=null&&photoSaveRequestDtoList.size() != 0){
            for (PhotoSaveRequestDto photoSaveRequestDto : photoSaveRequestDtoList) {
                feedPhotoService.saveFeedPhoto(feedEntity.getId(), photoSaveRequestDto);
            }
        }else{
            throw new IllegalArgumentException("사진이 없으면 피드를 저장할 수 없습니다.");
        }
        return feedEntity.getId();
    }

    @Transactional
    public Long updateFeed(FeedUpdateRequestDto feedUpdateRequestDto, UserDetails userDetails){
        String clientEmail = userDetails.getUsername();

        //넘어온 회원찾기
        User findUser = userRepository.findById(feedUpdateRequestDto.getUserId()).orElseThrow(
                ()->new EmptyResultDataAccessException("존재하지 않는 User 입니다.",1));

        if (!findUser.getEmail().equals(clientEmail)){
            throw new AccessException("접근 권한이 없습니다.");
        }

        //넘어온 피드찾기
        Feed findFeed = feedRepository.findById(feedUpdateRequestDto.getFeedId()).orElseThrow(
                () -> new EmptyResultDataAccessException("존재하지 않는 Feed입니다.",1));
        //피드 내용 업데이트
        findFeed.updateContent(feedUpdateRequestDto.getContent());
        //피드에 딸린 사진 가져오기
        List<PhotoUpdateRequestDto> photoUpdateRequestDtoList = feedUpdateRequestDto.getPhotoUpdateRequestDtoList();
        if (photoUpdateRequestDtoList != null && photoUpdateRequestDtoList.size() != 0){
            for (PhotoUpdateRequestDto photoUpdateRequestDto : photoUpdateRequestDtoList) {
                //사진별로 업데이트 하기
                feedPhotoService.updateFeedPhoto(photoUpdateRequestDto);
            }
        }
        else{
            throw new IllegalArgumentException("사진이 없으면 피드를 저장할 수 없습니다.");
        }

        return findFeed.getId();
    }
    @Transactional
    public void deleteFeed(Long feedId, UserDetails userDetails){
        String clientEmail = userDetails.getUsername();

        Feed findFeed = feedRepository.findById(feedId).orElseThrow(
                () -> new EmptyResultDataAccessException("존재하지 않는 Feed입니다.",1));

        if(!findFeed.getUser().getEmail().equals(clientEmail)){
            throw new AccessException("접근 권한이 없습니다.");
        }

        List<String> linkList = feedPhotoRepository.selectLinkListByFeedId(feedId);
        System.out.println("linkList.size() = " + linkList.size());
        for (String link : linkList) {
            System.out.println("하나를 삭제합니다.");
            imageService.deleteImage(link);
        }
        feedRepository.delete(findFeed);
    }

    private List<FeedResponseDto> builder(List<Feed> feedList){
        List<FeedResponseDto> feedResponseDtoList = new ArrayList<>();
        for (Feed feed : feedList) {
            FeedResponseDto feedResponseDto = new FeedResponseDto();
            feedResponseDto.setUserId(feed.getUser().getId());
            feedResponseDto.setUserNickname(feed.getUser().getNickname());
            feedResponseDto.setFeedId(feed.getId());
            feedResponseDto.setFeedContent(feed.getContent());
            feedResponseDto.setCommentCount(commentRepository.selectCommentCountByFeedId(feed.getId()));
            feedResponseDto.setFeedCreatedDate(feed.getCreatedDate());
            feedResponseDto.setFeedUpdateDate(feed.getModifiedDate());
            feedResponseDto.setFeedLikeCountResponseDto(feedLikeService.countFeedLike(feed.getId()));
            feedResponseDto.setPhotoResponseDtoList(new ArrayList<>());
            List<FeedPhoto> feedPhotoList = feed.getFeedPhotoList();
            for (FeedPhoto feedPhoto : feedPhotoList) {
                PhotoResponseDto photoResponseDto = new PhotoResponseDto();
                photoResponseDto.setId(feedPhoto.getId());
                photoResponseDto.setLink(feedPhoto.getLink());
                photoResponseDto.setHashtagList(new ArrayList<>());
                List<FeedPhotoHashtag> feedPhotoHashtagList = feedPhoto.getFeedPhotoHashtagList();
                for (FeedPhotoHashtag feedPhotoHashtag : feedPhotoHashtagList) {
                    photoResponseDto.getHashtagList().add(feedPhotoHashtag.getHashtag().getContent());
                }
                feedResponseDto.getPhotoResponseDtoList().add(photoResponseDto);
            }
            feedResponseDtoList.add(feedResponseDto);
        }
        return feedResponseDtoList;
    }
}
