package com.ssafy.howdoilook.domain.follow.repository;

import com.ssafy.howdoilook.domain.follow.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowRepository extends JpaRepository<Follow,Long>,FollowCustomRepository {
}
