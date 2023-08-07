package com.ssafy.howdoilook.domain.feedLike.api;

import com.ssafy.howdoilook.domain.feedLike.dto.request.FeedLikeDeleteRequestDto;
import com.ssafy.howdoilook.domain.feedLike.dto.request.FeedLikeSaveRequestDto;
import com.ssafy.howdoilook.domain.feedLike.dto.response.FeedLikeCheckResponseDto;
import com.ssafy.howdoilook.domain.feedLike.service.FeedLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/feedlike")
public class FeedLikeController {

    private final FeedLikeService feedLikeService;
    @PostMapping("")
    public ResponseEntity<Long> saveFeedLike(@RequestBody FeedLikeSaveRequestDto feedLikeSaveRequestDto) {
//    public ResponseEntity<Long> saveFeedLike(@RequestBody FeedLikeSaveRequestDto feedLikeSaveRequestDto, @AuthenticationPrincipal UserDetails userDetails){

        Long id = feedLikeService.saveFeedLike(feedLikeSaveRequestDto);
//        Long id = feedLikeService.saveFeedLike(feedLikeSaveRequestDto,userDetails);
        return ResponseEntity.status(HttpStatus.CREATED).body(id);
    }

    @DeleteMapping("")
    public ResponseEntity<?> deleteFeedLike(@RequestBody FeedLikeDeleteRequestDto feedLikeDeleteRequestDto, @AuthenticationPrincipal UserDetails userDetails){
        feedLikeService.deleteFeedLike(feedLikeDeleteRequestDto,userDetails);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("");
    }

    /**
     * 로그인한 유저가 피드에 들어갈 때 누를 좋아요 정보를 확인하는 요청
     * @param userId
     * @param feedId
     * @return
     */
    @GetMapping("")
    public ResponseEntity<FeedLikeCheckResponseDto> checkFeedLike(@RequestParam(name = "userId")Long userId, @RequestParam(name = "feedId")Long feedId){
        FeedLikeCheckResponseDto feedLikeCheckResponseDto = feedLikeService.checkFeedLike(userId, feedId);
        return ResponseEntity.status(HttpStatus.OK).body(feedLikeCheckResponseDto);
    }
}
