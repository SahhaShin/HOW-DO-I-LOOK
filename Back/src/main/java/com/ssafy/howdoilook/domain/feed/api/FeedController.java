package com.ssafy.howdoilook.domain.feed.api;

import com.ssafy.howdoilook.domain.feed.dto.request.FeedSaveRequestDto;
import com.ssafy.howdoilook.domain.feed.dto.request.FeedUpdateRequestDto;
import com.ssafy.howdoilook.domain.feed.service.FeedService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/feed")
public class FeedController {
    public final FeedService feedService;

    @PostMapping("/")
    public Long saveFeed(@RequestBody FeedSaveRequestDto feedRequestDto){
        System.out.println(1);
        return feedService.saveFeed(feedRequestDto);
    }

    @PutMapping("/")
    public Long updateFeed(@RequestBody FeedUpdateRequestDto feedUpdateRequestDto){
        return feedService.updateFeed(feedUpdateRequestDto);
    }
}
