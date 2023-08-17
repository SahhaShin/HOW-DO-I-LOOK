package com.ssafy.howdoilook.domain.feed.repository;

import com.ssafy.howdoilook.domain.feed.entity.Feed;
import com.ssafy.howdoilook.domain.follow.entity.Follow;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface FeedRepository extends JpaRepository<Feed, Long>,FeedCustomRepository {



    @Override
    <S extends Feed> S save(S entity);

    @Override
    Optional<Feed> findById(Long aLong);

    @Override
    Page<Feed> selectFeedAll(Pageable pageable);

    @Override
    Page<Feed> selectByUserFollowee(List<Follow> followList, Pageable pageable);
}
