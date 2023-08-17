package com.ssafy.howdoilook.domain.feedLike.repository;

import com.ssafy.howdoilook.domain.feedLike.entity.FeedLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedLikeRepository extends JpaRepository<FeedLike,Long>,FeedLikeCustomRepository {
}
