package com.ssafy.howdoilook.domain.feed.api;

import com.ssafy.howdoilook.domain.feed.dto.request.FeedSaveRequestDto;
import com.ssafy.howdoilook.domain.feed.dto.request.FeedUpdateRequestDto;
import com.ssafy.howdoilook.domain.feed.dto.response.FeedSelectResponseDto;
import com.ssafy.howdoilook.domain.feed.service.FeedService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/feed")
public class FeedController {
    public final FeedService feedService;

    @GetMapping("/")
    public ResponseEntity<?> selectAll(){
        List<FeedSelectResponseDto> feedSelectResponseDtoList = feedService.selectAll();
        return ResponseEntity.ok().body(feedSelectResponseDtoList);
    }
    @PostMapping("/")
    public Long saveFeed(@RequestBody FeedSaveRequestDto feedRequestDto){
        return feedService.saveFeed(feedRequestDto);
    }

    @PutMapping("/")
    public Long updateFeed(@RequestBody FeedUpdateRequestDto feedUpdateRequestDto){
        return feedService.updateFeed(feedUpdateRequestDto);
    }
}
