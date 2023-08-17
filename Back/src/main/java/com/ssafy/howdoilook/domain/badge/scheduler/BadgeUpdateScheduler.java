package com.ssafy.howdoilook.domain.badge.scheduler;

import com.ssafy.howdoilook.domain.badge.service.BadgeService;
import com.ssafy.howdoilook.domain.user.entity.BadgeType;
import com.ssafy.howdoilook.domain.user.entity.User;
import com.ssafy.howdoilook.domain.user.repository.UserRepository;
import com.ssafy.howdoilook.global.redis.dto.response.RankingResponseDto;
import com.ssafy.howdoilook.global.redis.service.RedisRankingService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@EnableScheduling
@RequiredArgsConstructor
public class BadgeUpdateScheduler {

    private final RedisRankingService redisRankingService;

    private final BadgeService badgeService;

    private final UserRepository userRepository;

    // 매 시간 발동
    @Scheduled(cron = "0 10 3 * * *")
    public void updateBadge() {

        badgeService.deleteAllBadge();

        List<User> userList = userRepository.findAll();

        for (User user : userList) {
            user.updateShowBadgeType(BadgeType.X);
        }

        List<RankingResponseDto> lovelyBadgeOwnerList = redisRankingService.getBadgeOwnerList(String.valueOf(BadgeType.LOVELY));
        List<RankingResponseDto> sexyBadgeOwnerList = redisRankingService.getBadgeOwnerList(String.valueOf(BadgeType.SEXY));
        List<RankingResponseDto> modernBadgeOwnerList = redisRankingService.getBadgeOwnerList(String.valueOf(BadgeType.MODERN));
        List<RankingResponseDto> naturalBadgeOwnerList = redisRankingService.getBadgeOwnerList(String.valueOf(BadgeType.NATURAL));

        for (RankingResponseDto rankingResponseDto : lovelyBadgeOwnerList)
            badgeService.awardedBadge(rankingResponseDto.getUserId(), BadgeType.valueOf(String.valueOf(rankingResponseDto.getLikeType())));

        for (RankingResponseDto rankingResponseDto : sexyBadgeOwnerList)
            badgeService.awardedBadge(rankingResponseDto.getUserId(), BadgeType.valueOf(String.valueOf(rankingResponseDto.getLikeType())));

        for (RankingResponseDto rankingResponseDto : modernBadgeOwnerList)
            badgeService.awardedBadge(rankingResponseDto.getUserId(), BadgeType.valueOf(String.valueOf(rankingResponseDto.getLikeType())));

        for (RankingResponseDto rankingResponseDto : naturalBadgeOwnerList)
            badgeService.awardedBadge(rankingResponseDto.getUserId(), BadgeType.valueOf(String.valueOf(rankingResponseDto.getLikeType())));

        System.out.println("////////////////////////////////////////////BADGE 부여 Time//////////////////////////////////////////////////////////////////////");
    }
}
