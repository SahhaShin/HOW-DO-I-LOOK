package com.ssafy.howdoilook.domain.feedLike.repository;

import com.ssafy.howdoilook.domain.feed.entity.Feed;
import com.ssafy.howdoilook.domain.feedLike.dto.response.FeedLikeCheckResponseDto;
import com.ssafy.howdoilook.domain.feedLike.dto.response.FeedLikeCountResponseDto;
import com.ssafy.howdoilook.domain.feedLike.entity.FeedLike;
import com.ssafy.howdoilook.domain.user.entity.User;

import java.util.List;

public interface FeedLikeCustomRepository {
    public FeedLike findFeedLikeByUserIdAndFeedIdAndType(User user, Feed feed, String type);

    public FeedLikeCountResponseDto countFeedLike(Long feedId);

    public FeedLikeCheckResponseDto checkFeedLike(Long userId, Long feedId);


}
