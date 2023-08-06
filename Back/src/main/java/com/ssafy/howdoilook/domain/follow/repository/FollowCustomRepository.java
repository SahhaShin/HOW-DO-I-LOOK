package com.ssafy.howdoilook.domain.follow.repository;

import com.ssafy.howdoilook.domain.follow.entity.Follow;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface FollowCustomRepository {
    public Follow findFollowIdByFollowerAndFollowee(Long followerId, Long followeeId);

    public Page<Follow> findFolloweeByUserId(Long followerId, Pageable page);

    public Page<Follow> findFollowerByUserId(Long followeeId, Pageable page);

    public List<Follow> findAllFolloweeByUserId(Long userId);

    public List<Follow> findAllFollowerByUserId(Long userId);
}
