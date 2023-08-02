package com.ssafy.howdoilook.domain.badge.service;

import com.ssafy.howdoilook.domain.badge.dto.response.BadgeResponseDto;
import com.ssafy.howdoilook.domain.badge.entity.Badge;
import com.ssafy.howdoilook.domain.badge.repository.BadgeRepository;
import com.ssafy.howdoilook.domain.user.dto.response.UserSimpleResponseDto;
import com.ssafy.howdoilook.domain.user.entity.BadgeType;
import com.ssafy.howdoilook.domain.user.entity.User;
import com.ssafy.howdoilook.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BadgeService {

    private final BadgeRepository badgeRepository;

    private final UserRepository userRepository;

    @Transactional
    public long awardedBadge(Long userId, BadgeType badgeType) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저 존재 X"));

        Badge badge = Badge.builder()
                        .badgeType(badgeType)
                        .user(user)
                        .build();

        badgeRepository.save(badge);

        return badge.getId();
    }

    @Transactional
    public void deleteAllBadge() {
        badgeRepository.deleteAll();
    }

    public List<BadgeResponseDto> getUserBadgeList(Long userId) {
        User user = userRepository.findById(userId)
                        .orElseThrow(() -> new IllegalArgumentException("해당 유저가 존재하지 않습니다."));

        List<BadgeResponseDto> badgeResponseDtoList = new ArrayList<>();

        List<Badge> badgeList = badgeRepository.findAllByUser(user);

        for (Badge badge : badgeList) {
            BadgeResponseDto badgeResponseDto = BadgeResponseDto.builder()
                    .badgeId(badge.getId())
                    .badgeType(badge.getBadgeType())
                    .user(badge.getUser())
                    .build();

            badgeResponseDtoList.add(badgeResponseDto);
        }

        return badgeResponseDtoList;
    }

    public List<UserSimpleResponseDto> getUserListByBadge(String badgeType) {
        List<UserSimpleResponseDto> userSimpleResponseDtoList = new ArrayList<>();

        List<Badge> badgeList = badgeRepository.findAllByBadgeType(BadgeType.valueOf(badgeType));

        for (Badge b : badgeList) {
            UserSimpleResponseDto userSimpleResponseDto = UserSimpleResponseDto.builder()
                    .id(b.getUser().getId())
                    .email(b.getUser().getEmail())
                    .name(b.getUser().getName())
                    .nickname(b.getUser().getNickname())
                    .gender(b.getUser().getGender())
                    .age(b.getUser().getAge())
                    .profileImg(b.getUser().getProfileImg())
                    .build();

            userSimpleResponseDtoList.add(userSimpleResponseDto);
        }

        return userSimpleResponseDtoList;
    }
}
