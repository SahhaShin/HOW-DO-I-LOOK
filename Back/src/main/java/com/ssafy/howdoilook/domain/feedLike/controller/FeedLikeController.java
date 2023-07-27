package com.ssafy.howdoilook.domain.feedLike.controller;

import com.ssafy.howdoilook.domain.feedLike.dto.request.FeedLikeDeleteRequestDto;
import com.ssafy.howdoilook.domain.feedLike.dto.request.FeedLikeSaveRequestDto;
import com.ssafy.howdoilook.domain.feedLike.service.FeedLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/feedlike")
public class FeedLikeController {

    private final FeedLikeService feedLikeService;
    @PostMapping("/")
    public Long saveFeedLike(@RequestBody FeedLikeSaveRequestDto feedLikeSaveRequestDto){
        return feedLikeService.saveFeedLike(feedLikeSaveRequestDto);
    }

    @DeleteMapping("/")
    public void deleteFeedLike(@RequestBody FeedLikeDeleteRequestDto feedLikeDeleteRequestDto){
        feedLikeService.deleteFeedLike(feedLikeDeleteRequestDto);
    }

}
