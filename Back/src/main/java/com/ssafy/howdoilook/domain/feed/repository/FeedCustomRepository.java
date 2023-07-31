package com.ssafy.howdoilook.domain.feed.repository;


import com.ssafy.howdoilook.domain.feed.dto.response.FeedResponseDto;
import com.ssafy.howdoilook.domain.follow.entity.Follow;
import com.ssafy.howdoilook.domain.user.entity.User;

import java.util.List;

public interface FeedCustomRepository {
    List<FeedResponseDto> selectFeedAll();

    List<FeedResponseDto> selectFeedByHashTag(List<String> hashTagList);
    List<FeedResponseDto> selectByUserFollowee(List<Follow> followList);
}
