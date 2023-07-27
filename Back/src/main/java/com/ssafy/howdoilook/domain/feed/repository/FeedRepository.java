package com.ssafy.howdoilook.domain.feed.repository;

import com.ssafy.howdoilook.domain.feed.dto.response.FeedResponseDto;
import com.ssafy.howdoilook.domain.feed.entity.Feed;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface FeedRepository extends JpaRepository<Feed, Long>,FeedCustomRepository {
    @Override
    List<FeedResponseDto> selectFeedAll();

    @Override
    List<FeedResponseDto> selectFeedByHashTag(List<String> hashTagList);

    @Override
    <S extends Feed> S save(S entity);

    @Override
    Optional<Feed> findById(Long aLong);
}
