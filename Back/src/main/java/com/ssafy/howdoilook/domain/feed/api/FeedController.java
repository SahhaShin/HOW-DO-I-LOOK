package com.ssafy.howdoilook.domain.feed.api;

import com.ssafy.howdoilook.domain.feed.dto.request.FeedSaveRequestDto;
import com.ssafy.howdoilook.domain.feed.dto.request.FeedUpdateRequestDto;
import com.ssafy.howdoilook.domain.feed.dto.response.FeedResponseDto;
import com.ssafy.howdoilook.domain.feed.service.FeedService;
import com.ssafy.howdoilook.domain.feedLike.dto.response.FeedLikeCountResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/feed")
public class FeedController {
    public final FeedService feedService;

    @GetMapping("")
    public ResponseEntity<Page<FeedResponseDto>> selectAll(Pageable pageable){
        Page<FeedResponseDto> feedResponseDtos = feedService.selectAll(pageable);
        return ResponseEntity.status(HttpStatus.OK).body(feedResponseDtos);
    }
    @GetMapping("/one/{feedId}")
    public ResponseEntity<List<FeedResponseDto>> selectFeedById(@PathVariable(name = "feedId")Long feedId){
        List<FeedResponseDto> feedResponseDtoList = feedService.selectFeedById(feedId);
        return ResponseEntity.status(HttpStatus.OK).body(feedResponseDtoList);
    }
    @GetMapping("/blacklist/{userId}")
    public ResponseEntity<List<FeedResponseDto>> selectAllExceptBlackList(@PathVariable(name = "userId") Long userId){
        List<FeedResponseDto> feedResponseDtoList = feedService.selectAllExceptBlackList(userId);
        return ResponseEntity.status(HttpStatus.OK).body(feedResponseDtoList);
    }

    @GetMapping("/hashtag")
    public ResponseEntity<List<FeedResponseDto>> selectByHashTag(@RequestParam(name = "hashtag") List<String> list){
        List<FeedResponseDto> feedResponseDtoList = feedService.selectByHashTag(list);
        return ResponseEntity.status(HttpStatus.OK).body(feedResponseDtoList);
    }

    //Following버튼 누르면 나오는 피드들
    @GetMapping("/follow/{userId}")
    public ResponseEntity<Page<FeedResponseDto>> selectFollowFeed(@PathVariable(name = "userId")Long userId, Pageable pageable){
        Page<FeedResponseDto> feedResponseDtos = feedService.selectByUserFollowee(userId, pageable);
        return ResponseEntity.status(HttpStatus.OK).body(feedResponseDtos);
    }

    // Following 버튼 누르면서 블랙리스트는 거르면서 페이징은 아닌 피드 리스트
    @GetMapping("/follow/blacklist/{userId}")
    public ResponseEntity<?> selectFollowFeedExceptBlackList(@PathVariable Long userId) {

        return ResponseEntity.status(HttpStatus.OK)
                .body(feedService.selectFollowFeedExceptBlackList(userId));
    }

    //특정 user의 피드를 불러오는 기능
    @GetMapping("/{userId}")
    public ResponseEntity<Page<FeedResponseDto>> selectUserFeed(@PathVariable(name = "userId")Long userId, Pageable pageable){
        Page<FeedResponseDto> feedResponseDtos = feedService.selectByUserId(userId,pageable);
        return ResponseEntity.status(HttpStatus.OK).body(feedResponseDtos);
    }
    @GetMapping("/liked/{userId}")
    public ResponseEntity<Page<FeedResponseDto>> selectLikedFeed(@PathVariable(name = "userId")Long userId, Pageable pageable){
        Page<FeedResponseDto> feedResponseDtos = feedService.selectLikedFeed(userId, pageable);
        return ResponseEntity.status(HttpStatus.OK).body(feedResponseDtos);
    }

    @PostMapping("")
    public ResponseEntity<Long> saveFeed(@RequestPart FeedSaveRequestDto feedSaveRequestDto, @AuthenticationPrincipal UserDetails userDetails, @RequestPart("s3upload") List<MultipartFile> multipartFileList){
        Long id = feedService.saveFeed(feedSaveRequestDto,userDetails,multipartFileList);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(id);
    }

    @PutMapping("")
    public ResponseEntity<Long> updateFeed(@RequestBody FeedUpdateRequestDto feedUpdateRequestDto, @AuthenticationPrincipal UserDetails userDetails){
        Long id = feedService.updateFeed(feedUpdateRequestDto,userDetails);
        return ResponseEntity.status(HttpStatus.CREATED).body(id);
    }

    @DeleteMapping("/{feedId}")
    public ResponseEntity<?> deleteFeed(@PathVariable(name = "feedId") Long feedId, @AuthenticationPrincipal UserDetails userDetails){
        feedService.deleteFeed(feedId,userDetails);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("");
    }
}
