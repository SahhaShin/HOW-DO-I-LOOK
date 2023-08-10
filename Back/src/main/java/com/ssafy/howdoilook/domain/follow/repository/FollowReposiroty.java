package com.ssafy.howdoilook.domain.follow.repository;

import com.ssafy.howdoilook.domain.follow.entity.Follow;
import com.ssafy.howdoilook.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FollowReposiroty extends JpaRepository<Follow,Long>,FollowCustomRepository {
}
