package com.ssafy.howdoilook.domain.feedLike.repository;

import com.ssafy.howdoilook.domain.feed.entity.Feed;
import com.ssafy.howdoilook.domain.feedLike.entity.FeedLike;
import com.ssafy.howdoilook.domain.user.entity.User;

public interface FeedLikeCustomRepository {
    public FeedLike findFeedLikeByUserIdAndFeedIdAndType(User user, Feed feed, String type);
}
