package com.ssafy.howdoilook.domain.feed.api;

import com.ssafy.howdoilook.domain.feed.dto.request.FeedRequestDto;
import com.ssafy.howdoilook.domain.feed.service.FeedService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/feed")
public class FeedController {
    public final FeedService feedService;

    @PostMapping("/")
    public Long saveFeed(@RequestBody FeedRequestDto feedRequestDto){
        return feedService.saveFeed(feedRequestDto);
    }
}
