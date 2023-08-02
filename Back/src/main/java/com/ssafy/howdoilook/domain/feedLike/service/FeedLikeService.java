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
import com.ssafy.howdoilook.global.redis.service.RedisRankingService;
import lombok.RequiredArgsConstructor;
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
        User findUser = userRepository.findById(feedLikeSaveRequestDto.getUserId()).orElseThrow(
                ()->new IllegalArgumentException("user를 찾지 못했습니다."));

        Feed findFeed = feedRepository.findById(feedLikeSaveRequestDto.getFeedId()).orElseThrow(
                ()->new IllegalArgumentException("feed를 찾지 못했습니다."));

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
    public void deleteFeedLike(FeedLikeDeleteRequestDto feedLikeDeleteRequestDto){
        User findUser = userRepository.findById(feedLikeDeleteRequestDto.getUserId()).orElseThrow(
                ()->new IllegalArgumentException("user를 찾지 못했습니다."));

        Feed findFeed = feedRepository.findById(feedLikeDeleteRequestDto.getFeedId()).orElseThrow(
                ()->new IllegalArgumentException("feed를 찾지 못했습니다."));

        FeedLike findFeedLike = feedLikeRepository.findFeedLikeByUserIdAndFeedIdAndType(findUser, findFeed, feedLikeDeleteRequestDto.getType());

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
