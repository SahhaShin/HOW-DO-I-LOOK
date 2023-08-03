package com.ssafy.howdoilook.domain.badge.repository;

import com.ssafy.howdoilook.domain.badge.entity.Badge;
import com.ssafy.howdoilook.domain.user.entity.BadgeType;
import com.ssafy.howdoilook.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BadgeRepository extends JpaRepository<Badge, Long> {

    List<Badge> findAllByUser(User user);

    List<Badge> findAllByBadgeType(BadgeType badgeType);
}
