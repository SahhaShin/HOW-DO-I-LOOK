package com.ssafy.howdoilook.domain.feed.repository;


import com.ssafy.howdoilook.domain.feed.dto.response.FeedResponseDto;

import java.util.List;

public interface FeedCustomRepository {
    List<FeedResponseDto> selectFeedAll();

    List<FeedResponseDto> selectFeedByHashTag(List<String> hashTagList);
}
