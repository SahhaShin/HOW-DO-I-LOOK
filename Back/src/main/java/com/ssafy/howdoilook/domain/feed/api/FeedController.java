package com.ssafy.howdoilook.domain.feed.api;

import com.ssafy.howdoilook.domain.feed.dto.request.FeedSaveRequestDto;
import com.ssafy.howdoilook.domain.feed.dto.request.FeedUpdateRequestDto;
import com.ssafy.howdoilook.domain.feed.dto.response.FeedDto;
import com.ssafy.howdoilook.domain.feed.service.FeedService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/feed")
public class FeedController {
    public final FeedService feedService;

//    @GetMapping("/")
//    public ResponseEntity<?> selectAll(){
//        List<FeedDto> feedDtoList = feedService.selectAll();
//        return ResponseEntity.ok().body(feedDtoList);
//    }
    @GetMapping("/")
    public ResponseEntity<?> selectAll2(Pageable pageable){
        Page<FeedDto> feedDtos = feedService.selectAll2(pageable);
        return ResponseEntity.ok().body(feedDtos);
    }

    @GetMapping("/hashtag")
    public ResponseEntity<?> selectByHashTag(@RequestParam(name = "hashtag") List<String> list){
        List<FeedDto> feedDtoList = feedService.selectByHashTag(list);
        return ResponseEntity.ok().body(feedDtoList);
    }
    @GetMapping("/{userId}")
    public ResponseEntity<?> selectFollowFeed(@PathVariable(name = "userId")Long userId){
        List<FeedDto> feedDtoList = feedService.selectByUserFollowee(userId);
        return ResponseEntity.ok().body(feedDtoList);
    }
    @PostMapping("/")
    public Long saveFeed(@RequestBody FeedSaveRequestDto feedSaveRequestDto){
        return feedService.saveFeed(feedSaveRequestDto);
    }

    @PutMapping("/")
    public Long updateFeed(@RequestBody FeedUpdateRequestDto feedUpdateRequestDto){
        return feedService.updateFeed(feedUpdateRequestDto);
    }

    @DeleteMapping("/{feedId}")
    public void deleteFeed(@PathVariable(name = "feedId") Long feedId){
        feedService.deleteFeed(feedId);
    }

}
