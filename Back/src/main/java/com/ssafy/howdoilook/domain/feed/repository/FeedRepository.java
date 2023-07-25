package com.ssafy.howdoilook.domain.feed.repository;

import com.ssafy.howdoilook.domain.feed.entity.Feed;
import org.springframework.data.jpa.repository.JpaRepository;


public interface FeedRepository extends JpaRepository<Feed, Long>,FeedRepositoryCustom {


}
