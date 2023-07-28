package com.ssafy.howdoilook.domain.follow.repository;

import com.ssafy.howdoilook.domain.follow.entity.Follow;

public interface FollowCustomRepository {
    public Follow findFollowIdByFollowerAndFollowee(Long followerId, Long followeeId);
}
