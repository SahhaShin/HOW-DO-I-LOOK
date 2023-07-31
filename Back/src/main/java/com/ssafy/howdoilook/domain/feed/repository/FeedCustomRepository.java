package com.ssafy.howdoilook.domain.feed.repository;


import com.ssafy.howdoilook.domain.feed.dto.response.FeedResponseDto;
import com.ssafy.howdoilook.domain.feed.entity.Feed;
import com.ssafy.howdoilook.domain.follow.entity.Follow;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface FeedCustomRepository {
    List<FeedResponseDto> selectFeedAll();

    Page<Feed> selectFeedAll(Pageable pageable);

    List<FeedResponseDto> selectFeedByHashTag(List<String> hashTagList);
    List<FeedResponseDto> selectByUserFollowee(List<Follow> followList);
}
