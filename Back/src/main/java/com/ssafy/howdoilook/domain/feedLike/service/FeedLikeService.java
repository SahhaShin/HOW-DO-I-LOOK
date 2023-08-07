package com.ssafy.howdoilook.domain.feedLike.service;

import com.ssafy.howdoilook.domain.feed.entity.Feed;
import com.ssafy.howdoilook.domain.feed.repository.FeedRepository;
import com.ssafy.howdoilook.domain.feedLike.dto.request.FeedLikeDeleteRequestDto;
import com.ssafy.howdoilook.domain.feedLike.dto.request.FeedLikeSaveRequestDto;
import com.ssafy.howdoilook.domain.feedLike.dto.response.FeedLikeCheckResponseDto;
import com.ssafy.howdoilook.domain.feedLike.dto.response.FeedLikeCountResponseDto;
import com.ssafy.howdoilook.domain.feedLike.entity.FeedLike;
import com.ssafy.howdoilook.domain.feedLike.entity.FeedLikeType;
import com.ssafy.howdoilook.domain.feedLike.repository.FeedLikeRepository;
import com.ssafy.howdoilook.domain.user.dto.response.UserSimpleResponseDto;
import com.ssafy.howdoilook.domain.user.entity.User;
import com.ssafy.howdoilook.domain.user.repository.UserRepository;
import com.ssafy.howdoilook.domain.user.service.UserService;
import com.ssafy.howdoilook.global.handler.AccessException;
import com.ssafy.howdoilook.global.redis.service.RedisRankingService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FeedLikeService {

    private final FeedLikeRepository feedLikeRepository;

    private final UserRepository userRepository;

    private final FeedRepository feedRepository;

    private final RedisRankingService redisRankingService;

    @Transactional
    public Long saveFeedLike(FeedLikeSaveRequestDto feedLikeSaveRequestDto){
//    public Long saveFeedLike(FeedLikeSaveRequestDto feedLikeSaveRequestDto, UserDetails userDetails){
//        String clientEmail = userDetails.getUsername();

        User findUser = userRepository.findById(feedLikeSaveRequestDto.getUserId()).orElseThrow(
                ()->new EmptyResultDataAccessException("존재하지 않는 User입니다.",1));

//        if (!clientEmail.equals(findUser.getEmail())){
//            throw new AccessException("접근 권한이 없습니다.");
//        }

        Feed findFeed = feedRepository.findById(feedLikeSaveRequestDto.getFeedId()).orElseThrow(
                ()->new EmptyResultDataAccessException("존재하지 않는 Feed입니다.",1));

        FeedLike findFeedLike = feedLikeRepository.findFeedLikeByUserIdAndFeedIdAndType(findUser, findFeed, feedLikeSaveRequestDto.getType());

        if (findFeedLike!=null){
            throw new IllegalArgumentException("이미 처리된 '좋아요'입니다.");
        }

        FeedLike feedlike = FeedLike.builder()
                .user(findUser)
                .feed(findFeed)
                .type(FeedLikeType.valueOf(feedLikeSaveRequestDto.getType()))
                .build();

        feedLikeRepository.save(feedlike);

        redisRankingService.updateScore(feedLikeSaveRequestDto.getType(), findFeed.getUser().getId(), 1);

        return feedlike.getId();
    }
    @Transactional
    public void deleteFeedLike(FeedLikeDeleteRequestDto feedLikeDeleteRequestDto, UserDetails userDetails){
        String clientEmail = userDetails.getUsername();

        User findUser = userRepository.findById(feedLikeDeleteRequestDto.getUserId()).orElseThrow(
                ()->new EmptyResultDataAccessException("존재하지 않는 User입니다.",1));

        if (!clientEmail.equals(findUser.getEmail())){
            throw new AccessException("접근 권한이 없습니다.");
        }


        Feed findFeed = feedRepository.findById(feedLikeDeleteRequestDto.getFeedId()).orElseThrow(
                ()->new EmptyResultDataAccessException("존재하지 않는 Feed입니다.",1));

        FeedLike findFeedLike = feedLikeRepository.findFeedLikeByUserIdAndFeedIdAndType(findUser, findFeed, feedLikeDeleteRequestDto.getType());

        if (findFeedLike==null){
            throw new IllegalArgumentException("존재하지 않는 '좋아요'입니다.");
        }

        feedLikeRepository.delete(findFeedLike);

        redisRankingService.updateScore(feedLikeDeleteRequestDto.getType(), findFeed.getUser().getId(), -1);
    }
    public FeedLikeCountResponseDto countFeedLike(Long feedId){
        return feedLikeRepository.countFeedLike(feedId);
    }


    public FeedLikeCheckResponseDto checkFeedLike(Long userId, Long feedId){
        return feedLikeRepository.checkFeedLike(userId, feedId);
    }
    
}
