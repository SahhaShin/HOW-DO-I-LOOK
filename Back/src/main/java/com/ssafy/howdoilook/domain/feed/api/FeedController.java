package com.ssafy.howdoilook.domain.feed.api;

import com.ssafy.howdoilook.domain.feed.dto.request.FeedSaveRequestDto;
import com.ssafy.howdoilook.domain.feed.dto.request.FeedUpdateRequestDto;
import com.ssafy.howdoilook.domain.feed.dto.response.FeedDto;
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
        List<FeedDto> feedResponseDtoList = feedService.selectAll();
        return ResponseEntity.ok().body(feedResponseDtoList);
    }
    @GetMapping("/hashtag")
    public ResponseEntity<?> selectByHashTag(@RequestParam(name = "hashtag") List<String> list){
        List<FeedDto> feedResponseDtoList = feedService.selectByHashTag(list);
        return ResponseEntity.ok().body(feedResponseDtoList);
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
