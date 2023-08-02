package com.ssafy.howdoilook.global.redis.service;

import com.ssafy.howdoilook.domain.user.entity.User;
import com.ssafy.howdoilook.domain.user.repository.UserRepository;
import com.ssafy.howdoilook.global.redis.dto.response.RankingResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RedisRankingService {

    private final StringRedisTemplate redisTemplate;

    private final UserRepository userRepository;

    @Transactional
    public void updateScore(String likeType, long userId, int score) {
        ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();

        Long result = zSetOperations.reverseRank(likeType, String.valueOf(userId));

    if(result == null)
        zSetOperations.add(likeType, String.valueOf(userId), score);
    else
        zSetOperations.incrementScore(likeType, String.valueOf(userId), score);
    }

    public List<RankingResponseDto> getRanking(String likeType) {
        ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();

        Set<String> ranking = zSetOperations.reverseRange(likeType, 0, -1);
        Set<ZSetOperations.TypedTuple<String>> rankingWithScores = zSetOperations.reverseRangeWithScores(likeType, 0, -1);

        List<Long> valueList = new ArrayList<>();

        for (ZSetOperations.TypedTuple<String> tuple : rankingWithScores)
            valueList.add(tuple.getScore().longValue());

        List<String> rankingList = new ArrayList<>(ranking);

        List<RankingResponseDto> rankingResponseDtoList = new ArrayList<>();

        for(int i=0; i<rankingList.size(); i++) {
            User user = userRepository.findById(Long.parseLong(rankingList.get(i))).get();

            RankingResponseDto rankingResponseDto = RankingResponseDto.builder()
                    .userId(Long.parseLong(rankingList.get(i)))
                    .email(user.getEmail())
                    .rank(zSetOperations.reverseRank(likeType, rankingList.get(i)))
                    .likeType(likeType)
                    .score(valueList.get(i))
                    .build();

            rankingResponseDtoList.add(rankingResponseDto);
        }

        return rankingResponseDtoList;
    }

    public List<RankingResponseDto> getBadgeOwnerList(String likeType) {
        List<User> userList = userRepository.findAll();

        Long badgeCnt = (long) (userList.size() / 2);

        ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();

        Set<String> badgeSet = zSetOperations.reverseRange(likeType, 0, badgeCnt - 1);
        Set<ZSetOperations.TypedTuple<String>> rankingWithScores = zSetOperations.reverseRangeWithScores(likeType, 0, -1);

        List<Long> valueList = new ArrayList<>();

        for (ZSetOperations.TypedTuple<String> tuple : rankingWithScores)
            valueList.add(tuple.getScore().longValue());

        List<String> badgeList = new ArrayList<>(badgeSet);

        List<RankingResponseDto> rankingResponseDtoList = new ArrayList<>();

        for(int i=0; i<badgeList.size(); i++) {
            User user = userRepository.findById(Long.parseLong(badgeList.get(i))).get();

            RankingResponseDto rankingResponseDto = RankingResponseDto.builder()
                    .userId(Long.parseLong(badgeList.get(i)))
                    .email(user.getEmail())
                    .rank(zSetOperations.reverseRank(likeType, badgeList.get(i)))
                    .likeType(likeType)
                    .score(valueList.get(i))
                    .build();

            rankingResponseDtoList.add(rankingResponseDto);
        }

        return rankingResponseDtoList;
    }

    public RankingResponseDto getRank(String likeType, Long userId) {
        ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();

        User user = userRepository.findById(userId).get();

        RankingResponseDto rankingResponseDto = RankingResponseDto.builder()
                .userId(userId)
                .email(user.getEmail())
                .rank(zSetOperations.reverseRank(likeType, String.valueOf(userId)))
                .likeType(likeType)
                .score(zSetOperations.score(likeType, userId).longValue())
                .build();

        return rankingResponseDto;
    }

    public boolean checkBadge(String likeType, Long userId) {
        List<RankingResponseDto> badgeOwnerList = this.getBadgeOwnerList(likeType);

        for (RankingResponseDto rankingResponseDto : badgeOwnerList) {
            if(rankingResponseDto.getUserId() == userId)
                return true;
        }

        return false;
    }
}
