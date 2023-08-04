package com.ssafy.howdoilook.domain.feed.repository;


import com.ssafy.howdoilook.domain.feed.entity.Feed;
import com.ssafy.howdoilook.domain.follow.entity.Follow;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface FeedCustomRepository {

    Page<Feed> selectFeedAll(Pageable pageable);

    Page<Feed> selectFeedByHashTag(List<String> hashTagList,Pageable pageable);

    Page<Feed> selectByUserFollowee(List<Follow> followList,Pageable pageable);

    Page<Feed> selectByUserId(Long userId,Pageable pageable);
    Page<Feed> selectLikedFeed(Long userId,Pageable pageable);
}
