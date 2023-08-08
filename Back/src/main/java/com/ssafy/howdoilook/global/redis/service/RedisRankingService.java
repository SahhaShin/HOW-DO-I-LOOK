package com.ssafy.howdoilook.global.redis.service;

import com.ssafy.howdoilook.domain.user.entity.User;
import com.ssafy.howdoilook.domain.user.repository.UserRepository;
import com.ssafy.howdoilook.global.redis.dto.response.LikeTypeResponseDto;
import com.ssafy.howdoilook.global.redis.dto.response.RankingResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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

    @Transactional
    public void deleteScore(Long userId) {
        ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();

        String[] likeTypes = {"SEXY", "MODERN", "NATURAL", "LOVELY"};

        for (String likeType : likeTypes) {
            zSetOperations.remove(likeType, String.valueOf(userId));
        }
    }

    public List<RankingResponseDto> getRanking(String likeType) {
        ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();

        Set<String> ranking = zSetOperations.reverseRange(likeType, 0, -1);
        Set<ZSetOperations.TypedTuple<String>> rankingWithScores = zSetOperations.reverseRangeWithScores(likeType, 0, -1);

        List<Long> valueList = new ArrayList<>();

        for (ZSetOperations.TypedTuple<String> tuple : rankingWithScores)
            valueList.add(tuple.getScore().longValue());

        System.out.println("valueList = " + valueList);
        List<String> rankingList = new ArrayList<>(ranking);
        System.out.println("rankingList = " + rankingList);

        List<RankingResponseDto> rankingResponseDtoList = new ArrayList<>();

        for(int i=0; i<rankingList.size(); i++) {
            System.out.println(rankingList.get(i));
            User user = userRepository.findById(Long.parseLong(rankingList.get(i))).get();

            RankingResponseDto rankingResponseDto = RankingResponseDto.builder()
                    .userId(Long.parseLong(rankingList.get(i)))
                    .email(user.getEmail())
                    .rank(zSetOperations.reverseRank(likeType, rankingList.get(i)) + 1)
                    .likeType(likeType)
                    .score(valueList.get(i))
                    .nickname(user.getNickname())
                    .profileImg(user.getProfileImg())
                    .build();

            rankingResponseDtoList.add(rankingResponseDto);
        }

        return rankingResponseDtoList;
    }

    public List<RankingResponseDto> getBadgeOwnerList(String likeType) {
        List<User> userList = userRepository.findAll();

        Long badgeCnt = (long) (userList.size() / 10);

        if(badgeCnt == 0)
            badgeCnt = 1L;

        ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();

        Set<String> badgeSet = zSetOperations.range(likeType, 0, badgeCnt - 1);
        Set<ZSetOperations.TypedTuple<String>> rankingWithScores = zSetOperations.reverseRangeWithScores(likeType, 0, -1);

        System.out.println("rankingWithScores = " + rankingWithScores);
        
        List<Long> valueList = new ArrayList<>();

        for (ZSetOperations.TypedTuple<String> tuple : rankingWithScores)
            valueList.add(tuple.getScore().longValue());

        
        
        List<String> badgeList = new ArrayList<>(badgeSet);
        System.out.println("badgeList = " + badgeList);
        
        List<RankingResponseDto> rankingResponseDtoList = new ArrayList<>();

        for(int i=0; i<badgeList.size(); i++) {
            System.out.println("badgeList.get(i) = " + badgeList.get(i));
//            User user = userRepository.findById(Long.parseLong(badgeList.get(i))).get();

            Optional<User> optionalUser = userRepository.findById(Long.parseLong(badgeList.get(i)));

            User user = null;

            if(optionalUser.isEmpty())
                return rankingResponseDtoList;
            else
                user = optionalUser.get();

            RankingResponseDto rankingResponseDto = RankingResponseDto.builder()
                    .userId(Long.parseLong(badgeList.get(i)))
                    .email(user.getEmail())
                    .rank(zSetOperations.reverseRank(likeType, badgeList.get(i)) + 1)
                    .likeType(likeType)
                    .score(valueList.get(i))
                    .nickname(user.getNickname())
                    .profileImg(user.getProfileImg())
                    .build();

            rankingResponseDtoList.add(rankingResponseDto);
        }

        return rankingResponseDtoList;
    }

    public RankingResponseDto getRank(String likeType, Long userId) {
        ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();

        Set<ZSetOperations.TypedTuple<String>> scoreAndUsers = zSetOperations.reverseRangeWithScores(likeType, 0, -1);

        double score = 0;

        for (ZSetOperations.TypedTuple<String> scoreAndUser : scoreAndUsers) {
            if(scoreAndUser.getValue().equals(String.valueOf(userId))) {
                score = scoreAndUser.getScore();
                break;
            }
        }

        User user = userRepository.findById(userId).get();

        RankingResponseDto rankingResponseDto = RankingResponseDto.builder()
                .userId(userId)
                .email(user.getEmail())
                .rank(zSetOperations.reverseRank(likeType, String.valueOf(userId)) + 1)
                .likeType(likeType)
                .score((long) score)
                .nickname(user.getNickname())
                .profileImg(user.getProfileImg())
                .build();

        return rankingResponseDto;
    }

    public LikeTypeResponseDto getScore(Long userId) {
        ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();

        Set<ZSetOperations.TypedTuple<String>> lovelyScoresAndUsers = zSetOperations.reverseRangeWithScores("LOVELY", 0, -1);
        Set<ZSetOperations.TypedTuple<String>> sexyScoresAndUsers = zSetOperations.reverseRangeWithScores("SEXY", 0, -1);
        Set<ZSetOperations.TypedTuple<String>> naturalScoresAndUsers = zSetOperations.reverseRangeWithScores("NATURAL", 0, -1);
        Set<ZSetOperations.TypedTuple<String>> modernScoresAndUsers = zSetOperations.reverseRangeWithScores("MODERN", 0, -1);

        double lovelyScore = 0;
        double sexyScore = 0;
        double modernScore = 0;
        double naturalScore = 0;

        for (ZSetOperations.TypedTuple<String> lovelyScoresAndUser : lovelyScoresAndUsers) {
            if(lovelyScoresAndUser.getValue().equals(String.valueOf(userId))) {
                lovelyScore = lovelyScoresAndUser.getScore();
                break;
            }
        }

        for (ZSetOperations.TypedTuple<String> sexyScoresAndUser : sexyScoresAndUsers) {
            if(sexyScoresAndUser.getValue().equals(String.valueOf(userId))) {
                sexyScore = sexyScoresAndUser.getScore();
                break;
            }
        }

        for (ZSetOperations.TypedTuple<String> modernScoresAndUser : modernScoresAndUsers) {
            if(modernScoresAndUser.getValue().equals(String.valueOf(userId))) {
                modernScore = modernScoresAndUser.getScore();
                break;
            }
        }

        for (ZSetOperations.TypedTuple<String> naturalScoresAndUser : naturalScoresAndUsers) {
            if(naturalScoresAndUser.getValue().equals(String.valueOf(userId))) {
                naturalScore = naturalScoresAndUser.getScore();
                break;
            }
        }

        LikeTypeResponseDto likeTypeResponseDto = LikeTypeResponseDto.builder()
                .userId(userId)
                .lovelyScore((long) lovelyScore)
                .sexyScore((long) sexyScore)
                .modernScore((long) modernScore)
                .naturalScore((long) naturalScore)
                .build();

        return likeTypeResponseDto;
    }
}
