package com.ssafy.howdoilook.domain.feed.api;

import com.ssafy.howdoilook.domain.feed.dto.request.FeedSaveRequestDto;
import com.ssafy.howdoilook.domain.feed.dto.request.FeedUpdateRequestDto;
import com.ssafy.howdoilook.domain.feed.dto.response.FeedResponseDto;
import com.ssafy.howdoilook.domain.feed.service.FeedService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/feed")
public class FeedController {
    public final FeedService feedService;

    @GetMapping("/")
    public ResponseEntity<Page<FeedResponseDto>> selectAll(Pageable pageable){
        Page<FeedResponseDto> feedResponseDtos = feedService.selectAll(pageable);
        return ResponseEntity.status(HttpStatus.OK).body(feedResponseDtos);
    }

    @GetMapping("/hashtag")
    public ResponseEntity<Page<FeedResponseDto>> selectByHashTag(@RequestParam(name = "hashtag") List<String> list, Pageable pageable){
        Page<FeedResponseDto> feedResponseDtos = feedService.selectByHashTag(list, pageable);
        return ResponseEntity.status(HttpStatus.OK).body(feedResponseDtos);
    }
    @GetMapping("/{userId}")
    public ResponseEntity<Page<FeedResponseDto>> selectFollowFeed(@PathVariable(name = "userId")Long userId, Pageable pageable){
        Page<FeedResponseDto> feedResponseDtos = feedService.selectByUserFollowee(userId, pageable);
        return ResponseEntity.status(HttpStatus.OK).body(feedResponseDtos);
    }

    @PostMapping("/")
    public ResponseEntity<Long> saveFeed(@RequestBody FeedSaveRequestDto feedSaveRequestDto){
        System.out.println("feedSaveRequestDto = " + feedSaveRequestDto);
        Long id = feedService.saveFeed(feedSaveRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(id);
    }

    @PutMapping("/")
    public ResponseEntity<Long> updateFeed(@RequestBody FeedUpdateRequestDto feedUpdateRequestDto){
        System.out.println("feedUpdateRequestDto = " + feedUpdateRequestDto);
        Long id = feedService.updateFeed(feedUpdateRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(id);
    }

    @DeleteMapping("/{feedId}")
    public ResponseEntity<?> deleteFeed(@PathVariable(name = "feedId") Long feedId){
        feedService.deleteFeed(feedId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("");
    }
}
